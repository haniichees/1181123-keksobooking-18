'use strict';
(function () {
  window.debounce = function (callback) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, window.data.DEBOUNCE_INTERVAL);
    };
  };
})();
