<template>
  <div class="alerts-container">
    <b-alert
      v-for="(alert, index) in alerts"
      :key="index"
      :variant="alert.variant"
      :show="alert.time"
      dismissible
      >{{ alert.text }}</b-alert
    >
  </div>
</template>

<script>
export default {
  computed: {
    alerts() {
      return this.$store.state.alerts.alerts
    },
  },
}
</script>

<style>
.alerts-container {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}
</style>
