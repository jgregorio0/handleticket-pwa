import GridParser from '~/modules/grid/GridParser'
import {
  addNewCell,
  deleteRow,
  deleteAllSelectedCells,
  unselectAllSelectedCells,
  selectCell,
  unselectCell,
  editingAllSelectedCell,
  editCell,
  copyAllSelectedCells,
  moveRightBlock,
  updateGridIndex,
  shiftRightRow,
  shiftLeftRow,
  moveLeftBlock,
  shiftUpColumn,
  shiftDownColumn,
  moveUp,
  moveDown,
  moveRight,
  moveLeft,
  joinCells,
} from '~/modules/grid/Action'

const getDefaultState = () => {
  return {
    annotations: [],
    grid: [],
    yErrorMax: 40,
    selectedCells: {},
    copiedValue: '',
    isMultiSelection: false,
  }
}

export const state = getDefaultState()

export const mutations = {
  reset(state) {
    Object.assign(state, getDefaultState())
  },
  setYErrorMax(state, yErrorMax) {
    state.yErrorMax = yErrorMax
  },
  setAnnotations(state, annotations) {
    state.annotations = annotations
  },
  resetGrid(state) {
    const grid = []
    // parse annotations to grid
    const gridParser = new GridParser(state.yErrorMax)
    gridParser.parse(state.annotations)
    // format grid nxn
    gridParser.rows.forEach((row, iRow) => {
      const cells = []
      row.cells.forEach((normalizedText, iCol) => {
        addNewCell(cells, iRow, iCol, normalizedText.text)
      })
      for (let iCol = cells.length; iCol < gridParser.maxColLength; iCol++) {
        addNewCell(cells, iRow, iCol, '')
      }
      grid.push(cells)
    })
    state.grid = grid
  },
  deleteRow(state, iRow) {
    deleteRow(state.grid, iRow)
  },
  unselectCells(state) {
    unselectAllSelectedCells(state)
  },
  selectCell(state, params) {
    const cell = params.cell
    const isMultiSelection = params.isMultiSelection
    if (!isMultiSelection) {
      unselectAllSelectedCells(state)
    }
    if (cell.isSelected) {
      unselectCell(state.selectedCells, cell)
    } else {
      selectCell(state, cell)
    }
  },
  deleteSelectedCells(state) {
    deleteAllSelectedCells(state)
  },
  editingSelectedCell(state) {
    editingAllSelectedCell(state.selectedCells)
  },
  editCell(state, params) {
    editCell(state.selectedCells, params.cell, params.value)
  },
  copySelectedCellValues(state) {
    copyAllSelectedCells(state.selectedCells)
  },
  shiftRightRow(state) {
    updateGridIndex(state.grid)
    const cells = Object.values(state.selectedCells)
    cells.forEach((cell) => {
      const row = state.grid[cell.iRow]
      shiftRightRow(row)
    })
  },
  shiftLeftRow(state) {
    updateGridIndex(state.grid)
    const cells = Object.values(state.selectedCells)
    cells.forEach((cell) => {
      const row = state.grid[cell.iRow]
      shiftLeftRow(row)
    })
  },
  moveRightBlock(state) {
    updateGridIndex(state.grid)
    const cell = Object.values(state.selectedCells)[0]
    if (cell) {
      moveRightBlock(state.grid, cell)
    }
  },
  moveLeftBlock(state) {
    updateGridIndex(state.grid)
    const cell = Object.values(state.selectedCells)[0]
    if (cell) {
      moveLeftBlock(state.grid, cell)
    }
  },
  joinSelectedCells(state) {
    joinCells(state)
  },
  shiftUpColumn(state) {
    updateGridIndex(state.grid)
    // get selected cells
    const cells = Object.values(state.selectedCells)
    if (cells.length) {
      const selectedCellColumn = cells[0].iCol
      shiftUpColumn(state, selectedCellColumn)
    }
  },
  shiftDownColumn(state) {
    updateGridIndex(state.grid)
    // get selected cell
    const cells = Object.values(state.selectedCells)
    if (cells.length) {
      const selectedCellColumn = cells[0].iCol
      shiftDownColumn(state, selectedCellColumn)
    }
  },
  setMultiSelection(state) {
    state.isMultiSelection = !state.isMultiSelection
    if (!state.isMultiSelection) {
      unselectAllSelectedCells(state)
    }
  },
  moveUpCell(state) {
    moveUp(state)
  },
  moveDownCell(state) {
    moveDown(state)
  },
  moveRightCell(state) {
    moveRight(state)
  },
  moveLeftCell(state) {
    moveLeft(state)
  },
}

export const actions = {
  reset(context) {
    context.commit('reset')
  },
  setYErrorMax(context, yErrorMax) {
    context.commit('setYErrorMax', yErrorMax)
    context.commit('resetGrid')
  },
  setAnnotations(context, annotations) {
    context.commit('setAnnotations', annotations)
    context.commit('resetGrid')
  },
  deleteRow(context, index) {
    context.commit('deleteRow', index)
    context.commit('unselectCells')
  },
  selectCell(context, params) {
    context.commit('selectCell', params)
  },
  unselectCells(context) {
    context.commit('unselectCells')
  },
  deleteSelectedCells(context) {
    context.commit('deleteSelectedCells')
  },
  editingSelectedCell(context) {
    context.commit('editingSelectedCell')
  },
  editCell(context, params) {
    context.commit('editCell', params)
  },
  copySelectedCellValues(context) {
    context.commit('copySelectedCellValues')
  },
  shiftRightRow(context) {
    context.commit('shiftRightRow')
  },
  moveRightBlock(context) {
    context.commit('moveRightBlock')
  },
  shiftLeftRow(context) {
    context.commit('shiftLeftRow')
  },
  moveLeftBlock(context) {
    context.commit('moveLeftBlock')
  },
  joinSelectedCells(context) {
    context.commit('joinSelectedCells')
  },
  shiftUpColumn(context) {
    context.commit('shiftUpColumn')
  },
  shiftDownColumn(context) {
    context.commit('shiftDownColumn')
  },
  setMultiSelection(context) {
    context.commit('setMultiSelection')
  },
  moveUpCell(context) {
    context.commit('moveUpCell')
  },
  moveDownCell(context) {
    context.commit('moveDownCell')
  },
  moveRightCell(context) {
    context.commit('moveRightCell')
  },
  moveLeftCell(context) {
    context.commit('moveLeftCell')
  },
}
