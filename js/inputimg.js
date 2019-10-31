'use strict';
(function () {
  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreviewImage = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoBlock = document.querySelector('.ad-form__photo');

  var createImage = function (photoSrc) {
    var img = document.createElement('IMG');
    img.classList.add('popup__photo');
    img.src = photoSrc;
    img.width = window.params.form.placePhotoWidth;
    img.height = window.params.form.placePhotoHeight;
    img.alt = 'Фотография жилья';
    return img;
  };

  var onFileUpload = function (input, renderPlace) {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var matches = window.data.FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (renderPlace.tagName.toLowerCase() === 'img') {
          renderPlace.src = reader.result;
        } else {
          renderPlace.innerHTML = '';
          renderPlace.append(createImage(reader.result));
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    onFileUpload(avatarChooser, avatarPreviewImage);
  });

  photoChooser.addEventListener('change', function () {
    onFileUpload(photoChooser, photoBlock);
  });
})();
