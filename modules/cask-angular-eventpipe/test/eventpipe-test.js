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

describe('Unit test for EventPipe service', function() {
  beforeEach(module('cask-angular-eventpipe'));

  var Eventpipe;
  beforeEach(inject(function(EventPipe){
    Eventpipe = EventPipe;
  }));

  it('Should work - Basics', function() {
    var isEvent1Emitted = false;
    Eventpipe.on('event1', function() {
      isEvent1Emitted = true;
    });

    Eventpipe.emit('event1');

    expect(isEvent1Emitted).toBe(true);
  });

  it('Should cancel an event - No callbacks after cancellation', function() {
    var eventEmittedCount = 0;
    var i;
    Eventpipe.on('event2', function() {
      eventEmittedCount += 1;
    });

    for(i=0; i<10; i++) {
      if (i===5) {
        Eventpipe.cancelEvent('event2');
      } else {
        Eventpipe.emit('event2');
      }
    }

    expect(eventEmittedCount).toBe(5);
  });

  it('Should cancel a single callback in the callback array', function() {
    var eventEmittedCount = 0;
    var eventCb1 = Eventpipe.on('event3', function() {
      eventEmittedCount += 1;
    });
    var eventCb2 = Eventpipe.on('event3', function() {
      eventEmittedCount += 1;
    });

    Eventpipe.emit('event3');

    expect(eventEmittedCount).toBe(2);

    eventEmittedCount = 0;
    eventCb1();

    Eventpipe.emit('event3');

    expect(eventEmittedCount).toBe(1);
  });
});
