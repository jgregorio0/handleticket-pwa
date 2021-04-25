export default function ({ $axios, redirect, store }) {
  $axios.onRequest((config) => {
    /* if (store.state.auth.token) {
      console.log('axios set token', `Bearer ${store.state.auth.token}`)
      $axios.setToken(store.state.auth.token, 'Bearer')
    } */
  })

  $axios.onError((error) => {
    console.log('onError', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    } else if (code === 401) {
      // TODO show error not authorized
      // redirect('/')
      console.log('not authorized')
    }
  })
}
