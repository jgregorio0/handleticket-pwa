export const state = () => ({
  ticket: null,
})

export const mutations = {
  set(state, ticketPath) {
    state.ticket = ticketPath
  },
}

export const actions = {
  set(context, ticketPath) {
    context.commit('set', ticketPath)
  },
}
