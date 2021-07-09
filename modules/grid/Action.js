import Vue from 'vue'
import { Cell } from '~/modules/grid/Cell'
import { copyToClipboard } from '~/modules/util/CopyToClipboardUtil'
import {
  sortCellsByRowAscAndColumnAsc,
  sortCellsByRowDescAndColumnAsc,
  sortCellsByRowDescAndColumnDesc,
  sortCellsByColumnAsc,
  sortCellsByColumnDesc,
} from '~/modules/grid/SortCells'

export function deleteAllSelectedCells(state) {
  updateGridIndex(state.grid)
  const cells = Object.values(state.selectedCells)
  cells.sort(sortCellsByRowDescAndColumnDesc)
  cells.forEach((cell) => {
    deleteCell(state.grid[cell.iRow], cell.iRow, cell.iCol)
  })
  unselectAllSelectedCells(state)
}

export function unselectCell(selectedCells, cell) {
  cell.isSelected = false
  Vue.delete(selectedCells, cell.id())
}

export function unselectAllSelectedCells(state) {
  const cells = Object.values(state.selectedCells)
  cells.forEach((cell) => {
    unselectCell(state.selectedCells, cell)
  })
  state.selectedCells = {}
}

export function selectCell(state, cell) {
  cell.isSelected = true
  state.selectedCells = { ...state.selectedCells, [cell.id()]: cell }
}

export function addNewCell(row, iRow, iCol, text) {
  const cell = new Cell(text, iRow, iCol)
  row.splice(cell.iCol, 0, cell)
}

export function deleteCell(row, iRow, iCol) {
  row.splice(iCol, 1)
  addNewCell(row, iRow, row.length, '')
}

export function deleteRow(grid, iRow) {
  grid.splice(iRow, 1)
}

export function editingCell(selectedCells, cell) {
  if (cell.isEditing) {
    cell.isEditing = false
    unselectCell(selectedCells, cell)
  } else {
    cell.isEditing = true
  }
}

export function editingAllSelectedCell(selectedCells) {
  const cells = Object.values(selectedCells)
  cells.forEach((cell) => {
    editingCell(selectedCells, cell)
  })
}

export function editCell(selectedCells, cell, text) {
  cell.text = text
  cell.isEditing = false
  unselectCell(selectedCells, cell)
}

export function copyAllSelectedCells(selectedCells) {
  let value = ''
  const cells = Object.values(selectedCells)
  cells.forEach((cell) => {
    value += ' ' + cell.text
    unselectCell(selectedCells, cell)
  })
  copyToClipboard(value.trim())
}

export function moveRightBlock(grid, cell) {
  const iRowSelected = cell.iRow
  const iColSelected = cell.iCol
  let addCol = false
  grid.forEach((row, iRow) => {
    if (iRow >= iRowSelected) {
      // if row is equal or after selected, add empty cell before selected column
      addNewCell(row, iRow, iColSelected, '')
      const lastCell = row[row.length - 1]
      if (lastCell?.text) {
        addCol = true
      }
    }
  })

  grid.forEach((row, iRow) => {
    if (addCol) {
      // if must add a new column do it at the end of previous rows only
      if (iRow < iRowSelected) {
        // if row is eq or after selected, add empty cell at the end
        addNewCell(row, iRow, row.length, '')
      }
    } else if (iRow >= iRowSelected) {
      // if must not add a new column remove it at the end of selected or following rows only
      row.pop()
    }
  })
}

export function moveLeftBlock(grid, cell) {
  const iRowSelected = cell.iRow
  grid.forEach((row, iRow) => {
    if (iRow >= iRowSelected) {
      // if row is equal or after selected, rm first cell and add empty cell at the end of the row
      row.shift()
      addNewCell(row, iRow, row.length, '')
    }
  })
}

export function updateRowIndex(row, iRow) {
  row.forEach((cell, iCol) => {
    cell.iRow = iRow
    cell.iCol = iCol
  })
}

export function updateGridIndex(grid) {
  grid.forEach((row, iRow) => {
    updateRowIndex(row, iRow)
  })
}

export function shiftRightRow(row) {
  const lastCell = row.pop()
  row.unshift(lastCell)
}

export function shiftLeftRow(row) {
  const firstCell = row.shift()
  row.push(firstCell)
}

export function shiftUpColumn(state, selectedCellColumn) {
  // for each row move selected column cell to previous row
  state.grid.forEach((row, iRow) => {
    const cellDeleted = row.splice(selectedCellColumn, 1)[0]
    const iRow2Add = iRow - 1
    if (iRow2Add < 0) {
      // for the first row, move cell to last row
      const iRow2AddLast = state.grid.length - 1
      const iCol2AddLast = selectedCellColumn + 1
      state.grid[iRow2AddLast].splice(iCol2AddLast, 0, cellDeleted)
    } else {
      // otherwise move cell to previous row
      state.grid[iRow2Add].splice(selectedCellColumn, 0, cellDeleted)
    }
  })
}

export function shiftDownColumn(state, selectedCellColumn) {
  // for each row move selected column cell to next row
  state.grid.forEach((row, iRow) => {
    const cellDeleted = row.splice(selectedCellColumn, 1)[0]
    const iRow2Add = iRow + 1
    if (iRow2Add === state.grid.length) {
      // for the last cell, move to first row
      state.grid[0].splice(selectedCellColumn, 0, cellDeleted)
    } else {
      // otherwise move to next row
      state.grid[iRow2Add].splice(selectedCellColumn + 1, 0, cellDeleted)
    }
  })
}

