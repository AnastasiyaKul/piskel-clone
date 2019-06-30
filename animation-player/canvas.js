export default class Canvas {
  constructor(canvasSize, parent, defaultColor) {
    this.canvasSize = canvasSize;
    this.parent = parent;
    this.canvasArray = [];
    this.colorsArray = [];
    this.defaultColor = defaultColor;
  }

  showCanvas() {
    this.createArrays();
  }

  createArrays() {
    for (let i = 0; i < this.canvasSize; i++) {
      this.canvasArray.push(document.createElement('div'));
      this.canvasArray[i].classList.add('canvas-component');
      this.canvasArray[i].style.backgroundColor = this.defaultColor;
      this.parent.appendChild(this.canvasArray[i]);

      this.colorsArray.push(this.defaultColor);
    }
  }

  resetColors() {
    for (let i = 0; i < this.canvasSize; i++) {
      this.canvasArray[i].style.backgroundColor = this.defaultColor;
      this.colorsArray[i] = this.defaultColor;
    }
  }

  updateColorsArray() {
    for (let i = 0; i < this.canvasSize; i++) {
      this.colorsArray[i] = this.canvasArray[i].style.backgroundColor;
    }
    this.frame.setColors(this.colorsArray);
  }

  bindFrame(frame) {
    this.frame = frame;
  }

  setColors(newColorsArray) {
    this.colorsArray = newColorsArray.slice();
    this.canvasArray.forEach((el, ind) => {
      el.style.backgroundColor = this.colorsArray[ind];
    })
  }

  rotateCanvas(tool) {
    this.colorsArray = this.reverseColorsArray(tool);
    this.setColors(this.colorsArray);
    this.frame.setColors(this.colorsArray);
  }

  reverseColorsArray(tool) {
    const rows = this.getCanvasRows();
    let newColorsArray = [];
    if(tool === 'flip') {
      rows.forEach((row) => {
        const reverseRow = row.reverse();
        reverseRow.forEach((el) => newColorsArray.push(el));
      });
    }
    if(tool === 'rotation') {
      for(let i = 0; i < rows.length; i++) {
        for(let j = rows.length - 1; j >= 0; j--) {
          newColorsArray.push(rows[j][i]);
        }
      }
    }
    return newColorsArray;
  }

  getCanvasRows() {
    let rows = [];
    const step = Math.sqrt(this.canvasSize);
    for(let i = 0; i < step; i++) {
      rows.push(this.colorsArray.splice(0, step));
    }
    return rows;
  }
}
