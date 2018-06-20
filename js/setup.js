'use strict';

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
var randomFireball = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var userDialog = document.querySelector('.setup');

var wizardElements = [
  {
    inputElement: userDialog.querySelector('.coat-color'),
    wizardElement: userDialog.querySelector('.wizard-coat'),
    colorIndex: 0
  },
  {
    inputElement: userDialog.querySelector('.eyes-color'),
    wizardElement: userDialog.querySelector('.wizard-eyes'),
    colorIndex: 0
  },
  {
    inputElement: userDialog.querySelector('.fireball-color'),
    wizardElement: userDialog.querySelector('.setup-fireball-wrap'),
    colorIndex: 0
  }
];

var COAT_INDEX = 0;
var EYES_INDEX = 1;
var FIREBALL_INDEX = 2;

var changeWizardElementColor = function (elementIndex, colors) {
  wizardElements[elementIndex].colorIndex++;
  if (wizardElements[elementIndex].colorIndex >= colors.length) {
    wizardElements[elementIndex].colorIndex = 0;
  }
  if (elementIndex === FIREBALL_INDEX) {
    wizardElements[elementIndex].wizardElement.style.background = colors[wizardElements[elementIndex].colorIndex];
  } else {
    wizardElements[elementIndex].wizardElement.style.fill = colors[wizardElements[elementIndex].colorIndex];
  }
};

var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userDialogInput = document.querySelector('.setup-user-name');
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

var onUserAvatarClick = function () {
  openPopup();
};

var onUserAvatarEnterPress = function (evt) {
  onObjectEnterPress(evt, function () {
    openPopup();
  });
};

var onCloseButtonClick = function () {
  closePopup();
};

var onCloseButtonEnterPress = function (evt) {
  onObjectEnterPress(evt, function () {
    closePopup();
  });
};

var onUserNameFocus = function () {
  document.removeEventListener('keydown', onPopupEscPress);
};

var onUserNameBlur = function () {
  document.addEventListener('keydown', onPopupEscPress);
};

var onWizardCoatClick = function () {
  changeWizardElementColor(COAT_INDEX, randomCoat);
};

var onWizardCoatEnterPress = function (evt) {
  onObjectEnterPress(evt, function () {
    changeWizardElementColor(COAT_INDEX, randomCoat);
  });
};

var onWizardEyesClick = function () {
  changeWizardElementColor(EYES_INDEX, randomEyes);
};

var onWizardEyesEnterPress = function (evt) {
  onObjectEnterPress(evt, function () {
    changeWizardElementColor(EYES_INDEX, randomEyes);
  });
};

var onWizardFireballClick = function () {
  changeWizardElementColor(FIREBALL_INDEX, randomFireball);
};

var onWizardFireballEnterPress = function (evt) {
  onObjectEnterPress(evt, function () {
    changeWizardElementColor(FIREBALL_INDEX, randomFireball);
  });
};

var showBlock = function (block) {
  block.classList.remove('hidden');
};

var hideBlock = function (block) {
  block.classList.add('hidden');
};

var openPopup = function () {
  showBlock(userDialog);
  document.addEventListener('keydown', onPopupEscPress);
  wizardElements[COAT_INDEX].wizardElement.addEventListener('click', onWizardCoatClick);
  wizardElements[COAT_INDEX].wizardElement.addEventListener('keydown', onWizardCoatEnterPress);
  wizardElements[EYES_INDEX].wizardElement.addEventListener('click', onWizardEyesClick);
  wizardElements[EYES_INDEX].wizardElement.addEventListener('keydown', onWizardEyesEnterPress);
  wizardElements[FIREBALL_INDEX].wizardElement.addEventListener('click', onWizardFireballClick);
  wizardElements[FIREBALL_INDEX].wizardElement.addEventListener('keydown', onWizardFireballEnterPress);
  userDialogClose.addEventListener('click', onCloseButtonClick);
  userDialogClose.addEventListener('keydown', onCloseButtonEnterPress);
  userDialogOpen.removeEventListener('click', onUserAvatarClick);
  userDialogOpen.removeEventListener('keydown', onUserAvatarEnterPress);
  userDialogInput.addEventListener('focus', onUserNameFocus);
  userDialogInput.addEventListener('blur', onUserNameBlur);
};

var closePopup = function () {
  hideBlock(userDialog);
  document.removeEventListener('keydown', onPopupEscPress);
  wizardElements[COAT_INDEX].wizardElement.removeEventListener('click', onWizardCoatClick);
  wizardElements[COAT_INDEX].wizardElement.removeEventListener('keydown', onWizardCoatEnterPress);
  wizardElements[EYES_INDEX].wizardElement.removeEventListener('click', onWizardEyesClick);
  wizardElements[EYES_INDEX].wizardElement.removeEventListener('keydown', onWizardEyesEnterPress);
  wizardElements[FIREBALL_INDEX].wizardElement.removeEventListener('click', onWizardFireballClick);
  wizardElements[FIREBALL_INDEX].wizardElement.removeEventListener('keydown', onWizardFireballEnterPress);
  userDialogClose.removeEventListener('click', onCloseButtonClick);
  userDialogClose.removeEventListener('keydown', onCloseButtonEnterPress);
  userDialogOpen.addEventListener('click', onUserAvatarClick);
  userDialogOpen.addEventListener('keydown', onUserAvatarEnterPress);
  userDialogInput.removeEventListener('focus', onUserNameFocus);
  userDialogInput.removeEventListener('blur', onUserNameBlur);
};

userDialogOpen.addEventListener('click', onUserAvatarClick);
userDialogOpen.addEventListener('keydown', onUserAvatarEnterPress);

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
