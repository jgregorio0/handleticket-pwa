<template>
  <div class="container">
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
      status: '',
    }
  },
  methods: {
    onSubmit() {
      // TODO validate form
      this.$store
        .dispatch('auth/login', {
          email: this.email,
          pass: this.pass,
        })
        .then(() => {
          this.$router.push({ name: 'ticket' })
        })
        .catch((err) => {
          this.status = err.response.status
        })
    },
  },
}
</script>
