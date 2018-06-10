/* eslint-disable semi */
'use strict';
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_CUT_X = 60;
var CLOUD_CUT_Y = 30;
var TEXT_MARGIN_RIGHT = 55;
var TEXT_MARGIN_TOP = 25;
var TEXT_LINE_HEIGHT = 22;
var DIAGRAM_WIDTH = 40;
var DIAGRAM_HEIGHT = 150;
var DIAGRAM_MARGIN_RIGHT = 55;
var DIAGRAM_MARGIN_DOWN = 20;
var DIAGRAM_MARGIN_UP = 80;
var DIAGRAM_SPACE_BETWEEN = 50;
var COLUMN_NUMBER = 4;

window.renderStatistics = function (ctx, names, times) {
  ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
  ctx.shadowOffsetY = 10;
  ctx.shadowOffsetX = 10;
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.moveTo(CLOUD_X + CLOUD_CUT_X, CLOUD_Y);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH - CLOUD_CUT_X, CLOUD_Y);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH, CLOUD_Y + CLOUD_CUT_Y);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH, CLOUD_Y + CLOUD_HEIGHT - CLOUD_CUT_Y);
  ctx.lineTo(CLOUD_X + CLOUD_WIDTH - CLOUD_CUT_X, CLOUD_Y + CLOUD_HEIGHT);
  ctx.lineTo(CLOUD_X + CLOUD_CUT_X, CLOUD_Y + CLOUD_HEIGHT);
  ctx.lineTo(CLOUD_X, CLOUD_Y + CLOUD_HEIGHT - CLOUD_CUT_Y);
  ctx.lineTo(CLOUD_X, CLOUD_Y + CLOUD_CUT_Y);
  ctx.lineTo(CLOUD_X + CLOUD_CUT_X, CLOUD_Y);
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.shadowOffsetY = 0;
  ctx.shadowOffsetX = 0;
  ctx.fillStyle = '#000000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + TEXT_MARGIN_RIGHT, CLOUD_Y + TEXT_MARGIN_TOP);
  ctx.fillText('Список результатов:', CLOUD_X + TEXT_MARGIN_RIGHT, CLOUD_Y + TEXT_MARGIN_TOP + TEXT_LINE_HEIGHT);

  var swap = times[0];
  for (var i = 0; i < times.length; i++) {
    if (times[i] > swap) {
      swap = times[i];
    }
  }
  var diagram = [];
  for (i = 0; i < times.length; i++) {
    diagram[i] = DIAGRAM_HEIGHT * times[i] / swap;
  }

  for (i = 0; i < COLUMN_NUMBER; i++) {
    ctx.fillStyle = '#000000';
    var color = '#0000';
    var sub = Math.floor(Math.random() * 256).toString(16);
    color += (sub.length === 1 ? '0' + sub : sub);
    if (names[i] === 'Вы') {
      ctx.fillText(Math.floor(times[i]), CLOUD_X + DIAGRAM_MARGIN_RIGHT + DIAGRAM_WIDTH * i + DIAGRAM_SPACE_BETWEEN * i, CLOUD_Y + DIAGRAM_MARGIN_UP + DIAGRAM_HEIGHT - diagram[i] - DIAGRAM_MARGIN_DOWN / 2);
      ctx.fillText(names[i], CLOUD_X + DIAGRAM_MARGIN_RIGHT + DIAGRAM_WIDTH * i + DIAGRAM_SPACE_BETWEEN * i, CLOUD_Y + CLOUD_HEIGHT - DIAGRAM_MARGIN_DOWN);
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(CLOUD_X + DIAGRAM_MARGIN_RIGHT + DIAGRAM_WIDTH * i + DIAGRAM_SPACE_BETWEEN * i, CLOUD_Y + DIAGRAM_MARGIN_UP + DIAGRAM_HEIGHT - diagram[i], DIAGRAM_WIDTH, diagram[i]);
    } else {
      ctx.fillText(Math.floor(times[i]), CLOUD_X + DIAGRAM_MARGIN_RIGHT + DIAGRAM_WIDTH * i + DIAGRAM_SPACE_BETWEEN * i, CLOUD_Y + DIAGRAM_MARGIN_UP + DIAGRAM_HEIGHT - diagram[i] - DIAGRAM_MARGIN_DOWN / 2);
      ctx.fillText(names[i], CLOUD_X + DIAGRAM_MARGIN_RIGHT + DIAGRAM_WIDTH * i + DIAGRAM_SPACE_BETWEEN * i, CLOUD_Y + CLOUD_HEIGHT - DIAGRAM_MARGIN_DOWN);
      ctx.fillStyle = color;
      ctx.fillRect(CLOUD_X + DIAGRAM_MARGIN_RIGHT + DIAGRAM_WIDTH * i + DIAGRAM_SPACE_BETWEEN * i, CLOUD_Y + DIAGRAM_MARGIN_UP + DIAGRAM_HEIGHT - diagram[i], DIAGRAM_WIDTH, diagram[i]);
    }
  }
}
