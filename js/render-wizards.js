'use strict';

(function () {
  var similarListElement = window.setup.block.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  window.renderWizards = function (data) {
    similarListElement.innerHTML = '';
    var WIZARDS_NUMBER = 4;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      fragment.appendChild(renderWizard(data[i]));
    }
    similarListElement.appendChild(fragment);
    var similarSetup = window.setup.block.querySelector('.setup-similar');
    window.util.showBlock(similarSetup);
  };
})();
