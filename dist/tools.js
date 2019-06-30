"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Tools =
/*#__PURE__*/
function () {
  function Tools(canvasBlock, canvas, defaultColor) {
    _classCallCheck(this, Tools);

    this.toolsSection = document.getElementById('tools-holder');
    this.pencil = document.getElementById('pencil');
    this.erase = document.getElementById('erase');
    this.palette = document.getElementById('color-palette');
    this.currentColorElem = document.getElementById('current-color');
    this.canvasBlock = canvasBlock;
    this.canvas = canvas;
    this.currentTool = 'pencil';
    this.chosenColor = 'red';
    this.currentColor = this.chosenColor;
    this.defaultColor = defaultColor;
    this.isDrawing = false;
  }

  _createClass(Tools, [{
    key: "start",
    value: function start() {
      this.currentColorElem.style.backgroundColor = this.chosenColor;
      this.addListeners();
      this.addKeyboardListeners();
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this = this;

      this.toolsSection.addEventListener('click', function (e) {
        return _this.changeTool(e);
      });
      this.palette.addEventListener('click', function (e) {
        return _this.changeCurrentColor(e);
      });
      document.body.addEventListener('mouseup', function () {
        return _this.stopDrawing();
      });
      this.canvasBlock.addEventListener('mousedown', this);
      this.canvasBlock.addEventListener('mouseup', this);
      this.canvasBlock.addEventListener('mouseleave', this);
    }
  }, {
    key: "changeTool",
    value: function changeTool(e) {
      var target = e.target;
      if (!target.classList.contains('tool')) return;

      if (target.id === 'pencil') {
        this.currentTool = 'pencil';
        this.currentColor = this.chosenColor;
      }

      if (target.id === 'erase') {
        this.currentTool = 'erase';
        this.currentColor = this.defaultColor;
      }

      if (target.id === 'fill-color') {
        this.currentTool = 'fill-color';
        this.currentColor = this.chosenColor;
      }

      if (target.id === 'flip') {
        this.currentTool = 'flip';
        this.canvas.rotateCanvas(this.currentTool);
      }

      if (target.id === 'rotation') {
        this.currentTool = 'rotation';
        this.canvas.rotateCanvas(this.currentTool);
      }
    }
  }, {
    key: "changeCurrentColor",
    value: function changeCurrentColor(e) {
      var target = e.target;
      if (!target.classList.contains('color')) return;
      this.currentColor = target.id;
      this.currentColorElem.style.backgroundColor = this.currentColor;
    }
  }, {
    key: "startDrawing",
    value: function startDrawing(e) {
      var _this2 = this;

      if (this.currentTool !== 'fill-color') {
        this.paintCanvasComponent(e.target);
        this.canvasBlock.addEventListener('mousemove', this);
      } else {
        var targetColor = e.target.style.backgroundColor;
        this.canvas.colorsArray.forEach(function (elem, ind) {
          if (elem === targetColor) {
            _this2.canvas.canvasArray[ind].style.backgroundColor = _this2.currentColor;
          }
        });
        this.endDrawing();
        this.canvas.updateColorsArray();
      }
    }
  }, {
    key: "endDrawing",
    value: function endDrawing() {
      this.canvasBlock.removeEventListener('mousemove', this);
    }
  }, {
    key: "paintCanvasComponent",
    value: function paintCanvasComponent(etarget) {
      var target = etarget;
      if (!target.classList.contains('canvas-component')) return;
      this.isDrawing = true;
      target.style.backgroundColor = this.currentColor;
    }
  }, {
    key: "stopDrawing",
    value: function stopDrawing() {
      if (this.isDrawing) {
        this.canvas.updateColorsArray();
      }

      this.isDrawing = false;
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(e) {
      switch (e.type) {
        case "mousedown":
          this.startDrawing(e);
          break;

        case "mousemove":
          this.paintCanvasComponent(e.target);
          break;

        case "mouseup":
          this.endDrawing();
          break;

        case "mouseleave":
          this.endDrawing();
          break;

        default:
          return;
      }
    }
  }, {
    key: "addKeyboardListeners",
    value: function addKeyboardListeners() {
      var _this3 = this;

      var keyP = 112;
      var keyE = 101;
      var keyF = 102;
      var keyK = 107;
      document.body.addEventListener('keypress', function (e) {
        var keyCode = _this3.getChar(e);

        if (keyCode === keyP) {
          _this3.currentTool = 'pencil';
          _this3.currentColor = _this3.chosenColor;
        }

        if (keyCode === keyE) {
          _this3.currentTool = 'erase';
          _this3.currentColor = _this3.defaultColor;
        }

        if (keyCode === keyF) {
          _this3.currentTool = 'fill-color';
          _this3.currentColor = _this3.chosenColor;
        }

        if (keyCode === keyK) {
          document.getElementById('shortcut-desc').style.display = 'block';
        }
      });
    }
  }, {
    key: "getChar",
    value: function getChar(event) {
      if (event.which == null) {
        if (event.code < 32) return null;
        return event.code;
      }

      if (event.which != 0 && event.code != 0) {
        if (event.which < 32) return null;
        return event.which;
      }

      return null;
    }
  }]);

  return Tools;
}();

exports["default"] = Tools;