'use strict';
(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = window.util.setupRequest(onLoad, onError);
      xhr.open('GET', window.data.URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = window.util.setupRequest(onLoad, onError);
      xhr.open('POST', window.data.URL);
      xhr.send(data);
    }
  };
})();
