export default class NormalizedText {
  constructor(annotation) {
    this._x = annotation.x
    this._y = annotation.y
    this._text = annotation.text
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  get text() {
    return this._text
  }
}
