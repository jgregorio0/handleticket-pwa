<template>
  <div>
    <Alerts />
    <NavBar />
  </div>
</template>

<script>
import NavBar from '~/components/NavBar'
import Alerts from '~/components/Alerts'

export default {
  components: {
    Alerts,
    NavBar,
  },
}
</script>
