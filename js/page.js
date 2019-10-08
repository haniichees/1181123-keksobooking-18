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

  var MAIN_PIN_TALE = 22;
  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;

  var ENTER_KEYCODE = 13;

  // функция изменения состояния формы
  var changeFormState = function (formElements, isDisabled) {
    formElements.forEach(function (item) {
      item.disabled = isDisabled;
    });
  };
  // функция активации окна
  var activatePage = function () {
    if (!window.util.isPageActive) {
      userDialog.classList.remove('map--faded');
      setAddress();
      adForm.classList.remove('ad-form--disabled');
      changeFormState(adFormElements, false);
      changeFormState(filterFormElements, false);
      featuresFilterElement.disabled = false;
      window.util.isPageActive = true;
      window.map.renderPins(window.data.getAds());
    }
  };
  // функция деактивации окна
  var deactivatePage = function () {
    userDialog.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    changeFormState(adFormElements, true);
    changeFormState(filterFormElements, true);
    featuresFilterElement.disabled = true;
  };
  // функция добавления координат в поле адреса
  var setAddress = function (x, y) {
    addressInput.value = Math.round((x + MAIN_PIN_WIDTH / 2)) + ', ' + Math.round((y + MAIN_PIN_HEIGHT + MAIN_PIN_TALE));
    addressInput.readOnly = true;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    var target = evt.currentTarget;
    activatePage();
    setAddress((parseInt(target.style.left, 10)), parseInt(target.style.top, 10));
  });


  mainPin.addEventListener('keydown', function (evt) {
    var target = evt.currentTarget;
    if (evt.keyCode === ENTER_KEYCODE) {
      activatePage();
      setAddress((parseInt(target.style.left, 10)), parseInt(target.style.top, 10));
    }
  });

  deactivatePage();
})();
