/* eslint-disable semi */
'use strict';

(function () {
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

    var cloudRightLine = CLOUD_X + CLOUD_WIDTH;
    var cloudRightIncline = cloudRightLine - CLOUD_CUT_X;
    var cloudLeftIncline = CLOUD_X + CLOUD_CUT_X;
    var cloudDownLine = CLOUD_Y + CLOUD_HEIGHT;
    var cloudDownIncline = cloudDownLine - CLOUD_CUT_Y;
    var cloudUpIncline = CLOUD_Y + CLOUD_CUT_Y;

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.moveTo(cloudLeftIncline, CLOUD_Y);
    ctx.lineTo(cloudRightIncline, CLOUD_Y);
    ctx.lineTo(cloudRightLine, cloudUpIncline);
    ctx.lineTo(cloudRightLine, cloudDownIncline);
    ctx.lineTo(cloudRightIncline, cloudDownLine);
    ctx.lineTo(cloudLeftIncline, cloudDownLine);
    ctx.lineTo(CLOUD_X, cloudDownIncline);
    ctx.lineTo(CLOUD_X, cloudUpIncline);
    ctx.lineTo(cloudLeftIncline, CLOUD_Y);
    ctx.fill();

    ctx.shadowColor = 'transparent';
    ctx.shadowOffsetY = 0;
    ctx.shadowOffsetX = 0;

    var drawText = function (context, text, x, y, color, font) {
      context.fillStyle = color || '#000000';
      context.font = font || '16px PT Mono';
      context.fillText(text, x, y);
    }

    var textMarginRight = CLOUD_X + TEXT_MARGIN_RIGHT;
    var textMarginTop = CLOUD_Y + TEXT_MARGIN_TOP;

    drawText(ctx, 'Ура вы победили!', textMarginRight, textMarginTop);
    drawText(ctx, 'Список результатов:', textMarginRight, textMarginTop + TEXT_LINE_HEIGHT);

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

    var firstColumnX = CLOUD_X + DIAGRAM_MARGIN_RIGHT;
    var nextColumnX = DIAGRAM_WIDTH + DIAGRAM_SPACE_BETWEEN;
    var columnsY = CLOUD_Y + DIAGRAM_MARGIN_UP + DIAGRAM_HEIGHT;
    var timesY = CLOUD_Y + DIAGRAM_MARGIN_UP + DIAGRAM_HEIGHT - DIAGRAM_MARGIN_DOWN / 2;
    var namesY = CLOUD_Y + CLOUD_HEIGHT - DIAGRAM_MARGIN_DOWN;

    for (i = 0; i < COLUMN_NUMBER; i++) {
      var columnsX = firstColumnX + nextColumnX * i;
      drawText(ctx, Math.floor(times[i]), columnsX, timesY - diagram[i]);
      drawText(ctx, names[i], columnsX, namesY);
      var opacity = Math.random().toFixed(2) * (1 - 0.3) + 0.3;
      ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgba(0, 0, 255, ' + opacity + ')';
      ctx.fillRect(columnsX, columnsY - diagram[i], DIAGRAM_WIDTH, diagram[i]);
    }
  }
})();
