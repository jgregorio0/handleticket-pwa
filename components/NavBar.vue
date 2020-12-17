<template>
  <b-navbar toggleable>
    <b-navbar-brand href="/">HandleTicket</b-navbar-brand>

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
        <b-nav-item href="/ticket">Ticket</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
