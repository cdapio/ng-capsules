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

describe('Unit test for MyDataSource + MySocket', function() {
  var MySocket,
      EventPipe1,
      MyDataSource1,
      $rootScope1,
      resourceId,
      scope, dataSrc,url,
      $timeout,
      MYSOCKET_EVENT1;
  beforeEach(module('cask-angular-eventpipe'));
  beforeEach(module('cask-angular-window-manager'));
  beforeEach(module('cask-angular-observable-promise'));
  beforeEach(function () {
    module('cask-angular-socket-datasource', function($provide) {
      $provide.value('$window', window);
    });
    try {
      inject(function(MyDataSource, mySocket, MYSOCKET_EVENT, EventPipe, $rootScope, _$timeout_) {
        EventPipe1 = EventPipe;
        $rootScope1 = $rootScope;
        MySocket = mySocket;
        MyDataSource1 = MyDataSource;
        $timeout  = _$timeout_;
        MYSOCKET_EVENT1 = MYSOCKET_EVENT;

        scope  = $rootScope1.$new();
        dataSrc = new MyDataSource1(scope);
        url = 'http://localhost:8080/apps/myAppId';

        spyOn(MySocket, 'send').andCallFake(function(re) {
          resourceId = re.resource.id;
          return re.resource.url;
        });
        spyOn(MySocket, 'close').andCallFake(function() {
          return 'Socket Connection Closed';
        });
      });
    } catch(e){
      console.log(e);
    }
  });

  describe('Request - Success:Failure cases', function() {
    it ('Success case - 200 OK from backend', function () {
      dataSrc.request({
        url: url
      })
        .then(
          function success(res) {
            expect(res.data).toBe(url);
          }
        );

      EventPipe1.emit(MYSOCKET_EVENT1.message, {
        resource: {
          id: resourceId
        },
        response: {
          data: url
        }
      });
    });

    it('Failure case - 500 Internal server error from backend', function() {
      dataSrc.request({
        url: url
      })
        .then(
          function success(res) {

          },
          function error(err) {
            expect(err.data).toBe('ERROR');
          }
        );

        EventPipe1.emit(MYSOCKET_EVENT1.message, {
          resource: {
            id: resourceId
          },
          response: 'ERROR',
          statusCode: 500
        });
    });
  });
  describe('Poll - Success:Failre cases', function() {

    it('Success case - 200 OK from backend', function () {
      dataSrc.poll({
        url: url
      })
        .then(
          function success(res) {
            if (res.data.j === 10) {
              expect(res.data.url).toBe(url);
              expect(res.data.j).toBe(10);
            }
          },
          function error(){}
        );
        $timeout(function() {
          var j;
          for (j=0; j<=10; j++) {
            EventPipe1.emit(MYSOCKET_EVENT1.message, {
              resource: {
                id: resourceId
              },
              response: {
                data: {
                  url: url,
                  j: j
                }
              }
            });
          }
        });
        $timeout.flush();
    });

    it('Failure case - 500 Internal server error from backend', function () {
      dataSrc.poll({
        url: url
      })
        .then(
          function success(res) {
          },
          function error(){
            if (res.data.j === 10) {
              expect(res.data.message).toBe('ERROR');
              expect(res.data.j).toBe(10);
            }
          }
        );
        $timeout(function() {
          var j;
          for (j=0; j<=10; j++) {
            EventPipe1.emit(MYSOCKET_EVENT1.message, {
              resource: {
                id: resourceId
              },
              response: {
                data: {
                  message: 'ERROR',
                  j: j
                }
              },
              statusCode: 500
            });
          }
        });
        $timeout.flush();
    });

  });
  describe('Request - Must be onetime', function() {
    it('Remove request entry from map once request is complete', function() {
      dataSrc.request({
        url: url
      })
        .then(
          function success(res) {
            expect(res.data).toBe(url);
          }
        );

      EventPipe1.emit(MYSOCKET_EVENT1.message, {
        resource: {
          id: resourceId
        },
        response: {
          data: url
        }
      });
      $timeout(function() {
        var internalBindings = Object.keys(dataSrc.bindings).length;
        expect(internalBindings).toBe(0);
      });
      $timeout.flush();
    });

    it('Should not remove a polling entry once a request is received', function() {
      dataSrc.request({
        url: url
      })
        .then(
          function success(res) {
            expect(res.data).toBe(url);
          }
        );

      EventPipe1.emit(MYSOCKET_EVENT1.message, {
        resource: {
          id: resourceId
        },
        response: {
          data: url
        }
      });

      dataSrc.poll({
        url: url
      })
        .then(
          function success(res) {
          },
          function error(){
            if (res.data.j === 10) {
              expect(res.data.message).toBe('ERROR');
              expect(res.data.j).toBe(10);
            }
          }
        );

      $timeout(function() {
        var j;
        for (j=0; j<=10; j++) {
          EventPipe1.emit(MYSOCKET_EVENT1.message, {
            resource: {
              id: resourceId
            },
            response: {
              data: {
                message: 'ERROR',
                j: j
              }
            },
            statusCode: 500
          });
        }
        var internalBindings = Object.keys(dataSrc.bindings).length;
        expect(internalBindings).toBe(1);
      });
      $timeout.flush();
    });
  });
});
