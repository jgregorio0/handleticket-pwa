import Row from './Row'
import NormalizedText from './NormalizedText'

export default class GridParser {
  constructor(yErrorMax) {
    this._yErrorMax = Number(yErrorMax)
    this._rows = []
    this._maxColLength = 0
  }

  get rows() {
    return this._rows
  }

  set rows(rows) {
    this._rows = rows
  }

  get yErrorMax() {
    return this._yErrorMax
  }

  set yErrorMax(yErrorMax) {
    this._yErrorMax = yErrorMax
  }

  get maxColLength() {
    return this._maxColLength
  }

  set maxColLength(maxColLength) {
    this._maxColLength = maxColLength
  }

  parse(annotations) {
    annotations
      // exclude anotations with more than one line
      .filter((annotation) => {
        return !/[\n\r\u21B5]/.test(annotation.text)
      })
      // add annotations to rows
      .forEach((annotation) => {
        const normalizedText = new NormalizedText(annotation)
        const assignedRow = this.assignRow(normalizedText.y)
        assignedRow.cells.push(normalizedText)
        this.updateMaxColLength(assignedRow.cells.length)
      })
    // sort rows content
    this.rows.forEach((row) => {
      row.cells.sort((normalizedText1, normalizedText2) => {
        return normalizedText1.x - normalizedText2.x
      })
    })
    // sort rows
    this.rows.sort((r1, r2) => {
      return r1.yCreatedPosition - r2.yCreatedPosition
    })
  }

  assignRow(y) {
    let assignedRow = this.rows.find((row) => row.isInRange(y))
    if (!assignedRow) {
      assignedRow = new Row(y, this.yErrorMax)
      this.rows.push(assignedRow)
    }
    return assignedRow
  }

  updateMaxColLength(colLegth) {
    if (colLegth > this.maxColLength) {
      this.maxColLength = colLegth
    }
  }
}
