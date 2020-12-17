export default class Row {
  constructor(yPosition, yErrorMax) {
    this._yCreatedPosition = yPosition
    this._min = yPosition - yErrorMax
    this._max = yPosition + yErrorMax
    if (this._min < 0) {
      this._max = this._max + Math.abs(this._min)
      this._min = 0
    }
    this._cells = []
  }

  get cells() {
    return this._cells
  }

  get min() {
    return this._min
  }

  get max() {
    return this._max
  }

  isInRange(y) {
    return this.min <= y && y < this.max
  }
}
