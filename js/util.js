'use strict';
(function () {

  window.onEscClosePopup = function (evt) {
    var buttons = document.querySelectorAll('.popup__close');
    buttons.forEach(function (item) {
      if (evt.keyCode === 27) {
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
    // функция получения рандомного элемента
    getRandomElem: function (arr) {
      var n = Math.floor(Math.random() * arr.length);
      var randElem = arr[n];
      return randElem;
    },
    // функция получения рандомного числа
    getRandomInt: function (min, max) {
      var randInt = Math.floor(Math.random() * (max - min + 1)) + min;
      return randInt;
    },
    // функция получения рандомного массива случайной длины
    getRandomArr: function (parentArray) {
      return parentArray.filter(function () {
        return Math.floor(Math.random() * 2);
      });
    },

    closePopup: function (element) {
      element.remove();
    },
    // настройки загрузки/отправки/ошибок
    setupRequest: function (onLoad, onError) {
      var serverTime = 10000;
      var statusOk = 200;
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === statusOk) {
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

      xhr.timeout = serverTime;

      return xhr;
    },
    // обновление страницы
    reloadPage: function () {
      window.location.reload();
    }
  };
})();
