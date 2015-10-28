var DispatcherFactory = angular.module('cask-angular-dispatcher');

DispatcherFactory.factory('uuid', function ($window) {
  return $window.uuid;
});


DispatcherFactory.factory('CaskAngularDispatcher', function(uuid) {
  function Dispatcher() {
    if (!(this instanceof Dispatcher)) {
      return new Dispatcher();
    }
    this.events = {};
  }

  Dispatcher.prototype.register = function(event, cb) {
    var id = uuid.v4();
    if (!this.events[event]) {
      this.events[event] = {};
    }
    if (typeof cb === 'function') {
      this.events[event][id] = cb;
    } else {
      throw 'Invalid callback. A callback registered for an event has to be a function';
    }
    return id;
  };

  Dispatcher.prototype.dispatch =  function(event) {
    var args = Array.prototype.slice.call(arguments, 1);
    if (!this.events[event]) {
      return;
    }
    angular.forEach(this.events[event], function(callback, id) {
      callback.apply(null, args);
    });
  };

  Dispatcher.prototype.unregister = function(event, registeredId) {
    if (this.events[event] && this.events[event][registeredId]) {
      delete this.events[event][registeredId];
    }
  };

  return Dispatcher;

});
