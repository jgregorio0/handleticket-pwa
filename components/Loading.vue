<template>
  <div v-show="show" class="overlay">
    <div class="offset"></div>
    <b-spinner class="spinner" label="loading"></b-spinner>
  </div>
</template>

<script>
export default {
  computed: {
    show() {
      return this.$store.state.loading.isLoading
    },
  },
}
</script>

<style>
.overlay {
  text-align: center;
  vertical-align: middle;
  height: 100%;
  width: 100%;
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  opacity: 0.5;
  background-color: white;
  overflow-x: hidden; /* Disable horizontal scroll */
  transition: 0.5s; /* 0.5 second transition effect to slide in or slide down the overlay (height or width, depending on reveal) */
}

.spinner {
  width: 3rem;
  height: 3rem;
}

.offset {
  height: 45%;
}
</style>
