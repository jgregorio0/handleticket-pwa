<template>
  <section class="container">
    <div class="row">
      <div class="col-md-4 col-sm-12">
        <h1>Transforma tickets a una hoja de calculo</h1>
        <b-button variant="success" @click="goToTicket()">Prueba aqui</b-button>
        <p>Extrae informacion a traves de tus tickets de compra.</p>
        <ul>
          <li>1. Haz una foto al ticket</li>
          <li>2. Extrae su contenido</li>
          <li>3. Transforma el contenido para visualizarlo mejor</li>
          <li>4. Imprime tu hoja de calculo</li>
        </ul>
      </div>
      <div class="col-md-8 col-sm-12">
        <b-img
          src="/bills-mobile.jpg"
          fluid
          alt="Handle Tickets Mobile"
        ></b-img>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    goToTicket() {
      this.$router.push('/ticket')
    },
  },
}
</script>
