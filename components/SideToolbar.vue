<template>
  <div>
    <b-sidebar
      id="side-toolbar"
      :visible="isSideToolbarOpen"
      no-header
      right
      sidebar-class="side-toolbar"
    >
      <div>
        <b-button variant="outline-danger" @click="deleteSelectedCells">
          <b-icon-trash></b-icon-trash>
        </b-button>
        <b-button variant="outline-success" @click="editingSelectedCell">
          <b-icon-pencil></b-icon-pencil>
        </b-button>
        <b-button variant="outline-primary" @click="copySelectedCellValues">
          <b-icon-files></b-icon-files>
        </b-button>
        <b-button variant="outline-secondary" @click="joinSelectedCells">
          <b-icon-arrows-angle-contract></b-icon-arrows-angle-contract>
        </b-button>
        <b-button variant="outline-primary" @click="moveUpCell">
          <b-icon-arrow-up></b-icon-arrow-up>
        </b-button>
        <b-button variant="outline-secondary" @click="moveRightCell">
          <b-icon-arrow-right></b-icon-arrow-right>
        </b-button>
        <b-button variant="outline-primary" @click="moveDownCell">
          <b-icon-arrow-down></b-icon-arrow-down>
        </b-button>
        <b-button variant="outline-secondary" @click="moveLeftCell">
          <b-icon-arrow-left></b-icon-arrow-left>
        </b-button>
        <b-button variant="outline-secondary" @click="moveRightBlock">
          <b-icon-arrow-bar-right></b-icon-arrow-bar-right>
        </b-button>
        <b-button variant="outline-secondary" @click="insertRow">
          <b-icon-arrow-return-left></b-icon-arrow-return-left>
        </b-button>
        <b-button variant="outline-success" @click="unselectAnySelectedCell">
          <b-icon-check2></b-icon-check2>
        </b-button>
      </div>
    </b-sidebar>
    <div class="side-toolbar-toggle">
      <b-button
        v-show="this.$store.state.grid.grid.length"
        :aria-expanded="isSideToolbarOpen"
        aria-controls="side-toolbar"
        @click="setSideToolbar(!isSideToolbarOpen)"
      >
        <b-icon-chevron-right v-if="isSideToolbarOpen"></b-icon-chevron-right>
        <b-icon-chevron-left v-else></b-icon-chevron-left>
        <b-icon-tools></b-icon-tools>
      </b-button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    url() {
      if (this.$store.state.ticket.ticket) {
        return URL.createObjectURL(this.$store.state.ticket.ticket)
      }
      return ''
    },
    isSideToolbarOpen() {
      return this.$store.state.sidebar.isSideToolbarOpen
    },
  },
  methods: {
    setSideToolbar(show) {
      this.$store.dispatch('sidebar/setSideToolbar', show)
    },
    deleteSelectedCells() {
      if (this.validateAnyCellSelected()) {
        this.$store.dispatch('grid/deleteSelectedCells')
        this.$store.dispatch('sidebar/setSideToolbar', false)
      }
    },
    editingSelectedCell() {
      if (this.validateSingleCellSelected()) {
        this.$store.dispatch('grid/editingSelectedCell')
      }
    },
    copySelectedCellValues() {
      if (this.validateAnyCellSelected()) {
        this.$store.dispatch('grid/copySelectedCellValues')
        this.$store.dispatch('sidebar/setSideToolbar', false)
        this.$store.dispatch('alerts/infoSm', {
          text: 'Text copied!',
        })
      }
    },
    shiftUpColumn() {
      if (this.validateSingleCellSelected()) {
        this.$store.dispatch('grid/shiftUpColumn')
      }
    },
    shiftDownColumn() {
      if (this.validateSingleCellSelected()) {
        this.$store.dispatch('grid/shiftDownColumn')
      }
    },
    shiftRightRow() {
      if (this.validateAnyCellSelected()) {
        this.$store.dispatch('grid/shiftRightRow')
      }
    },
    moveRightBlock() {
      if (this.validateSingleCellSelected()) {
        this.$store.dispatch('grid/moveRightBlock')
      }
    },
    shiftLeftRow() {
      if (this.validateAnyCellSelected()) {
        this.$store.dispatch('grid/shiftLeftRow')
      }
    },
    moveLeftBlock() {
      if (this.validateSingleCellSelected()) {
        this.$store.dispatch('grid/moveLeftBlock')
      }
    },
    joinSelectedCells() {
      if (this.validateMultipleCellsSelected()) {
        this.$store.dispatch('grid/joinSelectedCells')
        this.$store.dispatch('sidebar/setSideToolbar', false)
      }
    },
    moveUpCell() {
      if (this.validateAnyCellSelected()) {
        this.$store.dispatch('grid/moveUpCell')
      }
    },
    moveDownCell() {
      if (this.validateAnyCellSelected()) {
        this.$store.dispatch('grid/moveDownCell')
      }
    },
    moveRightCell() {
      if (this.validateAnyCellSelected()) {
        this.$store.dispatch('grid/moveRightCell')
      }
    },
    moveLeftCell() {
      if (this.validateAnyCellSelected()) {
        this.$store.dispatch('grid/moveLeftCell')
      }
    },
    unselectAnySelectedCell() {
      if (this.validateAnyCellSelected()) {
        this.$store.dispatch('grid/unselectCells')
        this.$store.dispatch('sidebar/setSideToolbar', false)
      }
    },
    insertRow() {
      if (this.validateSingleCellSelected()) {
        this.$store.dispatch('grid/insertRow')
        this.$store.dispatch('sidebar/setSideToolbar', false)
      }
    },
    validateSingleCellSelected() {
      const cells = Object.values(this.$store.state.grid.selectedCells)
      if (cells.length === 1) {
        return true
      } else if (cells.length < 1) {
        this.$store.dispatch('alerts/dangerSm', {
          text: 'One cell must be selected', // TODO add i18n
        })
      } else {
        this.$store.dispatch('alerts/dangerSm', {
          text: 'Only one cell must be selected', // TODO add i18n
        })
      }
    },
    validateMultipleCellsSelected() {
      const cells = Object.values(this.$store.state.grid.selectedCells)
      if (cells.length > 1) {
        return true
      } else {
        this.$store.dispatch('alerts/dangerSm', {
          text: 'At least 2 cells must be selected', // TODO add i18n
        })
      }
    },
    validateAnyCellSelected() {
      const cells = Object.values(this.$store.state.grid.selectedCells)
      if (cells.length >= 1) {
        return true
      } else {
        this.$store.dispatch('alerts/dangerSm', {
          text: 'At least 1 cell must be selected', // TODO add i18n
        })
      }
    },
  },
}
</script>

<style>
.side-toolbar-toggle {
  position: fixed;
  right: -5px;
  bottom: -5px;
  z-index: 9999;
}
.side-toolbar {
  width: 3rem;
  height: 30rem;
  bottom: 2rem;
  margin-top: auto !important;
}
</style>
