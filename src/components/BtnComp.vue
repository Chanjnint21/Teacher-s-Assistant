<template>
  <v-responsive class="mx-auto" max-width="344">
    <div>
      <v-btn v-bind="$attrs" v-on="listeners" variant="tonal" :color="color">
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
    color: String,
    attrs: Object,
    listeners: Object,
  }
}
</script>

<style scoped></style>
