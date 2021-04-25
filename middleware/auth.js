const publicPages = ['/login', '/']

export default function ({ req, route, store, redirect }) {
  const isAuthRequired = !publicPages.includes(route.path)
  if (isAuthRequired) {
    let hasToken = store.state.auth.token != null
    if (!hasToken) {
      store.commit('auth/INIT', process.server ? req : null)
      hasToken = store.state.auth.token
    }
    if (!hasToken) {
      return redirect('/login')
    }
  }
}
