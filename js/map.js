'use strict';
(function () {
  var userDialog = document.querySelector('.map');
  var pinContainerElem = userDialog.querySelector('.map__pins');

  window.map = {
    // функция отрисовки шаблона в документ
    renderPins: function () {
      window.backend.load(function (data) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < data.length; i++) {
          fragment.appendChild(window.pin.renderPinFromTemplate(data[i]));
        }
        pinContainerElem.appendChild(fragment);
      }, window.util.showError);
    }

  };
})();
