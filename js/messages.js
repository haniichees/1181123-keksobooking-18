'use strict';
(function () {

  var mainElement = document.querySelector('main');

  window.success = {
    // успешная отправка
    showSuccess: function () {
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var successMessage = successTemplate.cloneNode(true);
      var successText = successMessage.querySelector('.success__message');
      successText.textContent = 'Данные успешно отправлены';
      mainElement.appendChild(successMessage);
      successMessage.addEventListener('click', window.util.reloadPage);
    }
  };

  window.error = {
    // показ ошибки
    showError: function (error) {
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      var errorMessage = errorTemplate.cloneNode(true);
      var errorText = errorMessage.querySelector('.error__message');
      var errorCloseButton = errorMessage.querySelector('.error__button');
      errorText.textContent = error;
      mainElement.appendChild(errorMessage);
      errorCloseButton.addEventListener('click', window.util.reloadPage);
      errorMessage.addEventListener('click', window.util.reloadPage);
    },


  };

})();
