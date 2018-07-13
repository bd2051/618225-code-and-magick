'use strict';

(function () {
  /* var randomFirstName = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];
  var randomSecondName = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
  ];

  var getRandomWizard = function (firstName, secondName, coat, eyes) {
    var getRandomArbitrary = function (length) {
      return Math.round(Math.random() * (length - 1));
    };

    var RandomWizard = {};
    var RandomWizards = [];
    var WIZARDS_NUMBER = 4;

    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      RandomWizard = {
        name: firstName[getRandomArbitrary(firstName.length)] + ' ' + secondName[getRandomArbitrary(secondName.length)],
        coatColor: coat[getRandomArbitrary(coat.length)],
        eyesColor: eyes[getRandomArbitrary(eyes.length)]
      };
      RandomWizards[i] = RandomWizard;
    }

    return RandomWizards;
  };

  var wizards = getRandomWizard(randomFirstName, randomSecondName, window.setup.coat, window.setup.eyes); */

  var similarListElement = window.setup.block.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var onSucsessLoad = function (wizardsData) {
    var WIZARDS_NUMBER = 4;
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < WIZARDS_NUMBER; i++) {
      fragment.appendChild(renderWizard(wizardsData[i]));
    }
    similarListElement.appendChild(fragment);
    var similarSetup = window.setup.block.querySelector('.setup-similar');
    window.util.showBlock(similarSetup);
  };

  window.backend.load(onSucsessLoad, window.util.onErrorLoad);
})();
