<template>
  <v-row justify="center pa-5">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <div class="text-center w-100" v-bind="props">
          <div class="d-flex text-center align-center justify-center">
            <v-avatar
              icon="mdi-plus"
              color="white"
              variant="tonal"
              class="bg-red"
            ></v-avatar>
            <div class="text-subheading text-truncate pa-5">
              Create new class
            </div>
          </div>
        </div>
      </template>
      <v-card class="pa-5 w-50">
        <v-card
          :loading="isUpdating"
          color="blue-grey-darken-1"
          class="mx-auto mt-15"
          width="520"
        >
          <template v-slot:loader="{ isActive }">
            <v-progress-linear
              :active="isActive"
              color="green-lighten-3"
              height="4"
              indeterminate
            ></v-progress-linear>
          </template>

          <v-img
            cover
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
          >
            <v-row class="pa-3">
              <v-col cols="12">
                <v-menu
                  location="bottom start"
                  origin="overlap"
                  transition="slide-y-transition"
                >
                  <template v-slot:activator="{ props }">
                    <v-file-input
                      v-bind="props"
                      accept="image/png, image/jpeg, image/bmp"
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </template>
                </v-menu>
              </v-col>

              <v-row>
                <v-col class="text-center">
                  <h3 class="text-h5">{{ name }}</h3>
                  <span class="text-grey-lighten-1">{{ title }}</span>
                </v-col>
              </v-row>
            </v-row>
          </v-img>
          <v-form>
            <v-container>
              <v-row dense>
                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="name"
                    :disabled="isUpdating"
                    color="blue-grey-lighten-4"
                    label="Class Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    label="Grade"
                    :items="['Secondary', 'High School', 'College']"
                  ></v-select>
                  <v-autocomplete
                    v-model="friends"
                    :disabled="isUpdating"
                    :items="people"
                    chips
                    closable-chips
                    item-title="email"
                    item-value="email"
                    label="People access"
                    multiple
                  >
                    <template v-slot:chip="{ props, item }">
                      <v-chip
                        v-bind="props"
                        :prepend-avatar="item.raw.avatar"
                        :text="item.raw.email"
                      ></v-chip>
                    </template>

                    <template v-slot:item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        :prepend-avatar="item?.raw?.avatar"
                        :title="item?.raw?.email"
                        :subtitle="item?.raw?.group"
                      ></v-list-item>
                    </template>
                  </v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
          <v-btn @click="dialog = false" class="ma-2" color="orange-darken-2">
            <v-icon start icon="mdi-arrow-left"></v-icon>
            Back
          </v-btn>
          <v-btn @click="isUpdating = true" class="bg-red ma-5"> Create </v-btn>
        </v-card>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
    };
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      autoUpdate: true,
      friends: ["sandraadams@gmail.com", "brittaholt@gmail.com"],
      isUpdating: false,
      name: "Sandra Adams",
      people: [
        { email: "sandraadams@gmail.com", group: "Group 1", avatar: srcs[1] },
        { email: "aliconnors@gmail.com", group: "Group 1", avatar: srcs[2] },
        { email: "trevorhansen@gmail.com", group: "Group 1", avatar: srcs[3] },
        { email: "tuckersmith@gmail.com", group: "Group 1", avatar: srcs[2] },
        { email: "brittaholt@gmail.com", group: "Group 2", avatar: srcs[4] },
        { email: "janesmith@gmail.com ", group: "Group 2", avatar: srcs[5] },
        { email: "johnsmith@gmail.com", group: "Group 2", avatar: srcs[1] },
        {
          email: "sandrawilliams@gmail.com",
          group: "Group 2",
          avatar: srcs[3],
        },
      ],
      title: "The summer breeze",
      timeout: null,
    };
  },
};
</script>
