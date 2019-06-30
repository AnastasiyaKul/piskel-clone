"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Frame =
/*#__PURE__*/
function () {
  function Frame(canvasSize, parent, canvas) {
    _classCallCheck(this, Frame);

    this.canvas = canvas;
    this.canvasSize = canvasSize;
    this.parent = parent;
    this.canvasComponents = [];
  }

  _createClass(Frame, [{
    key: "showFrame",
    value: function showFrame(colorsArray, elemBefore) {
      this.createFrame(elemBefore);
      this.buildFrameCanvas();
      this.setColors(colorsArray);
      this.addCopyButton();
      this.addDeleteButton();
    }
  }, {
    key: "createFrame",
    value: function createFrame(elemBefore) {
      this.frameHolder = document.createElement('div');
      this.frameHolder.classList.add('frame-holder');

      if (elemBefore) {
        this.parent.insertBefore(this.frameHolder, elemBefore.frameHolder);
      } else {
        this.parent.appendChild(this.frameHolder);
      }
    }
  }, {
    key: "buildFrameCanvas",
    value: function buildFrameCanvas() {
      for (var i = 0; i < this.canvasSize; i++) {
        this.canvasComponents.push(document.createElement('div'));
        this.canvasComponents[i].classList.add('mini-components');
        this.frameHolder.appendChild(this.canvasComponents[i]);
      }
    }
  }, {
    key: "setColors",
    value: function setColors(colorsArray) {
      this.colorsArray = colorsArray.slice();
      this.canvasComponents.forEach(function (component, index) {
        component.style.backgroundColor = colorsArray[index];
      });
    }
  }, {
    key: "addCopyButton",
    value: function addCopyButton() {
      this.copyButton = document.createElement('div');
      this.copyButton.classList.add('copy-btn');
      this.frameHolder.appendChild(this.copyButton);
    }
  }, {
    key: "addDeleteButton",
    value: function addDeleteButton() {
      this.deleteButton = document.createElement('div');
      this.deleteButton.classList.add('delete-btn');
      this.deleteButton.style.display = 'none';
      this.frameHolder.appendChild(this.deleteButton);
    }
  }, {
    key: "removeFrame",
    value: function removeFrame() {
      this.frameHolder.remove();
      this.deleteButton.remove();
    }
  }]);

  return Frame;
}();

exports["default"] = Frame;