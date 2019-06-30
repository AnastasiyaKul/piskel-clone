import Frame from "./frame";

export default class AnimationPreview {
  constructor(parent, frames, canvasSize) {
    this.animationPreviewHolder = parent;
    this.frames = frames;
    this.canvasSize = canvasSize;
    this.FPS = 1;
    this.index = 0;
  }

  startAnimation() {
    this.createAnimationCanvas();
    this.runAnimationTimer();
  }

  createAnimationCanvas() {
    this.animationFrame = new Frame(this.canvasSize, this.animationPreviewHolder, this.frames[0].canvas);
    this.animationFrame.showFrame(this.frames[0].colorsArray);
    const copyBtns = this.animationFrame.frameHolder.getElementsByClassName('copy-btn');
    this.animationFrame.frameHolder.removeChild(copyBtns[0]);
  }

  setFrameColors() {
    this.index = (this.index + 1) % this.frames.length;
    this.animationFrame.setColors(this.frames[this.index].colorsArray);
  }

  runAnimationTimer() {
    setInterval(() => this.setFrameColors(), this.FPS * 1000);
  }
}
