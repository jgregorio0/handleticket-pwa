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
  dangerMd(context, text) {
    context.commit('create', {
      text: text.text,
      variant: 'danger',
      time: 5,
    })
  },
  dangerSm(context, text) {
    context.commit('create', {
      text: text.text,
      variant: 'danger',
      time: 2,
    })
  },
  infoSm(context, text) {
    context.commit('create', {
      text: text.text,
      variant: 'info',
      time: 2,
    })
  },
  infoMd(context, text) {
    context.commit('create', {
      text: text.text,
      variant: 'info',
      time: 5,
    })
  },
}
