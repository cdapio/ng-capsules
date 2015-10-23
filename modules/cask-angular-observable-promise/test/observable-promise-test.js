describe('Unit test for MyPromise factory', function() {
  beforeEach(module('cask-angular-observable-promise'));

  var Mypromise,
      $timeout,
      prom;
  beforeEach(inject(function(MyPromise, _$timeout_) {
    Mypromise = MyPromise;
    $timeout = _$timeout_;
  }));

  it('Should resolve - Basic test', function() {
    prom = new Mypromise(function (resolve, reject) {
      $timeout(function() {
        resolve(true);
      });
    });
    //
    prom.then(
      function success(resolvedValue) {
        expect(resolvedValue).toBe(true);
      },
      function error(rejectedValue) {

      }
    );
    $timeout.flush();
  });

  it('Should reject - Basic test', function() {
    prom = new Mypromise(function (resolve, reject) {
      $timeout(function() {
        reject(false);
      });
    });

    prom.then(
      function success() {

      },
      function error(rejectedValue) {
        expect(rejectedValue).toBe(false);
      }
    );
    $timeout.flush();
  });

  it('Should be able to resolve multiple times', function () {
    prom = new Mypromise(function (resolve, reject) {
      $timeout(function() {
        var i;
        for (i=0;i<=10;i++) {
          resolve(i);
        }
      });
    }, true);

    prom.then(
      function success(resolvedValue) {
        if (resolvedValue === 10) {
          expect(resolvedValue).toBe(10);
        }
      },
      function error(){ }
    );
    $timeout.flush();
  });

  it('Should be able reject multiple times', function() {
    prom = new Mypromise(function (resolve, reject) {
      $timeout(function() {
        var i;
        for (i=0;i<=10;i++) {
          reject(i);
        }
      });
    }, true);

    prom.then(
      function success() {},
      function error(rejectedValue){
        if (rejectedValue === 10) {
          expect(rejectedValue).toBe(10);
        }
      }
    );
    $timeout.flush();
  });

});
