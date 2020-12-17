export class Cell {
  constructor(text) {
    this._text = text
    this.isSelected = false
    this.isEditing = false
  }

  get text() {
    return this._text
  }

  set text(text) {
    this._text = text
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
}
