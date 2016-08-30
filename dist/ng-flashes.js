(function(window) {
  "use strict";
  var ng = window.angular;
  var TYPE_SUCCESS = "success";
  var TYPE_WARNING = "warning";
  var TYPE_DANGER = "danger";
  var TYPE_INFO = "info";
  var EVENT_SHOW = "ngFlashes.show";
  var config = {
    templateUrl: null,
    dismissDelay: 5e3
  };
  function ngFlashesContainerDirectiveFn($timeout) {
    function ngFlashesDirectiveLinkFn($scope) {
      function dismiss(idx) {
        var flash = $scope.list[idx];
        if (flash) {
          $timeout.cancel(flash.timeout);
          $scope.list.splice(idx, 1);
        }
      }
      function onDismiss() {
        dismiss($scope.list.indexOf(this));
      }
      function onFlashShow($event, flash) {
        if ($scope.list.length > 1) {
          dismiss(0);
        }
        flash.timeout = $timeout(onDismiss.bind(flash), config.dismissDelay);
        $scope.list.push(flash);
      }
      $scope.$on(EVENT_SHOW, onFlashShow);
      $scope.dismiss = dismiss;
      $scope.list = [];
    }
    function ngflashesTemplateUrlFn($element, $attrs) {
      if ($attrs.templateUrl) {
        return $attrs.templateUrl;
      }
      return config.templateUrl;
    }
    var ngFlashDef = {
      templateUrl: ngflashesTemplateUrlFn,
      restrict: "A",
      scope: {},
      link: ngFlashesDirectiveLinkFn
    };
    return ngFlashDef;
  }
  function configure(cfg) {
    if (ng.isString(cfg.templateUrl)) {
      config.templateUrl = cfg.templateUrl;
    }
    if (ng.isNumber(cfg.dismissDelay)) {
      config.dismissDelay = parseInt(cfg.dismissDelay);
    }
  }
  function ngFlashesServiceFn($rootScope) {
    function show(type, title, message) {
      $rootScope.$broadcast(EVENT_SHOW, {
        type: type || TYPE_INFO,
        message: message,
        title: title
      });
    }
    var ngFlashesServiceDef = {
      success: show.bind(null, TYPE_SUCCESS),
      warning: show.bind(null, TYPE_WARNING),
      danger: show.bind(null, TYPE_DANGER),
      info: show.bind(null, TYPE_INFO),
      show: show
    };
    return ngFlashesServiceDef;
  }
  function ngFlashesProviderFn() {
    var ngFlashesProviderDef = {
      configure: configure,
      $get: [ "$rootScope", ngFlashesServiceFn ]
    };
    return ngFlashesProviderDef;
  }
  ng.module("ngFlashes", []).provider("ngFlashes", ngFlashesProviderFn).directive("ngFlashesContainer", [ "$timeout", ngFlashesContainerDirectiveFn ]);
})(window);