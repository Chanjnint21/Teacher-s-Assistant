<template>
  <v-responsive class="mx-auto" max-width="344">
    <v-text-field variant="outlined" hide-details="auto" :label="label" v-model="internalValue">
      <template v-slot:prepend-inner>
        <v-icon v-if="prependIcon">{{ prependIcon }}</v-icon>
      </template>
    </v-text-field>
  </v-responsive>
</template>

<script>
export default {
  name: 'TextField',
  data() {
    return {
      internalValue: this.value,
    };
  },
  props: {
    label: String,
    prependIcon: String,
    value: String,
  },
  watch: {
    internalValue(newVal) {
      this.$emit('update:modelValue', newVal);
    },
    value(newVal) {
      this.internalValue = newVal;
    },
  },
};
</script>

<style scoped></style>
