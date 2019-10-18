'use strict';
(function () {
  var roomNumberElement = document.querySelector('#room_number');
  var mainPin = document.querySelector('.map__pin--main');
  var pins = document.querySelector('.map__pins');
  var adForm = document.querySelector('.ad-form');
  var guestsNumberElement = adForm.querySelector('#capacity');
  var typePlace = adForm.querySelector('#type');
  var adPrice = adForm.querySelector('#price');
  var selectTimeIn = adForm.querySelector('#timein');
  var selectTimeOut = adForm.querySelector('#timeout');

  var MAIN_PIN_X = 570;
  var MAIN_PIN_Y = 375;

  window.format = {
    // функция форматирования текста для комнат
    getFormatTextRooms: function (rooms) {
      switch (rooms) {
        case 1:
          return ' комната для ';
        case 5:
          return ' комнат для ';
        default:
          return ' комнаты для ';
      }
    },

    // функция форматирования текста для гостей
    getFormatTextGuests: function (guests) {
      if (guests === 1) {
        return ' гостя';
      } else {
        return '-х гостей';
      }
    },
  };

  // функция валидации комнат и гостей
  var changeSelectOptions = function (selectedIndex) {
    var selectedRooms = roomNumberElement[selectedIndex].value;
    guestsNumberElement[guestsNumberElement.length - 1].disabled = true;
    if (selectedRooms === '100') {
      for (var j = 0; j < guestsNumberElement.length - 1; j++) {
        guestsNumberElement[j].disabled = true;
      }
      guestsNumberElement[guestsNumberElement.length - 1].disabled = false;
      guestsNumberElement[guestsNumberElement.length - 1].selected = true;
    } else {
      for (var i = 0; i < guestsNumberElement.length - 1; i++) {
        if (guestsNumberElement[i].value > selectedRooms) {
          guestsNumberElement[i].disabled = true;
        } else {
          guestsNumberElement[i].disabled = false;
          guestsNumberElement[i].selected = true;
        }
      }
    }
  };

  // функция валидации цены
  var checkPriceMin = function () {
    var price = 0;
    var currentType = typePlace.value;
    switch (currentType) {
      case 'bungalo':
        price = 0;
        break;
      case 'flat':
        price = 1000;
        break;
      case 'house':
        price = 5000;
        break;
      case 'palace':
        price = 10000;
        break;
    }

    adPrice.placeholder = price;
    adPrice.min = price;
    adPrice.setCustomValidity('');
  };
  // функция валидации заголовка и ввода цены
  var checkTitlePriceValidity = function (evt) {
    var target = evt.target;
    switch (target.id) {
      case 'title':
        if (target.value.length < 30 && target.value.length > 0) {
          target.setCustomValidity('Заголовок должен содержать не менее 30 символов');
        } else {
          target.setCustomValidity('');
        }
        break;
      case 'price':
        if (target.value < target.min) {
          target.setCustomValidity(
              'Минимальное значение цены за ночь для данного типа жилья составляет ' + target.min + ' руб.'
          );
        }
    }

  };

  // -----------------------------------------------------------------
  changeSelectOptions(0); // первоначальный выбор количества мест

  roomNumberElement.addEventListener('change', function (evt) {
    var roomsSelectedIndex = evt.currentTarget.options.selectedIndex;
    changeSelectOptions(roomsSelectedIndex);
  });

  selectTimeIn.addEventListener('change', function () {
    selectTimeOut.value = selectTimeIn.value;
  });
  selectTimeOut.addEventListener('change', function () {
    selectTimeIn.value = selectTimeOut.value;
  });

  adPrice.addEventListener('input', checkPriceMin);
  typePlace.addEventListener('input', checkPriceMin);
  adForm.addEventListener('input', checkTitlePriceValidity);
  // ----------------------------------------------------------------
  function resetForm() {
    adForm.reset();
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    pins.textContent = '';
    mainPin.style.left = MAIN_PIN_X + 'px';
    mainPin.style.top = MAIN_PIN_Y + 'px';

    changeSelectOptions(0);
    checkPriceMin();

    pins.appendChild(mainPin);
    window.setAddress(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10));
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      document.querySelector('.map').removeChild(mapCard);
    }
  }

  function onFormSubmit(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), function () {
      window.success.showSuccess();
      resetForm();
    }, window.error.showError);
  }

  adForm.addEventListener('submit', onFormSubmit);
})();
