'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';
  window.backend = {
    // загрузка данных с сервера
    load: function (onLoad, onError) {
      var xhr = window.util.setupRequest(onLoad, onError);
      xhr.open('GET', URL + '/data');
      xhr.send();
    },
    // отправка данных на сервер
    save: function (data, onLoad, onError) {
      var xhr = window.util.setupRequest(onLoad, onError);
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };

})();
