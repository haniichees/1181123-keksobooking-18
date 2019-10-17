'use strict';
(function () {
  var userDialog = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var adFormElements = adForm.querySelectorAll('.ad-form__element');
  var filterForm = document.querySelector('.map__filters');
  var filterFormElements = filterForm.querySelectorAll('.map__filter');
  var featuresFilterElement = filterForm.querySelector('.map__features');

  var MAIN_PIN_WIDTH = 40;
  var MAIN_PIN_HEIGHT = 80;

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;

  // функция изменения состояния формы
  var changeFormState = function (formElements, isDisabled) {
    formElements.forEach(function (item) {
      item.disabled = isDisabled;
    });
  };
  // функция активации окна
  window.activatePage = function () {
    if (!window.util.isPageActive) {
      userDialog.classList.remove('map--faded');
      window.setAddress(parseInt(mainPin.style.left, 10), parseInt(mainPin.style.top, 10));
      adForm.classList.remove('ad-form--disabled');
      changeFormState(adFormElements, false);
      changeFormState(filterFormElements, false);
      featuresFilterElement.disabled = false;
      window.util.isPageActive = true;
      window.map.renderPins();
    }
  };
  // функция деактивации окна
  window.deactivatePage = function () {
    userDialog.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    changeFormState(adFormElements, true);
    changeFormState(filterFormElements, true);
    featuresFilterElement.disabled = true;
  };
  // функция добавления координат в поле адреса
  window.setAddress = function (x, y) {
    addressInput.value = Math.round((x + MAIN_PIN_WIDTH / 2)) + ', ' + Math.round((y + MAIN_PIN_HEIGHT));
    addressInput.readOnly = true;
  };
  mainPin.addEventListener('click', window.activatePage);


  mainPin.addEventListener('mousedown', function (evt) {
    var target = evt.currentTarget;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    // функция перемещения метки
    function onMouseMove(moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainPin.style.top = mainPin.offsetTop - shift.y + 'px';
      mainPin.style.left = mainPin.offsetLeft - shift.x + 'px';
      if (parseInt(target.style.left, 10) < 0) {
        target.style.left = '0px';
      } else if (parseInt(target.style.left, 10) > window.LOCATION_XMAX - MAIN_PIN_WIDTH - MAIN_PIN_WIDTH / 2) {
        target.style.left = window.LOCATION_XMAX - MAIN_PIN_WIDTH - MAIN_PIN_WIDTH / 2 + 'px';
      }

      if (parseInt(target.style.top, 10) < window.LOCATION_YMIN) {
        target.style.top = window.LOCATION_YMIN + 'px';
      } else if (parseInt(target.style.top, 10) > window.LOCATION_YMAX - MAIN_PIN_HEIGHT) {
        target.style.top = window.LOCATION_YMAX - MAIN_PIN_HEIGHT + 'px';
      }

      window.setAddress(parseInt(target.style.left, 10), parseInt(target.style.top, 10));
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  window.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.activatePage();
    }

    if (evt.keyCode === ESC_KEYCODE) {
      if (document.querySelector('.success')) {
        window.util.reloadPage();
      }
      if (document.querySelector('.error')) {
        window.util.reloadPage();
      }
    }

  });

  window.deactivatePage();
})();
