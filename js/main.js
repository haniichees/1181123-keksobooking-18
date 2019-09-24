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
      randomAds.offer.title = 'Сдам ' + randomAds.offer.type;
      randomAds.offer.description = 'Сдаю ' + randomAds.offer.type + ' всего за ' + randomAds.offer.price + '\nФотографии прилагаются.';
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
