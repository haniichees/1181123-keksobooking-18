'use strict';
(function () {
  /*  var QUANTITY = 8;

    var PRICES = [10000, 50000, 15000, 20000, 100000];
    var TYPES = ['palace', 'flat', 'house', 'bungalo'];
    var GUESTS = [1, 2, 3, 5, 10];
    var CHECKINS = ['12:00', '13:00', '14:00'];
    var CHECKOUTS = ['12:00', '13:00', '14:00'];
    var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

    var LOCATION_XMIN = 0;*/
  window.LOCATION_XMAX = 1150;
  window.LOCATION_YMIN = 130;
  window.LOCATION_YMAX = 630;

  /* // объект типов жилья
   window.TypesListMap = {
     'flat': ['Квартира', 'квартиру'],
     'bungalo': ['Бунгало', 'бунгало'],
     'house': ['Дом', 'дом'],
     'palace': ['Дворец', 'дворец']
   };

   window.data = {
     // функция создания рандомных объявлений
     getAds: function () {
       var randomAdsList = [];
       for (var i = 1; i <= QUANTITY; i++) {
         var randLocationX = window.util.getRandomInt(LOCATION_XMIN, window.LOCATION_XMAX);
         var randLocationY = window.util.getRandomInt(window.LOCATION_YMIN, window.LOCATION_YMAX);
         var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
         var randomAds = {
           'author': {
             'avatar': 'img/avatars/user0' + i + '.png'
           },
           'offer': {
             'address': randLocationX + ' ' + randLocationY,
             'price': window.util.getRandomElem(PRICES),
             'type': window.util.getRandomElem(TYPES),
             'rooms': window.util.getRandomInt(1, 5),
             'guests': window.util.getRandomElem(GUESTS),
             'checkin': window.util.getRandomElem(CHECKINS),
             'checkout': window.util.getRandomElem(CHECKOUTS),
             'features': window.util.getRandomArr(FEATURES),
             'photos': window.util.getRandomArr(photos)
           },
           'location': {
             x: randLocationX,
             y: randLocationY
           }
         };
         randomAds.offer.title = 'Сдам ' + window.TypesListMap[randomAds.offer.type][1];
         randomAds.offer.description = 'Сдаю ' + window.TypesListMap[randomAds.offer.type][1] + ' всего за ' + randomAds.offer.price + ' рублей.';
         randomAdsList.push(randomAds);
       }
       return randomAdsList;
     },

   };*/
})();
