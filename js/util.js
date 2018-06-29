'use strict';

window.util = (function () {
  return {
    showBlock: function (block) {
      block.classList.remove('hidden');
    },
    hideBlock: function (block) {
      block.classList.add('hidden');
    }
  };
})();
