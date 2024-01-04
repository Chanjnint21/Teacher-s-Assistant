<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" width="400">
      <template v-slot:activator="{ props }">
        <v-btn class="ms-2" icon @click="b" color="transparent" v-bind="props">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Confirmation</span>
        </v-card-title>
        <v-card-text>
          Are you sure you want to delete this item?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red darken-1"
            variant="text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="green darken-1"
            variant="text"
            @click="confirmDelete"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DeleteUserComp',
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    confirmDelete() {
      console.log('Item deleted!');
      this.dialog = false;
    },
  },
};
</script>
