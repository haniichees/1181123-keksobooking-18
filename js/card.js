'use strict';
(function () {
  window.mapcard = {
    similarCardTemplate: document.querySelector('#card')
      .content
      .querySelector('.map__card')
  };
  var cardElement;

  var renderFeatures = function (featuresElement, data) {
    var featuresContainer = featuresElement.querySelector('.popup__features');
    featuresContainer.innerHTML = '';
    data.offer.features.forEach(function (item) {
      var liElement = document.createElement('li');
      liElement.classList.add('popup__feature', 'popup__feature--' + item);
      featuresContainer.appendChild(liElement);
    });
    return featuresElement;
  };

  var renderPhotos = function (photoElement, data) {
    photoElement.querySelector('.popup__photos').innerHTML = '';
    data.offer.photos.forEach(function (item) {
      var imgElement = document.createElement('img');
      imgElement.classList.add('popup__photo');
      imgElement.src = item;
      imgElement.width = window.data.PHOTO_WIDTH;
      imgElement.height = window.data.PHOTO_HEIGHT;
      imgElement.alt = 'Фотография квартиры';
      photoElement.querySelector('.popup__photos').appendChild(imgElement);
    });
    return photoElement;
  };

  window.card = {
    renderAdFromTemplate: function (data) {
      cardElement = window.mapcard.similarCardTemplate.cloneNode(true);

      cardElement.querySelector('.popup__title').textContent = data.offer.title;
      cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
      cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
      cardElement.querySelector('.popup__type').textContent = window.data.TypesListMap[data.offer.type];
      cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + window.format.getTextRooms(data.offer.rooms) + data.offer.guests + window.format.getTextGuests(data.offer.guests);
      cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
      cardElement.querySelector('.popup__description').textContent = data.offer.description;
      cardElement.querySelector('.popup__avatar').setAttribute('src', data.author.avatar);

      renderFeatures(cardElement, data).querySelector('.popup__features');
      renderPhotos(cardElement, data).querySelector('.popup__photo');

      cardElement.querySelector('.popup__close').addEventListener('click', window.onButtonCloseClick);
      document.querySelector('.map').appendChild(cardElement);
    },

    removeAd: function () {
      window.map.removePins();
      if (cardElement) {
        cardElement.remove();
      }
    }
  };

})();
