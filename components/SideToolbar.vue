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
        <b-button variant="outline-danger" @click="deleteSelectedCells"
          ><b-icon-trash></b-icon-trash
        ></b-button>
        <b-button variant="outline-warning"
          ><b-icon-arrow-counterclockwise></b-icon-arrow-counterclockwise
        ></b-button>
        <b-button variant="outline-success" @click="editingSelectedCells"
          ><b-icon-pencil></b-icon-pencil
        ></b-button>
        <b-button variant="outline-primary"
          ><b-icon-arrow-right></b-icon-arrow-right
        ></b-button>
        <b-button variant="outline-secondary"
          ><b-icon-arrow-return-right></b-icon-arrow-return-right
        ></b-button>
        <b-button variant="outline-primary"
          ><b-icon-arrow-left></b-icon-arrow-left
        ></b-button>
        <b-button variant="outline-secondary"
          ><b-icon-arrow-return-left></b-icon-arrow-return-left
        ></b-button>
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
      this.$store.dispatch('grid/deleteSelectedCells')
    },
    editingSelectedCells() {
      this.$store.dispatch('grid/editingSelectedCells')
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
  height: 20rem;
  bottom: 2rem;
  margin-top: auto !important;
}
</style>
