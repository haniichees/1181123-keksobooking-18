'use strict';
(function () {
  var roomNumberElement = document.querySelector('#room_number');
  var mainPin = document.querySelector('.map__pin--main');
  var pins = document.querySelector('.map__pins');

  var adForm = document.querySelector('.ad-form');
  var guestsNumberElement = adForm.querySelector('#capacity');
  var typePlaceElement = adForm.querySelector('#type');
  var adPriceElement = adForm.querySelector('#price');
  var selectTimeInElement = adForm.querySelector('#timein');
  var selectTimeOutElement = adForm.querySelector('#timeout');

  window.format = {
    getFormatTextRooms: function (rooms) {
      switch (rooms) {
        case 1:
          return ' комната для ';
        case 2:
        case 3:
        case 4:
          return ' комнаты для ';
        default:
          return ' комнат для ';
      }
    },

    getFormatTextGuests: function (guests) {
      switch (guests) {
        case 1:
          return ' гостя';
        default:
          return '-х гостей';
      }
    }
  };

  var checkSelectOptions = function (selectedIndex) {
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

  var checkPriceMin = function () {
    var currentType = typePlaceElement.value;
    var price = window.data.PricesListMap[currentType];

    adPriceElement.placeholder = price;
    adPriceElement.min = price;
    adPriceElement.setCustomValidity('');
  };

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

  var resetForm = function () {
    adForm.reset();
    document.querySelector('.map').classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    pins.textContent = '';
    mainPin.style.left = window.data.MAIN_PIN_X + 'px';
    mainPin.style.top = window.data.MAIN_PIN_Y + 'px';

    checkSelectOptions(0);
    checkPriceMin();

    pins.appendChild(mainPin);
    window.setAddress(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10));
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      document.querySelector('.map').removeChild(mapCard);
    }
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), function () {
      window.success.showSuccess();
      resetForm();
    }, window.error.showError);
  };

  checkSelectOptions(0);

  adForm.addEventListener('submit', onFormSubmit);

  roomNumberElement.addEventListener('change', function (evt) {
    var roomsSelectedIndex = evt.currentTarget.options.selectedIndex;
    checkSelectOptions(roomsSelectedIndex);
  });

  selectTimeInElement.addEventListener('change', function () {
    selectTimeOutElement.value = selectTimeInElement.value;
  });
  selectTimeOutElement.addEventListener('change', function () {
    selectTimeInElement.value = selectTimeOutElement.value;
  });

  adPriceElement.addEventListener('input', checkPriceMin);
  typePlaceElement.addEventListener('input', checkPriceMin);
  adForm.addEventListener('input', checkTitlePriceValidity);
})();
