'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking';

  // загрузка данных с сервера
  function load(onLoad, onError) {
    var xhr = window.util.setupRequest(onLoad, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  }

  // экспорт
  window.backend = {
    load: load,
  };
})();
