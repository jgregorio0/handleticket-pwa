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
import { result } from '~/static/js/test/annotations.js'

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
    onSubmit(postData) {
      if (this.file) {
        this.$store.dispatch('ticket/set', this.file)
        const formData = new FormData()
        formData.append('file', this.file)
        // TODO yErrorMax as parameter and loading
        /* axios
          .post('ImagResultTableeTicket/api/tickets', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((result) => {
            console.log(result)
            this.processSuccess(result)
          }) // TODO go on add result to vuex and show grid
          .catch((e) => {
            console.error(e)
            this.processError(e)
          }) // TODO onError show message
          */
        this.processSuccess(result)
      }
    },
    processSuccess(result) {
      if (result && result.data && result.data.length > 0) {
        this.$store.dispatch('grid/setAnnotations', result.data)
        this.$store.dispatch('alerts/create', {
          text: 'Ticket parsed!', // TODO add i18n
          variant: 'success',
          time: 5, // TODO add to config
        })
      }
    },
    processError(e) {
      this.$store.dispatch('alerts/create', {
        text: 'Error sending file', // TODO add i18n
        variant: 'danger',
        time: true,
      })
    },
  },
}
</script>
