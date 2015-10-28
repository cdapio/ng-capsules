/*
 * Copyright © 2015 Cask Data, Inc.
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
