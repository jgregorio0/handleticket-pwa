<template>
  <div>
    <section>
      <!-- Form -->
      <FormTicket />
    </section>
    <section v-show="this.$store.state.grid.annotations.length">
      <!-- Grid ticket parsed -->
      <Grid />
    </section>
    <section v-show="this.$store.state.grid.annotations.length">
      <!-- SideImage -->
      <SideImage />
    </section>
    <!-- ToolBar -->
    <section>
      <SideToolbar />
    </section>
  </div>
</template>

<script>
import Grid from '~/components/Grid'
import SideImage from '~/components/SideImage'
import FormTicket from '~/components/FormTicket'
import SideToolbar from '~/components/SideToolbar'

export default {
  components: {
    FormTicket,
    Grid,
    SideImage,
    SideToolbar,
  },
}
</script>
