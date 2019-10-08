'use strict';
(function () {
  var userDialog = document.querySelector('.map');
  var pinContainerElem = userDialog.querySelector('.map__pins');

  window.map = {
    // функция отрисовки шаблона в документ
    renderPins: function (data) {
      var pinsFragment = document.createDocumentFragment();

      data.forEach(function (pin) {
        pinsFragment.appendChild(window.pin.renderPinFromTemplate(pin));
      });

      pinContainerElem.appendChild(pinsFragment);

    },
  };
})();
