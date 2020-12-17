export const state = () => ({
  alerts: [],
})

export const mutations = {
  create(state, alert) {
    alert.time = alert.time || true
    state.alerts.push(alert)
  },
  reset(state) {
    state.alerts.splice(0)
  },
}

export const actions = {
  create(context, alert) {
    context.commit('create', alert)
  },
  reset(context) {
    context.removeByIndex('reset')
  },
}
