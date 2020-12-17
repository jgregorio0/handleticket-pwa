export const state = () => ({
  isSideImageOpen: false,
  isSideToolbarOpen: false,
})

export const mutations = {
  setSideImage(state, show) {
    state.isSideImageOpen = show
  },
  setSideToolbar(state, show) {
    state.isSideToolbarOpen = show
  },
}

export const actions = {
  setSideImage(context, show) {
    context.commit('setSideImage', show)
  },
  setSideToolbar(context, show) {
    context.commit('setSideToolbar', show)
  },
}
