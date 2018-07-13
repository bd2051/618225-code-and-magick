'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  window.util = {
    showBlock: function (block) {
      block.classList.remove('hidden');
    },
    hideBlock: function (block) {
      block.classList.add('hidden');
    },
    onObjectEnterPress: function (evt, cb) {
      if (evt.keyCode === ENTER_KEYCODE) {
        cb();
      }
    },
    onObjectEscPress: function (evt, cb) {
      if (evt.keyCode === ESC_KEYCODE) {
        cb();
      }
    },
    onErrorLoad: function (errorMessage) {
      var node = document.createElement('div');
      node.style =
        'z-index: 100;' +
        'margin: 0 auto;' +
        'padding: 10px;' +
        'text-align: center;' +
        'background-color: white;' +
        'border: 1px solid black;' +
        'width: 50%;' +
        'min-height: 100px;';
      node.style.position = 'absolute';
      node.style.left = '10%';
      node.style.right = '10%';
      node.style.top = '40%';
      node.style.fontSize = '20px';
      node.textContent = errorMessage;
      var nodeButton = document.createElement('button');
      nodeButton.style =
        'display: block;' +
        'margin: 10px auto;' +
        'text-align: center;' +
        'background-color: white;' +
        'border: 1px solid black;' +
        'line-height: 40px';
      nodeButton.type = 'button';
      nodeButton.textContent = 'OK';
      window.setup.block.insertAdjacentElement('afterbegin', node);
      node.insertAdjacentElement('beforeend', nodeButton);
      var onErrorMessageEnterPress = function (evt) {
        window.util.onObjectEnterPress(evt, function () {
          window.setup.block.removeChild(node);
          document.removeEventListener('keydown', onErrorMessageEnterPress);
          nodeButton.removeEventListener('click', onErrorMessageClick);
        });
      };
      var onErrorMessageClick = function () {
        window.setup.block.removeChild(node);
        nodeButton.removeEventListener('click', onErrorMessageClick);
        document.removeEventListener('keydown', onErrorMessageEnterPress);
      };
      document.addEventListener('keydown', onErrorMessageEnterPress);
      nodeButton.addEventListener('click', onErrorMessageClick);
    }
  };
})();
