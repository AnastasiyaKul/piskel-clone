export default class Tools {
  constructor(canvasBlock, canvas, defaultColor) {
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

  start() {
    this.currentColorElem.style.backgroundColor = this.chosenColor;
    this.addListeners();
    this.addKeyboardListeners();
  }

  addListeners() {
    this.toolsSection.addEventListener('click', (e) => this.changeTool(e));
    this.palette.addEventListener('click', (e) => this.changeCurrentColor(e));
    document.body.addEventListener('mouseup', () => this.stopDrawing());
    this.canvasBlock.addEventListener('mousedown', this);
    this.canvasBlock.addEventListener('mouseup', this);
    this.canvasBlock.addEventListener('mouseleave', this);
  }

  changeTool(e) {
    const target = e.target;
    if(!target.classList.contains('tool')) return;
    if(target.id === 'pencil') {
      this.currentTool = 'pencil';
      this.currentColor = this.chosenColor;
    }
    if(target.id === 'erase') {
      this.currentTool = 'erase';
      this.currentColor = this.defaultColor;
    }
    if(target.id === 'fill-color') {
      this.currentTool = 'fill-color';
      this.currentColor = this.chosenColor;
    }
    if(target.id === 'flip') {
      this.currentTool = 'flip';
      this.canvas.rotateCanvas(this.currentTool);
    }
    if(target.id === 'rotation') {
      this.currentTool = 'rotation';
      this.canvas.rotateCanvas(this.currentTool);
    }
  }

  changeCurrentColor(e) {
    const target = e.target;
    if(!target.classList.contains('color')) return;
    this.currentColor = target.id;
    this.currentColorElem.style.backgroundColor = this.currentColor;
  }

  startDrawing(e) {
    if(this.currentTool !== 'fill-color') {
      this.paintCanvasComponent(e.target);
      this.canvasBlock.addEventListener('mousemove', this);
    } else {
      const targetColor = e.target.style.backgroundColor;
      this.canvas.colorsArray.forEach((elem, ind) => {
        if(elem === targetColor) {
          this.canvas.canvasArray[ind].style.backgroundColor = this.currentColor;
        }
      });
      this.endDrawing();
      this.canvas.updateColorsArray();
    }
  }

  endDrawing() {
    this.canvasBlock.removeEventListener('mousemove', this);
  }

  paintCanvasComponent(etarget) {
    const target = etarget;
    if(!target.classList.contains('canvas-component')) return;
    this.isDrawing = true;
    target.style.backgroundColor = this.currentColor;
  }

  stopDrawing() {
    if(this.isDrawing) {
      this.canvas.updateColorsArray();
    }
    this.isDrawing = false;
  }

  handleEvent(e) {
    switch(e.type) {
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

  addKeyboardListeners() {
    const keyP = 112;
    const keyE = 101;
    const keyF = 102;
    const keyK = 107;
    document.body.addEventListener('keypress', (e) => {
      const keyCode = this.getChar(e);
      if(keyCode === keyP) {
        this.currentTool = 'pencil';
        this.currentColor = this.chosenColor;
      }
      if(keyCode === keyE) {
        this.currentTool = 'erase';
        this.currentColor = this.defaultColor;
      }
      if(keyCode === keyF) {
        this.currentTool = 'fill-color';
        this.currentColor = this.chosenColor;
      }
      if(keyCode === keyK) {
        document.getElementById('shortcut-desc').style.display='block';
      }
    })
  }

  getChar(event) {
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
}
