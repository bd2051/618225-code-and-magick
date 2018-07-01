'use strict';

(function () {
  window.util = {
    showBlock: function (block) {
      block.classList.remove('hidden');
    },
    hideBlock: function (block) {
      block.classList.add('hidden');
    }
  };
})();
