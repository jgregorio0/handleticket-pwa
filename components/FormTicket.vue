<template>
  <div class="container">
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="input-group-file">
        <b-form-file
          v-model="file"
          accept="image/*"
          :state="state"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
        <small v-if="validate === 2">File must be smaller than 5MB</small>
      </b-form-group>
      <b-button type="submit" variant="primary">Send</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      yErrorMax: 60,
    }
  },
  computed: {
    validate() {
      if (this.file == null) {
        return 0 // not modified
      } else if (this.file.size > 5000000) {
        return 2 // error max size exceed 5
      }
      return 1 // OK
    },
    state() {
      if (this.validate === 0) {
        return null // not modified
      } else if (this.validate === 1) {
        return true // OK
      } else {
        return false // ERROR
      }
    },
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('grid/reset')
      if (this.file) {
        // if file selected
        const formData = new FormData()
        formData.append('file', this.file)
        // TODO show loading
        // send file to api for parsing
        this.$store
          .dispatch('ticket/send', formData)
          .then((result) => {
            // TODO get annotations from store
            if (result && result.data && result.data.length > 0) {
              // if file is parsed
              this.$store.dispatch('grid/setAnnotations', result.data)
              this.$store.dispatch('alerts/infoSm', {
                text: 'Ticket parsed!', // TODO add i18n
              })
            } else {
              // if file has been sent but annotations are empty
              this.$store.dispatch('alerts/dangerLg', {
                text: 'File is empty',
              })
            }
          })
          .catch(() => {
            // sending file has failed
            this.$store.dispatch('alerts/dangerLg', {
              text: 'Error sending file',
            })
          })
      }
    },
  },
  created() {
    this.$store.dispatch('auth/init')
  },
}
</script>
