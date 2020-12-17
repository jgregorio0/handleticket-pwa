<template>
  <div>
    <b-sidebar
      id="side-image"
      :visible="isSideImageOpen"
      no-header
      sidebar-class="border-right"
    >
      <div>
        <b-img :src="url" fluid></b-img>
      </div>
    </b-sidebar>
    <div class="side-image-toggle">
      <b-button
        v-show="this.$store.state.ticket.ticket"
        :aria-expanded="isSideImageOpen"
        aria-controls="side-image"
        @click="setSideImage(!isSideImageOpen)"
      >
        <b-icon-image></b-icon-image>
        <b-icon-chevron-left v-if="isSideImageOpen"></b-icon-chevron-left>
        <b-icon-chevron-right v-else></b-icon-chevron-right>
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
    isSideImageOpen() {
      return this.$store.state.sidebar.isSideImageOpen
    },
  },
  methods: {
    setSideImage(show) {
      this.$store.dispatch('sidebar/setSideImage', show)
    },
  },
}
</script>

<style>
.side-image-toggle {
  position: fixed;
  left: -5px;
  bottom: -5px;
  z-index: 9999;
}
</style>
