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
});
