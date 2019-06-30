"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _canvas = _interopRequireDefault(require("./canvas"));

var _tools = _interopRequireDefault(require("./tools"));

var _frame = _interopRequireDefault(require("./frame"));

var _animationPreview = _interopRequireDefault(require("./animation-preview"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var App =
/*#__PURE__*/
function () {
  function App() {
    _classCallCheck(this, App);

    this.canvasBlock = document.getElementById('canvas-holder');
    this.framesHolder = document.getElementById('frames-holder');
    this.addFrameBtn = document.getElementById('add-frame-btn');
    this.defaultColor = 'ivory';
    this.canvasSide = 32;
    this.canvasSize = this.canvasSide * this.canvasSide;
    this.frames = [];
  }

  _createClass(App, [{
    key: "start",
    value: function start() {
      this.canvas = new _canvas["default"](this.canvasSize, this.canvasBlock, this.defaultColor);
      this.tools = new _tools["default"](this.canvasBlock, this.canvas, this.defaultColor);
      this.canvas.showCanvas();
      this.tools.start();
      this.pushNewFrame(this.frames[this.frames.length - 1]);
      this.addListeners();
      this.setFramesToAnimationPreview();
    }
  }, {
    key: "pushNewFrame",
    value: function pushNewFrame() {
      this.canvas.resetColors();
      this.createFrame(this.frames.length, this.canvas.colorsArray);
      this.currentFrameIndex = this.frames.length - 1;
      this.canvas.bindFrame(this.frames[this.currentFrameIndex]);
    }
  }, {
    key: "createFrame",
    value: function createFrame(newFrameIndex, colorsArray) {
      var _this = this;

      var frame = new _frame["default"](this.canvasSize, this.framesHolder, this.canvas);
      this.frames.splice(newFrameIndex, 0, frame);
      this.currentFrameIndex = newFrameIndex;
      frame.showFrame(colorsArray, this.frames[newFrameIndex + 1]);
      frame.deleteButton.addEventListener('click', function () {
        return _this.deleteFrame(frame);
      });
      frame.copyButton.addEventListener('click', function () {
        return _this.copyFrame(frame);
      });
      frame.frameHolder.addEventListener('click', function (e) {
        return _this.changeCurrentFrame(e, frame);
      });
      this.checkFramesCount();
    }
  }, {
    key: "checkFramesCount",
    value: function checkFramesCount() {
      var display = this.frames.length > 1 ? '' : 'none';
      this.frames.forEach(function (frame) {
        frame.deleteButton.style.display = display;
      });
    }
  }, {
    key: "deleteFrame",
    value: function deleteFrame(frame) {
      var index = this.frames.indexOf(frame);
      this.frames[index].removeFrame();
      this.frames.splice(index, 1);
      this.checkFramesCount();

      if (index === this.currentFrameIndex && index === this.frames.length || index < this.currentFrameIndex) {
        this.currentFrameIndex -= 1;
      }

      this.canvas.bindFrame(this.frames[this.currentFrameIndex]);
      this.canvas.setColors(this.frames[this.currentFrameIndex].colorsArray);
    }
  }, {
    key: "copyFrame",
    value: function copyFrame(frame) {
      var index = this.frames.indexOf(frame, 0);
      this.createFrame(index + 1, this.frames[index].colorsArray);
      this.canvas.setColors(this.frames[index].colorsArray);
      this.canvas.bindFrame(this.frames[index + 1]);
      this.currentFrameIndex = index + 1;
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this2 = this;

      this.addFrameBtn.addEventListener('click', function () {
        return _this2.pushNewFrame();
      });
    }
  }, {
    key: "changeCurrentFrame",
    value: function changeCurrentFrame(e, frame) {
      var target = e.target;

      if (target.className === 'frame-holder' || target.className === 'mini-components') {
        this.canvas.setColors(frame.colorsArray);
        this.canvas.bindFrame(frame);
        this.currentFrameIndex = this.frames.indexOf(frame);
      }
    }
  }, {
    key: "setFramesToAnimationPreview",
    value: function setFramesToAnimationPreview() {
      var animationHolder = document.getElementById('screen');
      this.animationPreview = new _animationPreview["default"](animationHolder, this.frames, this.canvasSize);
      this.animationPreview.startAnimation();
    }
  }]);

  return App;
}();

exports["default"] = App;