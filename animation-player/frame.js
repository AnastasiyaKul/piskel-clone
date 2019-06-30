export default class Frame {
  constructor(canvasSize, parent, canvas) {
    this.canvas = canvas;
    this.canvasSize = canvasSize;
    this.parent = parent;
    this.canvasComponents = [];
  }

  showFrame(colorsArray, elemBefore) {
    this.createFrame(elemBefore);
    this.buildFrameCanvas();
    this.setColors(colorsArray);
    this.addCopyButton();
    this.addDeleteButton();
  }

  createFrame(elemBefore) {
    this.frameHolder = document.createElement('div');
    this.frameHolder.classList.add('frame-holder');
    if(elemBefore) {
      this.parent.insertBefore(this.frameHolder, elemBefore.frameHolder);
    } else {
      this.parent.appendChild(this.frameHolder);
    }
  }

  buildFrameCanvas() {
    for(let i = 0; i < this.canvasSize; i++) {
      this.canvasComponents.push(document.createElement('div'));
      this.canvasComponents[i].classList.add('mini-components');
      this.frameHolder.appendChild(this.canvasComponents[i]);
    }
  }

  setColors(colorsArray) {
    this.colorsArray = colorsArray.slice();
    this.canvasComponents.forEach((component, index) => {
      component.style.backgroundColor = colorsArray[index];
    })
  }

  addCopyButton() {
    this.copyButton = document.createElement('div');
    this.copyButton.classList.add('copy-btn');
    this.frameHolder.appendChild(this.copyButton);
  }

  addDeleteButton() {
    this.deleteButton = document.createElement('div');
    this.deleteButton.classList.add('delete-btn');
    this.deleteButton.style.display = 'none';
    this.frameHolder.appendChild(this.deleteButton);
  }

  removeFrame() {
    this.frameHolder.remove();
    this.deleteButton.remove();
  }
}
