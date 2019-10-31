'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingType = filtersForm.querySelector('#housing-type');
  var housingPrice = filtersForm.querySelector('#housing-price');
  var housingRooms = filtersForm.querySelector('#housing-rooms');
  var housingGuests = filtersForm.querySelector('#housing-guests');
  var housingFeatures = filtersForm.querySelector('#housing-features');

  var getHousingType = function (element) {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  };

  var getHousingPrice = function (element) {
    switch (housingPrice.value) {
      case window.data.FiltersPriceMap.TYPE.LOW:
        return element.offer.price < window.data.FiltersPriceMap.VALUE.MIN;
      case window.data.FiltersPriceMap.TYPE.MIDDLE:
        return element.offer.price >= window.data.FiltersPriceMap.VALUE.MIN && element.offer.price <= window.data.FiltersPriceMap.VALUE.MAX;
      case window.data.FiltersPriceMap.TYPE.HIGH:
        return element.offer.price >= window.data.FiltersPriceMap.VALUE.MAX;
      default:
        return true;
    }
  };

  var getHousingRooms = function (element) {
    return housingRooms.value === 'any' ? true : element.offer.rooms === Number(housingRooms.value);
  };

  var getHousingGuests = function (element) {
    return housingGuests.value === 'any' ? true : element.offer.guests === Number(housingGuests.value);
  };

  var getHousingFeatures = function (element) {
    return Array.from(housingFeatures.children)
      .filter(function (feature) {
        return feature.checked === true;
      })
      .map(function (item) {
        return item.value;
      })
      .every(function (feature) {
        return element.offer.features.includes(feature);
      });
  };

  window.filterAll = function (data) {
    return data.filter(function (element) {
      return (
        getHousingType(element) &&
          getHousingPrice(element) &&
          getHousingRooms(element) &&
          getHousingGuests(element) &&
          getHousingFeatures(element)
      );
    })
      .slice(0, window.data.MAX_OFFERS_COUNT);
  };

  filtersForm.addEventListener('change', window.debounce(function () {
    window.card.closeCard();
    window.map.removePins();
    window.map.renderPins(window.filterAll(window.advertisements));
  }));

})();
