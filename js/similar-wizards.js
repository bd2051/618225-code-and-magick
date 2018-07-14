'use strict';

(function () {
  var coatColor = window.setup.block.querySelector('.coat-color').value;
  var eyesColor = window.setup.block.querySelector('.eyes-color').value;
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }

    return rank;
  };

  var updateWizards = function () {
    window.renderWizards(wizards.slice().
    sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = wizards.indexOf(left) - wizards.indexOf(right);
      }
      return rankDiff;
    }));
  };

  window.setup.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });

  window.setup.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });

  var onSucsessLoad = function (wizardsData) {
    wizards = wizardsData;
    updateWizards();
  };

  window.backend.load(onSucsessLoad, window.util.onErrorLoad);
})();
