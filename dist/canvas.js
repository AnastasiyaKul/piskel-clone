"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas =
/*#__PURE__*/
function () {
  function Canvas(canvasSize, parent, defaultColor) {
    _classCallCheck(this, Canvas);

    this.canvasSize = canvasSize;
    this.parent = parent;
    this.canvasArray = [];
    this.colorsArray = [];
    this.defaultColor = defaultColor;
  }

  _createClass(Canvas, [{
    key: "showCanvas",
    value: function showCanvas() {
      this.createArrays();
    }
  }, {
    key: "createArrays",
    value: function createArrays() {
      for (var i = 0; i < this.canvasSize; i++) {
        this.canvasArray.push(document.createElement('div'));
        this.canvasArray[i].classList.add('canvas-component');
        this.canvasArray[i].style.backgroundColor = this.defaultColor;
        this.parent.appendChild(this.canvasArray[i]);
        this.colorsArray.push(this.defaultColor);
      }
    }
  }, {
    key: "resetColors",
    value: function resetColors() {
      for (var i = 0; i < this.canvasSize; i++) {
        this.canvasArray[i].style.backgroundColor = this.defaultColor;
        this.colorsArray[i] = this.defaultColor;
      }
    }
  }, {
    key: "updateColorsArray",
    value: function updateColorsArray() {
      for (var i = 0; i < this.canvasSize; i++) {
        this.colorsArray[i] = this.canvasArray[i].style.backgroundColor;
      }

      this.frame.setColors(this.colorsArray);
    }
  }, {
    key: "bindFrame",
    value: function bindFrame(frame) {
      this.frame = frame;
    }
  }, {
    key: "setColors",
    value: function setColors(newColorsArray) {
      var _this = this;

      this.colorsArray = newColorsArray.slice();
      this.canvasArray.forEach(function (el, ind) {
        el.style.backgroundColor = _this.colorsArray[ind];
      });
    }
  }, {
    key: "rotateCanvas",
    value: function rotateCanvas(tool) {
      this.colorsArray = this.reverseColorsArray(tool);
      this.setColors(this.colorsArray);
      this.frame.setColors(this.colorsArray);
    }
  }, {
    key: "reverseColorsArray",
    value: function reverseColorsArray(tool) {
      var rows = this.getCanvasRows();
      var newColorsArray = [];

      if (tool === 'flip') {
        rows.forEach(function (row) {
          var reverseRow = row.reverse();
          reverseRow.forEach(function (el) {
            return newColorsArray.push(el);
          });
        });
      }

      if (tool === 'rotation') {
        for (var i = 0; i < rows.length; i++) {
          for (var j = rows.length - 1; j >= 0; j--) {
            newColorsArray.push(rows[j][i]);
          }
        }
      }

      return newColorsArray;
    }
  }, {
    key: "getCanvasRows",
    value: function getCanvasRows() {
      var rows = [];
      var step = Math.sqrt(this.canvasSize);

      for (var i = 0; i < step; i++) {
        rows.push(this.colorsArray.splice(0, step));
      }

      return rows;
    }
  }]);

  return Canvas;
}();

exports["default"] = Canvas;