export function moveUp(state) {
  // grid index must be uploaded
  updateGridIndex(state.grid)
  // selected cell sorted by column asc
  const cells = Object.values(state.selectedCells)
  cells.sort(sortCellsByRowAscAndColumnAsc)
  // for each cell
  cells.forEach((cell) => {
    const rowSelected = cell.iRow
    const colSelected = cell.iCol
    // delete cell from row and add an empty one
    const cellEmpty = new Cell('', rowSelected, colSelected)
    const cellDeleted = state.grid[rowSelected].splice(
      colSelected,
      1,
      cellEmpty
    )[0]
    // add deleted cell to previous row
    let iRow2Add = rowSelected - 1
    if (iRow2Add < 0) {
      // for the first row, move cell to last row
      iRow2Add = state.grid.length - 1
    }
    const row2Add = state.grid[iRow2Add]
    row2Add.splice(colSelected, 0, cellDeleted)
    // keep same length for every row
    if (!row2Add[row2Add.length - 1].text) {
      // if last column is empty remove it
      row2Add.pop()
    } else {
      // add empty column in every row
      state.grid.forEach((row, iRow) => {
        if (iRow !== iRow2Add) {
          const addLastCell = new Cell('', iRow, row.length)
          row.push(addLastCell)
        }
      })
    }
  })
}

export function moveDown(state) {
  // grid index must be uploaded
  updateGridIndex(state.grid)
  // selected cell sorted by row and column desc
  const cells = Object.values(state.selectedCells)
  cells.sort(sortCellsByRowDescAndColumnAsc)
  // for each cell
  cells.forEach((cell) => {
    const rowSelected = cell.iRow
    const colSelected = cell.iCol
    // delete cell from row and add an empty one
    const cellEmpty = new Cell('', rowSelected, colSelected)
    const cellDeleted = state.grid[rowSelected].splice(
      colSelected,
      1,
      cellEmpty
    )[0]
    // add deleted cell to previous row
    let iRow2Add = rowSelected + 1
    if (iRow2Add === state.grid.length) {
      // for the first row, move cell to last row
      iRow2Add = 0
    }
    const row2Add = state.grid[iRow2Add]
    row2Add.splice(colSelected, 0, cellDeleted)
    // keep same length for every row
    if (!row2Add[row2Add.length - 1].text) {
      // if last column is empty remove it
      row2Add.pop()
    } else {
      // add empty column in every row
      state.grid.forEach((row, iRow) => {
        if (iRow !== iRow2Add) {
          const addLastCell = new Cell('', iRow, row.length)
          row.push(addLastCell)
        }
      })
    }
  })
}

export function moveRight(state) {
  // grid index must be uploaded
  updateGridIndex(state.grid)
  // selected cell sorted by column asc
  const cells = Object.values(state.selectedCells)
  cells.sort(sortCellsByColumnDesc)
  // for each cell
  cells.forEach((cell) => {
    const rowSelected = cell.iRow
    const colSelected = cell.iCol
    // delete cell at the selected column
    const row = state.grid[rowSelected]
    const cellDeleted = row.splice(colSelected, 1)[0]
    // add deleted cell to next col
    let iCol2Add = colSelected + 1
    if (iCol2Add > row.length) {
      iCol2Add = row.length
    }
    row.splice(iCol2Add, 0, cellDeleted)
  })
}

export function moveLeft(state) {
  // grid index must be uploaded
  updateGridIndex(state.grid)
  // selected cell sorted by column asc
  const cells = Object.values(state.selectedCells)
  cells.sort(sortCellsByColumnAsc)
  // for each cell
  cells.forEach((cell) => {
    const rowSelected = cell.iRow
    const colSelected = cell.iCol
    // delete cell at the selected column
    const row = state.grid[rowSelected]
    const cellDeleted = row.splice(colSelected, 1)[0]
    // add deleted cell to next col
    let iCol2Add = colSelected - 1
    if (iCol2Add < 0) {
      iCol2Add = 0
    }
    row.splice(iCol2Add, 0, cellDeleted)
  })
}

export function joinCells(state) {
  updateGridIndex(state.grid)
  const cells = Object.values(state.selectedCells)
  if (cells.length) {
    cells.sort(sortCellsByRowAscAndColumnAsc)
    let text = ''
    cells.forEach((cell) => {
      text += ' ' + cell.text
      cell.text = ''
    })
    cells[0].text = text.trim()
  }
  unselectAllSelectedCells(state)
}

export function copyCellsText(grid) {
  let text = ''
  grid.forEach((row, iRow) => {
    if (iRow !== 0) {
      text += '\n'
    }
    row.forEach((cell, iCell) => {
      if (iCell > 0) {
        text += '\t'
      }
      text += cell.text
    })
  })
  return text
}

export function insertRow(iRow, grid) {
  const row = []
  const iColMax = grid[0].length
  for (let iCol = 0; iCol < iColMax; iCol++) {
    addNewCell(row, iRow, iCol)
  }
  grid.splice(iRow, 0, row)
}

export function copyToAbove(cellSource, grid) {
  const numRows = grid.length
  for (let iRow = cellSource.iRow + 1; iRow < numRows; iRow++) {
    const row = grid[iRow]
    const cellTarget = row[cellSource.iCol]
    cellTarget.text = cellSource.text
  }
}
