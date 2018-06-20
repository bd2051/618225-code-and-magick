'use strict';

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');

var showBlock = function (block) {
  block.classList.remove('hidden');
};

var hideBlock = function (block) {
  block.classList.add('hidden');
};

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onObjectEnterPress = function (evt, cb) {
  if (evt.keyCode === ENTER_KEYCODE) {
    cb();
  }
};

var openPopup = function () {
  showBlock(userDialog);
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  hideBlock(userDialog);
  document.removeEventListener('keydown', onPopupEscPress);
};

userDialogOpen.addEventListener('click', function () {
  openPopup();
});

userDialogOpen.addEventListener('keydown', function (evt) {
  onObjectEnterPress(evt, function () {
    openPopup();
  });
});

userDialogClose.addEventListener('click', function () {
  closePopup();
});

userDialogClose.addEventListener('keydown', function (evt) {
  onObjectEnterPress(evt, function () {
    closePopup();
  });
});

var userDialogInput = document.querySelector('.setup-user-name');

userDialogInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userDialogInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

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
