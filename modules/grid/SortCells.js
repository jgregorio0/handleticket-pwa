export function sortCellsByRowAscAndColumnAsc(a, b) {
  if (a.iRow > b.iRow) {
    return 1
  } else if (a.iRow < b.iRow) {
    return -1
  } else if (a.iCol > b.iCol) {
    return 1
  } else if (a.iCol < b.iCol) {
    return -1
  } else {
    return 0
  }
}

export function sortCellsByRowDescAndColumnAsc(a, b) {
  if (a.iRow > b.iRow) {
    return -1
  } else if (a.iRow < b.iRow) {
    return 1
  } else if (a.iCol > b.iCol) {
    return 1
  } else if (a.iCol < b.iCol) {
    return -1
  } else {
    return 0
  }
}

export function sortCellsByRowDescAndColumnDesc(a, b) {
  if (a.iRow > b.iRow) {
    return -1
  } else if (a.iRow < b.iRow) {
    return 1
  } else if (a.iCol > b.iCol) {
    return -1
  } else if (a.iCol < b.iCol) {
    return 1
  } else {
    return 0
  }
}

export function sortCellsByColumnAsc(a, b) {
  if (a.iCol > b.iCol) {
    return 1
  } else if (a.iCol < b.iCol) {
    return -1
  } else {
    return 0
  }
}

export function sortCellsByColumnDesc(a, b) {
  return -1 * sortCellsByColumnAsc(a, b)
}

export function sortCellsByRowAsc(a, b) {
  if (a.iRow > b.iRow) {
    return 1
  } else if (a.iRow < b.iRow) {
    return -1
  } else {
    return 0
  }
}

export function sortCellsByRowDesc(a, b) {
  return -1 * sortCellsByRowAsc(a, b)
}
