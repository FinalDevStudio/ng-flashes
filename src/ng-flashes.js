(function (window) {
  'use strict';

  var ng = window.angular;

  var TYPE_SUCCESS = 'success';
  var TYPE_WARNING = 'warning';
  var TYPE_DANGER = 'danger';
  var TYPE_INFO = 'info';

  var EVENT_SHOW = 'ngFlashes.show';

  var config = {
    templateUrl: null,
    dismissDelay: 5000,
    icons: {
      warning: 'exclamation-circle',
      danger: 'remove-circle',
      success: 'check-circle',
      info: 'info-circle'
    }
  };

  /**
   * ngFlashes directive function.
   */
  function ngFlashesContainerDirectiveFn($timeout) {
    /**
     * ngFlashes directive link function.
     */
    function ngFlashesDirectiveLinkFn($scope) {
      /**
       * Dismisses any active flash.
       *
       * @param {Number} idx The flash index to dismiss.
       */
      function dismiss(idx) {
        var flash = $scope.list[idx];

        if (flash) {
          $timeout.cancel(flash.timeout);
          $scope.list.splice(idx, 1);
        }
      }

      /**
       * Flash dismiss timeout callback.
       */
      function onDismiss() {
        dismiss($scope.list.indexOf(this));
      }

      /**
       * Flash show event listener callback.
       */
      function onFlashShow($event, flash) {
        if ($scope.list.length > 1) {
          dismiss(0);
        }

        flash.timeout = $timeout(onDismiss.bind(flash), config.dismissDelay);

        $scope.list.push(flash);
      }

      $scope.$on(EVENT_SHOW, onFlashShow);

      $scope.dismiss = dismiss;

      $scope.icons = config.icons;
      $scope.list = [];
    }

    /**
     * ngFlashes template URL directive function.
     */
    function ngflashesTemplateUrlFn($element, $attrs) {
      if ($attrs.templateUrl) {
        return $attrs.templateUrl;
      }

      return config.templateUrl;
    }

    /* ngFlashes directive definition */
    var ngFlashDef = {
      templateUrl: ngflashesTemplateUrlFn,

      restrict: 'A',

      scope: {},

      link: ngFlashesDirectiveLinkFn
    };

    return ngFlashDef;
  }

  /**
   * Configuration method.
   *
   * @param {Object} config The configuration object.
   */
  function configure(cfg) {
    /* Set default template URL */
    if (ng.isString(cfg.templateUrl)) {
      config.templateUrl = cfg.templateUrl;
    }

    /* Set default auto dismiss delay */
    if (ng.isNumber(cfg.dismissDelay)) {
      config.dismissDelay = parseInt(cfg.dismissDelay);
    }

    /* Set default auto dismiss delay */
    if (ng.isNumber(cfg.dismissDelay)) {
      config.dismissDelay = parseInt(cfg.dismissDelay);
    }

    /* Update icons */
    if (ng.isObject(cfg.icons)) {
      for (var key in config.icons) {
        if (ng.isString(cfg.icons[key])) {
          config.icons[key] = cfg.icons[key];
        }
      }
    }
  }

  /**
   * ngFlashes service function.
   */
  function ngFlashesServiceFn($rootScope) {
    /**
     * Show a new flash message.
     *
     * @param {String} type The type of the flash. Either 'info', 'succes',
     * 'warning' or 'danger'.
     * @param {String} title The title of the flash message.
     * @param {String} message The message body of the flash message.
     */
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

  /**
   * ngFlashes provider function.
   */
  function ngFlashesProviderFn() {
    var ngFlashesProviderDef = {
      configure: configure,

      $get: [
        '$rootScope',

        ngFlashesServiceFn
      ]
    };

    return ngFlashesProviderDef;
  }

  /**
   * Define AngularJS module.
   */
  ng.module('ngFlashes', [])

  /* Define service provider */
  .provider('ngFlashes', ngFlashesProviderFn)

  /* Define directive */
  .directive('ngFlashesContainer', [
    '$timeout', '$session',

    ngFlashesContainerDirectiveFn
  ]);

}(window));
