'use strict';
(function () {
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  window.pin = {
    // функции создания DOM-элемента на основе JS-объекта
    renderPinFromTemplate: function (data) {
      var pinElement = similarPinTemplate.cloneNode(true);
      var pinImgElement = pinElement.querySelector('img[src]');
      pinElement.style = 'left: ' + data.location.x + 'px; ' + 'top: ' + data.location.y + 'px';
      pinImgElement.src = data.author.avatar;
      pinImgElement.alt = data.offer.title;

      var onPinClick = function () {
        if (similarCardTemplate) {
          window.util.closePopup(similarCardTemplate);
        }
        window.card.renderCardFromTemplate(data);
        document.addEventListener('keydown', window.onEscClosePopup);
      };
      pinElement.addEventListener('click', onPinClick);

      return pinElement;
    },
  };

})();
