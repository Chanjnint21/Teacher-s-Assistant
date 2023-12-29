<template>
  <v-responsive class="mx-auto" max-width="344">
    <div>
      <v-btn variant="tonal" :color="color">
        <v-icon v-if="prependIcon">{{ prependIcon }}</v-icon>
        {{ label }}
      </v-btn>
    </div>
  </v-responsive>
</template>

<script>
export default {
  name: 'BtnComp',
  props: {
    label: String,
    prependIcon: String,
    color: String
  }
}
</script>

<style scoped>
</style>
