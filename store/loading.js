export const state = () => ({
  isLoading: false,
})

export const mutations = {
  loading(state, isLoading) {
    state.isLoading = isLoading
  },
}
