<template>
  <div class="container scroll-x">
    <b-form>
      <b-form-group id="input-group-max-y">
        <b-form-input
          :value="yErrorMax"
          type="range"
          placeholder="Maximum height difference to keep in the same row"
          min="30"
          max="100"
          step="5"
          @input="setYErrorMax"
        ></b-form-input
        >{{ yErrorMax }}
      </b-form-group>
    </b-form>
    <table
      role="table"
      aria-busy="false"
      aria-colcount="7"
      class="table b-table table-bordered"
    >
      <!-- HEAD
      <thead role="rowgroup" class>
        <tr role="row" class>

          <th
            v-for="(cell, iCol) in grid[0]"
            :key="iCol"
            role="columnheader"
            scope="col"
            :aria-colindex="iCol"
          >
            <div>
              <b-form-input
                :value="iCol"
                type="text"
                placeholder="Set column name"
              ></b-form-input>
            </div>
          </th>
        </tr>
      </thead>-->
      <!-- BODY -->
      <tbody role="rowgroup">
        <tr v-for="(cells, iRow) in grid" :key="iRow" role="row">
          <!-- BODY CELLS -->
          <td
            v-for="(cell, iCol) in cells"
            :id="cell.id()"
            :key="iCol"
            :aria-colindex="iCol"
            role="cell"
            :class="{ 'selected-cell': cell.isSelected }"
            @click="selectCell(cell, $event)"
          >
            <!-- ROW CONTENT -->
            <div class="text-cell-container">
              <b-form-input
                v-show="cell.isEditing"
                :id="cell.id() + '-input'"
                class="text-cell-input"
                type="text"
                size="sm"
                @blur.stop="editCell(cell, $event)"
                @click.stop=""
              ></b-form-input>
              <span v-show="!cell.isEditing">{{ cell.text }}</span>
            </div>
            <!-- RM ROW -->
            <div class="rm-row-container">
              <b-button
                v-if="iCol === 0"
                class="rm-row-btn"
                variant="link"
                @click.stop="deleteRow(iRow)"
                ><b-icon class="rm-row-icon" icon="trash"></b-icon
              ></b-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

export default {
  computed: {
    grid() {
      return this.$store.state.grid.grid
    },
    yErrorMax() {
      return this.$store.state.grid.yErrorMax
    },
  },
  methods: {
    deleteRow(index) {
      this.$store.dispatch('sidebar/setSideToolbar', false)
      this.$store.dispatch('grid/deleteRow', index)
    },
    setYErrorMax: debounce(function (yErrorMax) {
      this.$store.dispatch('grid/setYErrorMax', yErrorMax)
    }, 500),
    selectCell(cell, $event) {
      this.controlSideToolbar(cell)
      const isMultiSelection =
        this.$store.state.grid.isMultiSelection || $event.ctrlKey
      this.$store.dispatch('grid/selectCell', { cell, isMultiSelection })
    },
    controlSideToolbar(cell) {
      if (cell.isSelected) {
        const selectedCellsLength = Object.keys(
          this.$store.state.grid.selectedCells
        ).length
        if (selectedCellsLength === 1) {
          this.$store.dispatch('sidebar/setSideToolbar', false)
        }
      } else {
        this.$store.dispatch('sidebar/setSideToolbar', true)
      }
    },
    editCell: debounce(function (cell, $event) {
      this.$store.dispatch('grid/editCell', {
        cell,
        value: $event.target.value,
      })
    }, 500),
  },
}
</script>

<style>
.scroll-x {
  overflow-x: scroll;
}
.text-cell-container {
  min-height: 24px;
}
.text-cell-input {
  min-height: 24px;
}
.rm-row-container {
  position: relative;
  top: -1.9rem;
  left: -2.3rem;
  width: 0px;
  height: 0px;
  background-color: white;
}
.rm-row-btn {
  box-shadow: none !important;
  width: 1rem;
}
.rm-row-icon {
  color: red;
  background-color: white;
}
.selected-cell {
  border: 3px solid teal !important;
}
</style>
