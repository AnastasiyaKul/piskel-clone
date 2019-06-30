"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _frame = _interopRequireDefault(require("./frame"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnimationPreview =
/*#__PURE__*/
function () {
  function AnimationPreview(parent, frames, canvasSize) {
    _classCallCheck(this, AnimationPreview);

    this.animationPreviewHolder = parent;
    this.frames = frames;
    this.canvasSize = canvasSize;
    this.FPS = 1;
    this.index = 0;
  }

  _createClass(AnimationPreview, [{
    key: "startAnimation",
    value: function startAnimation() {
      this.createAnimationCanvas();
      this.runAnimationTimer();
    }
  }, {
    key: "createAnimationCanvas",
    value: function createAnimationCanvas() {
      this.animationFrame = new _frame["default"](this.canvasSize, this.animationPreviewHolder, this.frames[0].canvas);
      this.animationFrame.showFrame(this.frames[0].colorsArray);
      var copyBtns = this.animationFrame.frameHolder.getElementsByClassName('copy-btn');
      this.animationFrame.frameHolder.removeChild(copyBtns[0]);
    }
  }, {
    key: "setFrameColors",
    value: function setFrameColors() {
      this.index = (this.index + 1) % this.frames.length;
      this.animationFrame.setColors(this.frames[this.index].colorsArray);
    }
  }, {
    key: "runAnimationTimer",
    value: function runAnimationTimer() {
      var _this = this;

      setInterval(function () {
        return _this.setFrameColors();
      }, this.FPS * 1000);
    }
  }]);

  return AnimationPreview;
}();

exports["default"] = AnimationPreview;