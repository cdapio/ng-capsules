describe('Unit test for Dispatcher factory', function() {

  var MyDispatcher;
  beforeEach(function() {
    module('cask-angular-dispatcher', function($provide) {
      $provide.value('$window', window);
    });

    inject(function(CaskAngularDispatcher){
      MyDispatcher = new CaskAngularDispatcher();
    });
  });

  it('Should work - Basics: Register an event and call its callback when dispatched', function() {
    var isEvent1Emitted = false;
    MyDispatcher.register('event1', function() {
      isEvent1Emitted = true;
    }, 1);

    MyDispatcher.dispatch('event1');

    expect(isEvent1Emitted).toBe(true);
  });

  it('Should un-register an event - Should not callback any callbacks once the subscriber is unregistered', function() {
    var subscriber1 = 0;
    var subscriber2 = 0;
    var i;
    var sub1RegisterId = MyDispatcher.register('event2', function() {
      subscriber1 += 1;
    });

    var sub2RegisterId = MyDispatcher.register('event2', function() {
      subscriber2 +=1 ;
    });

    for(i=0; i<=10; i++) {
      if (i===5) {
        MyDispatcher.unregister('event2', sub2RegisterId);
      } else {
        MyDispatcher.dispatch('event2');
      }
    }

    expect(subscriber1).toBe(10);
    expect(subscriber2).toBe(5);
  });

  it('Should handle malformed usecases', function() {
    var subscriber1 = 0;
    var subscriber2 = 0;
    var isSubscriber3Valid = true;
    var i;
    var sub1RegisterId = MyDispatcher.register('event2', function() {
      subscriber1 += 1;
    });

    var sub2RegisterId = MyDispatcher.register('event2', function() {
      subscriber2 +=1 ;
    });
    var sub3RegisterId;
    try {
      sub3RegisterId = MyDispatcher.register('event3', undefined);
    } catch(e) {
      isSubscriber3Valid = false;
    }

    for(i=0; i<=10; i++) {
      if (i===5) {
        MyDispatcher.unregister('event2', 'someid');
        MyDispatcher.unregister('someotherEvent', sub2RegisterId);
      } else {
        MyDispatcher.dispatch('event2');
        MyDispatcher.dispatch('event3');
        MyDispatcher.dispatch('randomeEvent');
      }
    }

    expect(subscriber1).toBe(10);
    expect(subscriber2).toBe(10);
    expect(isSubscriber3Valid).toBe(false);
  });

});
