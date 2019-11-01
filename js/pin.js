'use strict';
(function () {
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  window.pin = {
    renderFromTemplate: function (data) {
      var pinElement = similarPinTemplate.cloneNode(true);
      var pinImgElement = pinElement.querySelector('img[src]');
      pinElement.style = 'left: ' + data.location.x + 'px; ' + 'top: ' + data.location.y + 'px';
      pinImgElement.src = data.author.avatar;
      pinImgElement.alt = data.offer.title;

      var onClick = function () {
        if (window.mapcard.similarCardTemplate) {
          window.util.closePopup(window.mapcard.similarCardTemplate);
        }
        window.card.renderAdFromTemplate(data);
        document.addEventListener('keydown', window.onEscClosePopup);
      };
      pinElement.addEventListener('click', onClick);

      return pinElement;
    }
  };

})();
