import Vue from 'vue'
import GridParser from '~/modules/grid/GridParser'
import { Cell } from '~/modules/grid/Cell'

export const state = () => ({
  annotations: [],
  grid: [],
  yErrorMax: 60,
  selectedCells: {},
})

export const mutations = {
  setYErrorMax(state, yErrorMax) {
    state.yErrorMax = yErrorMax
  },
  setAnnotations(state, annotations) {
    state.annotations = annotations
  },
  updateGrid(state) {
    const grid = []
    // parse annotations to grid
    const gridParser = new GridParser(state.yErrorMax)
    gridParser.parse(state.annotations)
    // format grid nxn
    gridParser.rows.forEach((row) => {
      const cells = []
      row.cells.forEach((normalizedText, iCol) => {
        const cell = new Cell(normalizedText.text)
        cells.push(cell)
      })
      for (let index = cells.length; index < gridParser.maxColLength; index++) {
        const cell = new Cell('')
        cells.push(cell)
      }
      grid.push(cells)
    })
    state.grid = grid
  },
  deleteRow(state, index) {
    state.grid.splice(index, 1)
  },
  unselectAllCells(state) {
    state.grid.forEach((row) => {
      row.forEach((cell) => {
        cell.isSelected = false
      })
    })
    state.selectedCells = {}
  },
  selectCell(state, params) {
    const cell = state.grid[params.row][params.col]
    const key = '' + params.row + '-' + params.col
    if (cell.isSelected) {
      cell.isSelected = false
      Vue.delete(state.selectedCells, key)
    } else {
      cell.isSelected = true
      state.selectedCells = { ...state.selectedCells, [key]: null }
    }
  },
  isSelectedCell(state, params) {
    const cell = state.grid[params.row][params.col]
    return cell.isSelected()
  },
  deleteSelectedCells(state) {
    const selectedCellsKeys = Object.keys(state.selectedCells)
    selectedCellsKeys.forEach((key) => {
      const keySplit = key.split('-')
      if (keySplit.length === 2) {
        const iRow = keySplit[0]
        const iCol = keySplit[1]
        const cell = state.grid[iRow][iCol]
        cell.text = ''
        cell.isSelected = false
      }
      Vue.delete(state.selectedCells, key)
    })
  },
  editingSelectedCells(state) {
    const selectedCellsKeys = Object.keys(state.selectedCells)
    selectedCellsKeys.forEach((key) => {
      const keySplit = key.split('-')
      if (keySplit.length === 2) {
        const iRow = keySplit[0]
        const iCol = keySplit[1]
        const cell = state.grid[iRow][iCol]
        cell.isEditing = true
        cell.isSelected = false
      }
    })
  },
  editCell(state, params) {
    params.cell.text = params.value
    params.cell.isEditing = false
    params.cell.isSelected = false
  },
}

export const actions = {
  setYErrorMax(context, yErrorMax) {
    context.commit('setYErrorMax', yErrorMax)
    context.commit('updateGrid')
  },
  setAnnotations(context, annotations) {
    context.commit('setAnnotations', annotations)
    context.commit('updateGrid')
  },
  deleteRow(context, index) {
    context.commit('deleteRow', index)
    context.commit('unselectAllCells')
  },
  selectCell(context, params) {
    context.commit('selectCell', params)
  },
  deleteSelectedCells(context) {
    context.commit('deleteSelectedCells')
  },
  editingSelectedCells(context) {
    context.commit('editingSelectedCells')
  },
  editCell(context, params) {
    context.commit('editCell', params)
  },
}
