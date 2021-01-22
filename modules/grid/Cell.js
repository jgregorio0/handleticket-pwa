export class Cell {
  constructor(text, iRow, iCol) {
    this._text = text
    this._iRow = iRow
    this._iCol = iCol
    this.isSelected = false
    this.isEditing = false
  }

  get text() {
    return this._text
  }

  set text(text) {
    this._text = text
  }

  get iRow() {
    return this._iRow
  }

  set iRow(iRow) {
    this._iRow = iRow
  }

  get iCol() {
    return this._iCol
  }

  set iCol(iCol) {
    this._iCol = iCol
  }

  get isSelected() {
    return this._isSelected
  }

  set isSelected(isSelected) {
    this._isSelected = isSelected
  }

  get isEditing() {
    return this._isEditing
  }

  set isEditing(isEditing) {
    this._isEditing = isEditing
  }

  id() {
    return '' + this._iRow + '-' + this._iCol
  }
}
