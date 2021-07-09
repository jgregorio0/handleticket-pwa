<template>
  <b-navbar toggleable>
    <b-navbar-brand href="/">HandleTicket</b-navbar-brand>

    <b-navbar-nav class="ml-auto mr-5">
      <b-nav-item-dropdown v-if="isLogged" class="dropdown-user">
        <template #button-content>
          <em>{{ email }}</em>
        </template>
        <b-dropdown-item href="#" @click="logout()">Logout</b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

    <b-navbar-toggle target="navbar-toggle-collapse">
      <div class="navbar-toggler-icon">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </div>
    </b-navbar-toggle>

    <b-collapse id="navbar-toggle-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item href="/login">Login</b-nav-item>
        <b-nav-item v-if="this.$store.state.auth.token" href="/ticket"
          >Ticket</b-nav-item
        >
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  computed: {
    email() {
      return this.$store.state.auth.user
    },
    isLogged() {
      return this.$store.state.auth.token !== null
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push({ name: 'index' })
      })
    },
  },
}
</script>
<style>
li.dropdown-user > ul {
  position: absolute !important;
}
</style>
