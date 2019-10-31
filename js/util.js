'use strict';
(function () {

  window.onEscClosePopup = function (evt) {
    var buttons = document.querySelectorAll('.popup__close');
    buttons.forEach(function (item) {
      if (evt.keyCode === window.data.ESC_KEYCODE) {
        item.parentElement.remove();
        document.removeEventListener('keydown', window.onEscClosePopup);
      }
    });
  };

  window.onButtonCloseClick = function () {
    var buttons = document.querySelectorAll('.popup__close');
    buttons.forEach(function (item) {
      item.parentElement.remove();
    });
    document.removeEventListener('keydown', window.onEscClosePopup);
  };

  window.util = {
    isPageActive: false,

    getRandomElem: function (arr) {
      var n = Math.floor(Math.random() * arr.length);
      var randElem = arr[n];
      return randElem;
    },

    getRandomInt: function (min, max) {
      var randInt = Math.floor(Math.random() * (max - min + 1)) + min;
      return randInt;
    },

    getRandomArr: function (parentArray) {
      return parentArray.filter(function () {
        return Math.floor(Math.random() * 2);
      });
    },

    closePopup: function (element) {
      element.remove();
    },

    reloadPage: function () {
      window.location.reload();
    },

    setupRequest: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === window.data.STATUS_OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = window.data.SERVER_TIME;

      return xhr;
    }
  };
})();
