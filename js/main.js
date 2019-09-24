'use strict';
(function () {
  var QUANTITY = 8;
  var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];

  var TITLES = ['заголовок1', 'заголовок2', 'заголовок3', 'заголовок4', 'заголовок5'];
  var PRICES = [10000, 50000, 15000, 20000, 100000];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS = [1, 2, 3, 4, 5];
  var GUESTS = [1, 2, 3, 5, 10];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['описание1', 'описание2', 'описание3', 'описание4', 'описание5'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var LOCATION_XMIN = 0;
  var LOCATION_XMAX = 1150;
  var LOCATION_YMIN = 100;
  var LOCATION_YMAX = 635;

  var userDialog = document.querySelector('.map');
  userDialog.classList.remove('map--faded');
  var similarPinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  // функция получения рандомного элемента
  function getRandomElem(arr) {
    var n = Math.floor(Math.random() * arr.length);
    var randElem = arr[n];
    return randElem;
  }

  // функция получения рандомного элемента без повторений
  function getRandomNonRepeatingElem(arr) {
    var n = Math.floor(Math.random() * arr.length);
    var randAvatar = arr[n];
    arr.splice(n, 1);
    return randAvatar;
  }

  // функция получения рандомного числа
  var getRandomInt = function (min, max) {
    var randInt = Math.floor(Math.random() * (max - min + 1)) + min;
    return randInt;
  };

  // функция получения рандомного массива случайной длины
  var getRandomArr = function (arr) {
    var n = getRandomInt(1, arr.length);
    var newArray = Array(n);
    for (var i = 0; i < n; i++) {
      newArray[i] = getRandomNonRepeatingElem(arr);
    }
    return newArray;
  };

  // функция создания объявлений
  var getAds = function () {
    var randomAdsList = [];
    for (var i = 1; i <= QUANTITY; i++) {
      var randLocationX = getRandomInt(LOCATION_XMIN, LOCATION_XMAX);
      var randLocationY = getRandomInt(LOCATION_YMIN, LOCATION_YMAX);
      var randomAds = {
        'author': {
          'avatar': getRandomNonRepeatingElem(AVATARS)
        },
        'offer': {
          'title': getRandomElem(TITLES),
          'address': randLocationX + ' ' + randLocationY,
          'price': getRandomElem(PRICES),
          'type': getRandomElem(TYPES),
          'rooms': getRandomElem(ROOMS),
          'guests': getRandomElem(GUESTS),
          'checkin': getRandomElem(CHECKINS),
          'checkout': getRandomElem(CHECKOUTS),
          'features': getRandomArr(FEATURES),
          'description': getRandomElem(DESCRIPTIONS),
          'photos': getRandomArr(PHOTOS)
        },
        'location': {
          x: randLocationX,
          y: randLocationY
        }
      };
      randomAdsList.push(randomAds);
    }

    return randomAdsList;
  };

  // функция создания DOM-элемента на основе JS-объекта
  var renderPinFromTemplate = function (data) {
    var pinElement = similarPinTemplate.cloneNode(true);
    var pinImgElement = pinElement.querySelector('img[src]');
    pinElement.style = 'left: ' + data.location.x + 'px; ' + 'top: ' + data.location.y + 'px';
    pinImgElement.src = data.author.avatar;
    pinImgElement.alt = data.offer.title;
    return pinElement;
  };
  // функция отрисовки шаблона в документ
  var renderPins = function (data) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < data.length; i++) {
      fragment.appendChild(renderPinFromTemplate(data[i]));
    }
    return fragment;
  };

  var pinContainerElem = userDialog.querySelector('.map__pins');
  pinContainerElem.appendChild(renderPins(getAds()));
})();
