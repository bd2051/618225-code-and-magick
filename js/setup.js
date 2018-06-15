'use strict';

var userDialog = document.querySelector('.setup');

var showBlock = function (block) {
  block.classList.remove('hidden');
};

showBlock(userDialog);

var randomFirstName = [
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
var randomCoat = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)',
];
var randomEyes = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
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
      coatColor: coat[getRandomArbitrary(randomCoat.length)],
      eyesColor: eyes[getRandomArbitrary(randomEyes.length)]
    };
    RandomWizards[i] = RandomWizard;
  }

  return RandomWizards;
};

var wizards = getRandomWizard(randomFirstName, randomSecondName, randomCoat, randomEyes);
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fillWizardsData = function (wizardsData) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizardsData.length; i++) {
    fragment.appendChild(renderWizard(wizardsData[i]));
  }
  similarListElement.appendChild(fragment);
};

fillWizardsData(wizards);
showBlock(userDialog.querySelector('.setup-similar'));
