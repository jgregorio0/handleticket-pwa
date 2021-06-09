export const state = () => ({
  ticket: null,
})

export const mutations = {
  SET_TICKET(state, ticket) {
    state.ticket = ticket
  },
}

export const actions = {
  send({ commit }, formData) {
    commit('SET_TICKET', formData.get('file'))
    return this.$axios.post('tickets', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
}
