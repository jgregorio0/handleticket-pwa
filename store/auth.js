import Cookie from 'js-cookie'

const TOKEN = 'token'
const USER = 'user'

export const state = () => ({
  token: null,
  user: null,
})

export const mutations = {
  SET_TOKEN(state, token) {
    Cookie.set(TOKEN, token)
    state.token = token
    if (process.client) {
      this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  },
  LOGOUT(state) {
    Cookie.remove(TOKEN)
    Cookie.remove(USER)
    this.$axios.defaults.headers.common.Authorization = ''
    state.token = null
    state.user = null
  },
  INIT(state, req) {
    let token = null
    let user = null
    if (process.server && req && req.headers.cookie) {
      req.headers.cookie.split(';').find((c) => {
        if (c.trim().startsWith(TOKEN + '=')) {
          token = c.split('=')[1]
        } else if (c.trim().startsWith(USER + '=')) {
          user = c.split('=')[1]
        }
      })
    } else if (process.client) {
      token = Cookie.get(TOKEN)
      user = Cookie.get(USER)
    }
    if (token) {
      state.token = token
      state.user = user
      if (process.client) {
        this.$axios.defaults.headers.common.Authorization = `Bearer ${token}`
      }
    } else {
      Cookie.remove(TOKEN)
      Cookie.remove(USER)
      this.$axios.defaults.headers.common.Authorization = ''
      state.token = null
      state.user = null
    }
  },
  SET_USER(state, user) {
    Cookie.set(USER, user)
    state.user = user
  },
}

export const actions = {
  register({ commit }, credentials) {
    return this.$axios.post('/api/register', credentials).then(({ data }) => {
      commit('SET_TOKEN', data.token)
    })
  },
  login({ commit }, credentials) {
    return this.$axios.post('/api/login', credentials).then(({ data }) => {
      if (!data.token) {
        throw new Error('token not found')
      }
      commit('SET_TOKEN', data.token)
      commit('SET_USER', data.email)
    })
  },
  logout({ commit }) {
    commit('LOGOUT')
  },
  init({ commit }) {
    commit('INIT')
  },
}
