<template>
  <div>
    <header>
      <Header />
    </header>
    <main role="main">
      <Nuxt />
    </main>
    <footer>
      <Footer />
    </footer>
    <Loading />
  </div>
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import Loading from '~/components/Loading'

export default {
  components: {
    Header,
    Footer,
    Loading,
  },
}
</script>
