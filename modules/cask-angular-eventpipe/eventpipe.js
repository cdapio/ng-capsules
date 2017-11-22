/*
 * Copyright © 2015-2017 Cask Data, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

angular.module('cask-angular-eventpipe')
  .service('EventPipe', function() {
    var events = {};

    this.on = function(event, cb) {
      if (!events[event]) {
        events[event] = [cb];
      } else {
        events[event].push(cb);
      }
      return function() {
        if (!events[event]) {
          return;
        }
        var index = events[event].indexOf(cb);
        if (index !== -1) {
          events[event].splice(index, 1);
        }
      };
    };

    this.emit =  function(event) {
      var args = Array.prototype.slice.call(arguments, 1);
      if (!events[event]) {
        return;
      }
      for (var i = 0; i < events[event].length; i++) {
        events[event][i].apply(this, args);
      }
    };

    this.cancelEvent = function(event) {
      if (events[event]) {
        delete events[event];
      }
    };
  });
