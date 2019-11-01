'use strict';
(function () {
  window.dom = {
    userDialog: document.querySelector('.map'),
    mainPin: document.querySelector('.map__pin--main'),
    adForm: document.querySelector('.ad-form')
  };
  var mapPins = document.querySelector('.map__pins');
  var addressInput = document.querySelector('#address');
  var adFormElements = window.dom.adForm.querySelectorAll('.ad-form__element');

  var filterFormElements = window.filters.form.querySelectorAll('.map__filter');
  var featuresFilterElement = window.filters.form.querySelector('.map__features');

  var changeFormState = function (formElements, isDisabled) {
    formElements.forEach(function (item) {
      item.disabled = isDisabled;
    });
  };

  var getAdvertisementsData = function (advertisements) {
    window.advertisements = advertisements;
    window.map.renderPins(window.filterAll(window.advertisements));
  };

  window.checkout = {
    activatePage: function () {
      if (!window.util.isPageActive) {
        window.dom.userDialog.classList.remove('map--faded');
        window.checkout.setAddress(true);
        window.dom.adForm.classList.remove('ad-form--disabled');
        changeFormState(adFormElements, false);
        changeFormState(filterFormElements, false);
        featuresFilterElement.disabled = false;
        window.util.isPageActive = true;
        window.backend.load(getAdvertisementsData, window.messages.showError);
      }
    },

    deactivatePage: function () {
      window.dom.userDialog.classList.add('map--faded');
      window.dom.adForm.classList.add('ad-form--disabled');
      changeFormState(adFormElements, true);
      changeFormState(filterFormElements, true);
      featuresFilterElement.disabled = true;
    },

    setAddress: function (pinActive) {
      addressInput.value = Math.round((window.dom.mainPin.offsetLeft + window.data.MAIN_PIN_WIDTH / 2)) + ', ' + Math.round((window.dom.mainPin.offsetTop + (pinActive ? window.data.MAIN_PINACTIVE_HEIGHT : window.data.MAIN_PIN_HEIGHT / 2)));
      addressInput.readOnly = true;
    }
  };
  var limits = {
    top: window.data.LOCATION_YMIN - window.data.MAIN_PINACTIVE_HEIGHT,
    right: mapPins.offsetLeft + mapPins.offsetWidth,
    bottom: window.data.LOCATION_YMAX,
    left: mapPins.offsetLeft
  };
  window.dom.mainPin.addEventListener('click', window.checkout.activatePage);

  window.dom.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onClickMapPinMain(clEvt) {
      clEvt.preventDefault();
      window.dom.mainPin.removeEventListener('click', onClickMapPinMain);
    }
    var dragged = false;

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.dom.mainPin.style.top = Math.min(Math.max((window.dom.mainPin.offsetTop - shift.y), limits.top), limits.bottom - window.data.MAIN_PINACTIVE_HEIGHT) + 'px';
      window.dom.mainPin.style.left = Math.min(Math.max((window.dom.mainPin.offsetLeft - shift.x), limits.left), limits.right - window.data.MAIN_PIN_WIDTH) + 'px';

      window.checkout.setAddress(true);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        onClickMapPinMain(evt);
        window.dom.mainPin.addEventListener('click', onClickMapPinMain);
      }
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });


  addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.data.ENTER_KEYCODE) {
      window.checkout.activatePage();
    }

    if (evt.keyCode === window.data.ESC_KEYCODE) {
      if (document.querySelector('.success')) {
        window.util.reloadPage();
      }
      if (document.querySelector('.error')) {
        window.util.reloadPage();
      }
    }

  });

  window.checkout.deactivatePage();
})();
