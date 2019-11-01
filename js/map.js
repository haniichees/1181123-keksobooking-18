'use strict';
(function () {
  window.pincontainer = {
    element: window.dom.userDialog.querySelector('.map__pins'),
  };
  window.map = {
    renderPins: function (data) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < data.length; i++) {
        fragment.appendChild(window.pin.renderFromTemplate(data[i]));
      }
      window.pincontainer.element.appendChild(fragment);
    },

    removePins: function () {
      var pins = window.dom.userDialog
        .querySelectorAll('.map__pin');
      for (var i = 0; i < pins.length; i++) {
        if (!pins[i].classList.contains('map__pin--main')) {
          pins[i].remove();
        }
      }
    }

  };
})();
