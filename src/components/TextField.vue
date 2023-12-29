<template>
  <v-responsive class="mx-auto" max-width="344">
    <v-text-field variant="outlined"  hide-details="auto" :label="label">
      <template v-slot:prepend-inner>
        <v-icon v-if="prependIcon">{{ prependIcon }}</v-icon>
      </template>
    </v-text-field>
  </v-responsive>
</template>

<script>
export default {
  name: 'TextField',
  data: () => { },
  props: {
    label: String,
    prependIcon: String
  }
}
</script>

<style scoped></style>
