export const actions = {
  send(context, formData) {
    return this.$axios.post('/api/tickets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
