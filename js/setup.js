'use strict';

(function () {
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
      colorIndex: 0,
      color: randomCoat[0]
    },
    {
      inputElement: userDialog.querySelector('.eyes-color'),
      wizardElement: userDialog.querySelector('.wizard-eyes'),
      colorIndex: 0,
      color: randomEyes[0]
    },
    {
      inputElement: userDialog.querySelector('.fireball-color'),
      wizardElement: userDialog.querySelector('.setup-fireball-wrap'),
      colorIndex: 0,
      color: randomFireball[0]
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
    wizardElements[elementIndex].color = colors[wizardElements[elementIndex].colorIndex];
  };

  var saveWizardElementColor = function () {
    for (var i = 0; i < wizardElements.length; i++) {
      wizardElements[i].inputElement.value = wizardElements[i].color;
    }
  };

  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userDialogInput = document.querySelector('.setup-user-name');
  var userDialogSubmit = document.querySelector('.setup-wizard-form');

  var onPopupEscPress = function (evt) {
    window.util.onObjectEscPress(evt, function () {
      closePopup();
    });
  };

  var onUserAvatarClick = function () {
    openPopup();
  };

  var onUserAvatarEnterPress = function (evt) {
    window.util.onObjectEnterPress(evt, function () {
      openPopup();
    });
  };

  var onCloseButtonClick = function () {
    closePopup();
  };

  var onCloseButtonEnterPress = function (evt) {
    window.util.onObjectEnterPress(evt, function () {
      closePopup();
    });
  };

  var onUserNameFocus = function () {
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var onUserNameBlur = function () {
    document.addEventListener('keydown', onPopupEscPress);
  };

  var onSucsessLoad = function () {
    closePopup();
  };

  var onSaveButtonSubmit = function (evt) {
    evt.preventDefault();
    saveWizardElementColor();
    window.backend.save(new FormData(userDialogSubmit), onSucsessLoad, window.util.onErrorLoad);
    document.querySelector('.setup-submit').blur();
  };

  var onWizardCoatClick = function () {
    changeWizardElementColor(COAT_INDEX, randomCoat);
  };

  var onWizardCoatEnterPress = function (evt) {
    window.util.onObjectEnterPress(evt, function () {
      changeWizardElementColor(COAT_INDEX, randomCoat);
    });
  };

  var onWizardEyesClick = function () {
    changeWizardElementColor(EYES_INDEX, randomEyes);
  };

  var onWizardEyesEnterPress = function (evt) {
    window.util.onObjectEnterPress(evt, function () {
      changeWizardElementColor(EYES_INDEX, randomEyes);
    });
  };

  var onWizardFireballClick = function () {
    changeWizardElementColor(FIREBALL_INDEX, randomFireball);
  };

  var onWizardFireballEnterPress = function (evt) {
    window.util.onObjectEnterPress(evt, function () {
      changeWizardElementColor(FIREBALL_INDEX, randomFireball);
    });
  };

  var dialogHandler = userDialog.querySelector('.upload');

  var onDialogHandlerMouseDowm = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
      userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (e) {
          e.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };
        dialogHandler.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var openPopup = function () {
    window.util.showBlock(userDialog);
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
    userDialogSubmit.addEventListener('submit', onSaveButtonSubmit);
    dialogHandler.addEventListener('mousedown', onDialogHandlerMouseDowm);
  };

  var closePopup = function () {
    window.util.hideBlock(userDialog);
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
    userDialogSubmit.removeEventListener('submit', onSaveButtonSubmit);
    dialogHandler.removeEventListener('mousedown', onDialogHandlerMouseDowm);
    userDialog.style.top = '80px';
    userDialog.style.left = '50%';
  };

  userDialogOpen.addEventListener('click', onUserAvatarClick);
  userDialogOpen.addEventListener('keydown', onUserAvatarEnterPress);

  window.setup = {
    coat: randomCoat,
    eyes: randomEyes,
    block: userDialog
  };
})();
