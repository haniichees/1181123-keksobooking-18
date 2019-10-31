'use strict';
(function () {

  var mainElement = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var successMessageTemplate = successTemplate.cloneNode(true);
  var successMessageText = successMessageTemplate.querySelector('.success__message');

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorMessageTemplate = errorTemplate.cloneNode(true);
  var errorMessageText = errorMessageTemplate.querySelector('.error__message');
  var errorCloseButton = errorMessageTemplate.querySelector('.error__button');

  window.success = {
    showSuccess: function () {
      successMessageText.textContent = 'Данные успешно отправлены';
      mainElement.appendChild(successMessageTemplate);
      successMessageTemplate.addEventListener('click', window.util.reloadPage);
    }
  };

  window.error = {
    showError: function (error) {
      errorMessageText.textContent = error;
      mainElement.appendChild(errorMessageTemplate);
      errorCloseButton.addEventListener('click', window.util.reloadPage);
      errorMessageTemplate.addEventListener('click', window.util.reloadPage);
    },


  };

})();
