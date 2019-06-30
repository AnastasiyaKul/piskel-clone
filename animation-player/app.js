import Canvas from "./canvas";
import Tools from "./tools";
import Frame from "./frame";
import AnimationPreview from "./animation-preview";

export default class App {
  constructor() {
    this.canvasBlock = document.getElementById('canvas-holder');
    this.framesHolder = document.getElementById('frames-holder');
    this.addFrameBtn = document.getElementById('add-frame-btn');

    this.defaultColor = 'ivory';
    this.canvasSide = 32;
    this.canvasSize = this.canvasSide * this.canvasSide;

    this.frames = [];
  }

  start() {
    this.canvas = new Canvas(this.canvasSize, this.canvasBlock, this.defaultColor);
    this.tools = new Tools(this.canvasBlock, this.canvas, this.defaultColor);
    this.canvas.showCanvas();
    this.tools.start();
    this.pushNewFrame(this.frames[this.frames.length - 1]);
    this.addListeners();
    this.setFramesToAnimationPreview();
  }

  pushNewFrame() {
    this.canvas.resetColors();
    this.createFrame(this.frames.length, this.canvas.colorsArray);
    this.currentFrameIndex = this.frames.length - 1;
    this.canvas.bindFrame(this.frames[this.currentFrameIndex]);
  }

  createFrame(newFrameIndex, colorsArray) {
    const frame = new Frame(this.canvasSize, this.framesHolder, this.canvas);
    this.frames.splice(newFrameIndex, 0, frame);
    this.currentFrameIndex = newFrameIndex;
    frame.showFrame(colorsArray, this.frames[newFrameIndex + 1]);
    frame.deleteButton.addEventListener('click', () => this.deleteFrame(frame));
    frame.copyButton.addEventListener('click', () => this.copyFrame(frame));
    frame.frameHolder.addEventListener('click', (e) => this.changeCurrentFrame(e, frame));
    this.checkFramesCount();
  }

  checkFramesCount() {
    const display = this.frames.length > 1 ? '' : 'none';
    this.frames.forEach((frame) => {
      frame.deleteButton.style.display = display;
    })
  }

  deleteFrame(frame) {
    const index = this.frames.indexOf(frame);
    this.frames[index].removeFrame();
    this.frames.splice(index, 1);
    this.checkFramesCount();
    if(index === this.currentFrameIndex && index === this.frames.length || index < this.currentFrameIndex) {
      this.currentFrameIndex -= 1;
    }
    this.canvas.bindFrame(this.frames[this.currentFrameIndex]);
    this.canvas.setColors(this.frames[this.currentFrameIndex].colorsArray);
  }

  copyFrame(frame) {
    const index = this.frames.indexOf(frame, 0);
    this.createFrame(index + 1, this.frames[index].colorsArray);
    this.canvas.setColors(this.frames[index].colorsArray);
    this.canvas.bindFrame(this.frames[index + 1]);
    this.currentFrameIndex = index + 1;
  }

  addListeners() {
    this.addFrameBtn.addEventListener('click', () => this.pushNewFrame());
  }

  changeCurrentFrame(e, frame) {
    const target = e.target;
    if(target.className === 'frame-holder' || target.className === 'mini-components') {
      this.canvas.setColors(frame.colorsArray);
      this.canvas.bindFrame(frame);
      this.currentFrameIndex = this.frames.indexOf(frame);
    }
  }

  setFramesToAnimationPreview() {
    const animationHolder = document.getElementById('screen');
    this.animationPreview = new AnimationPreview(animationHolder, this.frames, this.canvasSize);
    this.animationPreview.startAnimation();
  }
}
