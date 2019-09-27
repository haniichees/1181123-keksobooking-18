'use strict';
(function () {
  var QUANTITY = 8;

  var PRICES = [10000, 50000, 15000, 20000, 100000];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var GUESTS = [1, 2, 3, 5, 10];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var LOCATION_XMIN = 0;
  var LOCATION_XMAX = 1150;
  var LOCATION_YMIN = 100;
  var LOCATION_YMAX = 635;

  var userDialog = document.querySelector('.map');
  userDialog.classList.remove('map--faded');
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
  var similarCardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  // объект типов жилья
  var TypesListMap = {
    'flat': ['Квартира', 'квартиру'],
    'bungalo': ['Бунгало', 'бунгало'],
    'house': ['Дом', 'дом'],
    'palace': ['Дворец', 'дворец']
  };

  // функция получения рандомного элемента
  function getRandomElem(arr) {
    var n = Math.floor(Math.random() * arr.length);
    var randElem = arr[n];
    return randElem;
  }

  // функция получения рандомного числа
  var getRandomInt = function (min, max) {
    var randInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return randInt;
  };

  // функция получения рандомного массива случайной длины
  var getRandomArr = function (parentArray) {
    return parentArray.filter(function () {
      return getRandomInt(0, 1);
    });
  };

  // функция создания рандомных объявлений
  var getAds = function () {
    var randomAdsList = [];
    for (var i = 1; i <= QUANTITY; i++) {
      var randLocationX = getRandomInt(LOCATION_XMIN, LOCATION_XMAX);
      var randLocationY = getRandomInt(LOCATION_YMIN, LOCATION_YMAX);
      var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
      var randomAds = {
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png'
        },
        'offer': {
          'address': randLocationX + ' ' + randLocationY,
          'price': getRandomElem(PRICES),
          'type': getRandomElem(TYPES),
          'rooms': getRandomInt(1, 5),
          'guests': getRandomElem(GUESTS),
          'checkin': getRandomElem(CHECKINS),
          'checkout': getRandomElem(CHECKOUTS),
          'features': getRandomArr(FEATURES),
          'photos': getRandomArr(photos)
        },
        'location': {
          x: randLocationX,
          y: randLocationY
        }
      };
      randomAds.offer.title = 'Сдам ' + TypesListMap[randomAds.offer.type][1];
      randomAds.offer.description = 'Сдаю ' + TypesListMap[randomAds.offer.type][1] + ' всего за ' + randomAds.offer.price + ' рублей.';
      randomAdsList.push(randomAds);
    }
    return randomAdsList;
  };

  // функция форматирования текста для комнат
  function getFormatTextRooms(rooms) {
    switch (rooms) {
      case 1:
        return ' комната для ';
      case 5:
        return ' комнат для ';
      default:
        return ' комнаты для ';
    }
  }

  // функция форматирования текста для гостей
  function getFormatTextGuests(guests) {
    if (guests === 1) {
      return ' гостя';
    } else {
      return '-х гостей';
    }
  }

  // функции отрисовки шаблона в документ
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
      imgElement.width = 45;
      imgElement.height = 40;
      imgElement.alt = 'Фотография квартиры';
      photoElement.querySelector('.popup__photos').appendChild(imgElement);
    });
    return photoElement;
  };

  // функции создания DOM-элемента на основе JS-объекта
  var renderPinFromTemplate = function (data) {
    var pinElement = similarPinTemplate.cloneNode(true);
    var pinImgElement = pinElement.querySelector('img[src]');
    pinElement.style = 'left: ' + data.location.x + 'px; ' + 'top: ' + data.location.y + 'px';
    pinImgElement.src = data.author.avatar;
    pinImgElement.alt = data.offer.title;
    return pinElement;
  };

  var renderCardFromTemplate = function (data, fragmentCard) {
    var cardElement = similarCardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TypesListMap[data.offer.type][0];
    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + getFormatTextRooms(data.offer.rooms) + data.offer.guests + getFormatTextGuests(data.offer.guests);
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = data.offer.description;
    cardElement.querySelector('.popup__avatar').setAttribute('src', data.author.avatar);
    fragmentCard.appendChild(renderFeatures(cardElement, data));
    fragmentCard.appendChild(renderPhotos(cardElement, data));
    return cardElement;
  };

  // функция отрисовки шаблона в документ
  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPinFromTemplate(data[i]));
    }
    // вывод первого по порядку DOM-элемент объявления
    fragment.appendChild(renderCardFromTemplate(data[0], fragment));
    return fragment;
  };

  var pinContainerElem = userDialog.querySelector('.map__pins');
  pinContainerElem.appendChild(renderPins(getAds()));
})();
