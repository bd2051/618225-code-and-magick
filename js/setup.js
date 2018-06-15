'use strict';

var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarListElement = userDialog.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

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

var getRandomArbitrary = function (length) {
  return Math.round(Math.random() * (length - 1));
};

var RandomWizard = {};
var wizards = [];
var WIZARDS_NUMBER = 4;

for (var i = 0; i < WIZARDS_NUMBER; i++) {
  RandomWizard = {
    name: randomFirstName[getRandomArbitrary(randomFirstName.length)] + ' ' + randomSecondName[getRandomArbitrary(randomSecondName.length)],
    coatColor: randomCoat[getRandomArbitrary(randomCoat.length)],
    eyesColor: randomEyes[getRandomArbitrary(randomEyes.length)]
  };
  wizards[i] = RandomWizard;
}

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();
for (i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
