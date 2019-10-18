'use strict';
(function () {
  window.typeOfHouse = document.querySelector('#housing-type');
  var OFFERS_COUNT = 5;
  var offers;

  var filterOffers = function () {
    var currentHousePins = offers.filter(function (item) {
      return window.util.getHousingType(item);
    }).slice(0, OFFERS_COUNT);
    return currentHousePins;
  };

  var changeHouseTypeHandler = function () {
    window.map.removePins();
    window.map.renderPins(filterOffers);
  };
  // --------------------------------------------------------------------------
  function sortOffers(type) {

    var sortedOffers = offers.sort(function (left, right) {
      var rankDiff = getRank(right, type) - getRank(left, type);
      if (rankDiff === 0) {
        rankDiff = pricesComparator(left.offer.price, right.offer.price);
      }
      return rankDiff;
    });

    return sortedOffers.slice(0, OFFERS_COUNT);
  }

  var getRank = function (offer, type) {
    var rank = 0;

    if (offer.offer.type === type) {
      rank += 1;
    }
    return rank;
  };

  var pricesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  window.backend.load(function (data) {
    offers = data;
  }, window.util.showError);
  // ---------------------------------------------------------------------------
  window.filter = {
    sortOffers: sortOffers
  };

  window.typeOfHouse.addEventListener('change', changeHouseTypeHandler);
})();
