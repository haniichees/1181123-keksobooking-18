'use strict';
(function() {
  var avatarChooser = document.querySelector('.ad-form-header__upload input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var avatarPreviewDefault = avatarPreview.getAttribute('src');
  var photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var photoPreviewTemplate = document.querySelector('.ad-form__photo');

  function createImage(file, target) {
    var reader = new FileReader(file);

    reader.addEventListener('load', function() {
      if (target === avatarChooser) {
        avatarPreview.src = reader.result;
      }
      if (target === photoChooser) {
        var photoPreview = photoPreviewTemplate.cloneNode(true);

        photoPreview.style.backgroundImage = 'url(' + reader.result + ')';
        photoPreview.style.backgroundRepeat = 'no-repeat';
        photoPreview.style.backgroundSize = 'cover';

        photoContainer.appendChild(photoPreview);
      }
    });

    reader.readAsDataURL(file);
  }

  function deletePhotos(target) {
    if (target === photoChooser || target === 'reset') {
      var photos = photoContainer.querySelectorAll('.ad-form__photo');

      photos.forEach(function(it) {
        photoContainer.removeChild(it);
      });
    }
    if (target === 'reset') {
      avatarPreview.src = avatarPreviewDefault;
      photoContainer.appendChild(photoPreviewTemplate);
    }
  }

  function onLoadPhotos(evt) {
    var fileChooser = evt.target;
    var files = fileChooser.files;

    for (var i = 0; i < files.length; i++) {
      var fileName = files[i].name.toLowerCase();
      var matches = window.data.FILE_TYPES.some(function(it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        deletePhotos(evt.target);
        createImage(files[i], evt.target);
      }
    }
  }

  photoChooser.setAttribute('multiple', 'multiple');

  avatarChooser.addEventListener('change', onLoadPhotos);
  photoChooser.addEventListener('change', onLoadPhotos);

})();
