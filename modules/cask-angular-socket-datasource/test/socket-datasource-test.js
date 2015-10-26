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
          if (re.poll) {

          }
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
});
