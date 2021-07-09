<template>
  <div class="container">
    <b-button
      v-show="showCopyToClipboard"
      variant="success"
      @click="copyToClipboard"
      ><span>Copy to clipboard</span> <b-icon-files></b-icon-files
    ></b-button>
    <b-collapse v-model="showSendTicketForm">
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
    </b-collapse>
    <b-button
      block
      variant="link"
      class="send-ticket-form collapse-btn"
      @click="showSendTicketForm = !showSendTicketForm"
      ><b-icon-chevron-up v-show="showSendTicketForm"></b-icon-chevron-up
      ><b-icon-chevron-down v-show="!showSendTicketForm"></b-icon-chevron-down>
    </b-button>
  </div>
</template>

<script>
import { copyCellsText } from '~/modules/grid/Action'

export default {
  data() {
    return {
      file: null,
      yErrorMax: 60,
      isLoading: false,
      showSendTicketForm: true,
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
    showCopyToClipboard() {
      return !this.showSendTicketForm && this.$store.state.grid.grid.length
    },
  },
  created() {
    this.$store.dispatch('auth/init')
  },
  methods: {
    onSubmit() {
      if (!this.isLoading && this.file) {
        this.isLoading = true
        this.$store.dispatch('grid/reset')
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
              this.showSendTicketForm = false
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
          .finally(() => {
            this.isLoading = false
          })
      }
    },
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(
          copyCellsText(this.$store.state.grid.grid)
        )
        this.$store.dispatch('alerts/infoSm', {
          text: 'Text copied!',
        })
      } catch (err) {
        console.error('Failed to copy: ', err)
        this.$store.dispatch('alerts/dangerSm', {
          text: 'Text could not be copied',
        })
      }
    },
  },
}
</script>
<style>
.send-ticket-form.collapse-btn {
  outline: none;
  box-shadow: none;
}
</style>
