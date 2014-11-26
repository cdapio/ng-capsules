angular.module('cask-angular-window-manager')

  .constant('CASK_WM_EVENT', {
    resize: 'cask-wm-resize',
    blur: 'cask-wm-blur',
    focus: 'cask-wm-focus'
  })

  .provider('caskWindowManager', function (CASK_WM_EVENT) {

    this.resizeDebounceMs = 500;

    this.pageViz = {
      hidden: 'visibilitychange',
      mozHidden: 'mozvisibilitychange',
      msHidden: 'msvisibilitychange',
      webkitHidden: 'webkitvisibilitychange'
    };

    this.$get = function ($rootScope, $window, $document, $log, $timeout) {

      // resize inspired by https://github.com/danmasta/ngResize
      var resizeDebounceMs = this.resizeDebounceMs,
          resizePromise = null;

      angular.element($window).on('resize', function (event) {
        if(resizePromise) {
          $timeout.cancel(resizePromise);
        }
        resizePromise = $timeout(function () {
          $log.log('[caskWindowManager]', 'resize');
          $rootScope.$broadcast(CASK_WM_EVENT.resize, {
            width: $window.innerWidth,
            height: $window.innerHeight
          });
        }, resizeDebounceMs, false);
      });



      // pageviz inspired by https://github.com/mz026/angular_page_visibility
      var mkOnVizChange = function (q) {
        return function (e) {
          $log.log('[caskWindowManager]', e);
          $rootScope.$broadcast(
            CASK_WM_EVENT[ $document.prop(q) ? 'blur' : 'focus' ]
          );
        };
      };

      var vizImp = Object.keys(this.pageViz);
      for (var i = 0; i < vizImp.length; i++) { // iterate through implementations
        var p = vizImp[i];
        if (typeof ($document.prop(p)) !== 'undefined') {
          $log.info('[caskWindowManager] page visibility API available!');
          $document.on(this.pageViz[p], mkOnVizChange(p));
          break;
        } 
      };

      return {
        event: CASK_WM_EVENT
      };

    };

  })


  /*
  * caskOnWm Directive
  *
  * usage: cask-on-wm="{resize:expression()}"
  * event data is available as $event
  */
  .directive('caskOnWm', function ($parse, $timeout, caskWindowManager) {
    return {
      compile: function ($element, attr) {
        var obj = $parse(attr.caskOnWm);
        return function (scope, element, attr) {
          angular.forEach(obj, function (fn, key) {
            var eName = caskWindowManager.event[key];
            if(eName) {
              scope.$on(eName, function (event, data) {
                $timeout(function () {
                  scope.$apply(function () {
                    fn(scope, { $event: data });
                  });
                });
              });
            }
          });
        };
      }
    };
  });
