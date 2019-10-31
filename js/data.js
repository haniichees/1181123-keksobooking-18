'use strict';
(function () {
  window.data = {
    FILE_TYPES: ['gif', 'jpg', 'jpeg', 'png'],

    URL: 'https://js.dump.academy/keksobooking',
    SERVER_TIME: 10000,
    STATUS_OK: 200,

    LOCATION_XMAX: 1150,
    LOCATION_YMIN: 130,
    LOCATION_YMAX: 630,
    MAIN_PIN_WIDTH: 40,
    MAIN_PIN_HEIGHT: 80,

    MAIN_PIN_X: 570,
    MAIN_PIN_Y: 375,

    PHOTO_WIDTH: 45,
    PHOTO_HEIGHT: 40,

    DEBOUNCE_INTERVAL: 500,

    ENTER_KEYCODE: 13,
    ESC_KEYCODE: 27,

    MAX_OFFERS_COUNT: 5,

    TypesListMap: {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    },

    PricesListMap: {
      'bungalo': 0,
      'flat': 1000,
      'house': 5000,
      'palace': 10000
    },

    FiltersPriceMap: {
      TYPE: {
        LOW: 'low',
        MIDDLE: 'middle',
        HIGH: 'high'
      },
      VALUE: {
        MIN: 10000,
        MAX: 50000
      }
    }

  };

})();
