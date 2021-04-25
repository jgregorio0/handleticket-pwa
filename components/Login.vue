<template>
  <div class="container">
    <div v-show="error">
      <b-icon icon="exclamation-triangle" aria-hidden="true"></b-icon>
      <span>Ha ocurrido un error</span>
      <ul>
        <li>Revisa que tu contrasena es correcta</li>
        <li>Si no estas registrado hazlo aqui</li>
        <li>Si no recuerdas tu contrasena pulsa aqui</li>
      </ul>
    </div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-1" label="Email:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="pass"
          placeholder="Enter password"
          required
          type="password"
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      pass: '',
      error: false,
    }
  },
  methods: {
    onSubmit() {
      // TODO validate form
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          pass: this.pass,
          error: false,
        })
        .then(() => {
          this.$router.push({ name: 'ticket' })
        })
        .catch(() => {
          this.error = true
          this.$store.dispatch('alerts/dangerLg', {
            text: 'No se ha podido identificar tu usuario',
          })
        })
    },
  },
}
</script>
