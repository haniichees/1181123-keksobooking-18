'use strict';
(function () {

  window.userDialog = document.querySelector('.map');
  window.pinContainerElem = window.userDialog.querySelector('.map__pins');

  window.map = {
    // функция отрисовки шаблона в документ
    renderPins: function () {
      window.backend.load(function (data) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < data.length; i++) {
          fragment.appendChild(window.pin.renderPinFromTemplate(data[i]));
        }
        window.pinContainerElem.appendChild(fragment);
      }, window.error.showError);
    }

  };
})();
