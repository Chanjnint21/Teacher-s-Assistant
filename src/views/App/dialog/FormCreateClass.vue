<template>
  <v-row justify="center pa-5">
    <v-dialog
      v-model="dialog"
      fullscreen
      :scrim="false"
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ props }">
        <div class="text-center w-100 add-new-class" v-bind="props">
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
          <!-- <v-img v-if="url" :src="url"></v-img> -->

          <!-- <div>
            <button @click="openUploadModal">Upload files</button>
          </div> -->

          <v-img cover height="200" v-if="img" :src="img">
            <v-row class="pa-3">
              <v-col cols="12">
                <v-menu
                  location="bottom start"
                  origin="overlap"
                  transition="slide-y-transition"
                >
                  <template v-slot:activator="{ props }">
                    <div
                      name="file"
                      v-bind="props"
                      @click="openUploadModal"
                      accept="image/png, image/jpeg, image/bmp"
                      prepend-icon="mdi-camera"
                    >
                      Upload
                    </div>
                  </template>
                </v-menu>
              </v-col>

              <v-row>
                <v-col class="text-center">
                  <h3 class="text-h5">{{ className }}</h3>
                  <span class="text-grey-lighten-1">{{ title }}</span>
                </v-col>
              </v-row>
            </v-row>
          </v-img>
          <v-img
            cover
            height="200"
            class="bg-purple"
            v-else
            src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
          >
            <v-row class="pa-3">
              <v-col cols="12">
                <v-menu
                  location="bottom start"
                  origin="overlap"
                  transition="slide-y-transition"
                >
                  <template v-slot:activator="{ props }">
                    <div
                      name="file"
                      v-bind="props"
                      @click="openUploadModal"
                      accept="image/png, image/jpeg, image/bmp"
                      prepend-icon="mdi-camera"
                    >
                      <v-icon end icon="mdi-camera"></v-icon>
                    </div>
                  </template>
                </v-menu>
              </v-col>
              <v-row>
                <v-col class="text-center">
                  <h3 class="text-h5">{{ className }}</h3>
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
                    v-model="className"
                    :disabled="isUpdating"
                    color="blue-grey-lighten-4"
                    label="Class Name"
                    @change="ClassName"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Assignee"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="gradeSelected"
                    label="Grade"
                    :items="['Secondary', 'High School', 'College']"
                  >
                  </v-select>
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
          <v-btn type="submit" class="bg-red ma-5" @click="onCreateClass">
            Create
          </v-btn>
        </v-card>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<style lang="css" scoped>
.add-new-class :hover {
  cursor: pointer;
}
</style>
<script>
import { Service } from "@/Service/MockService";
import moment from "moment";
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
      //get input value
      lastId: 0,
      img: null,
      gradeSelected: "",
      className: "",
      url: "",

      //dialog
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      autoUpdate: true,
      friends: ["sandraadams@gmail.com", "brittaholt@gmail.com"],
      isUpdating: false,
      name: "Sandra Adams",

      //cloudinary
      fileName: "",
      preview: null,
      preset: process.env.VUE_APP_UPLOAD_PRESET,
      formData: null,
      cloudName: process.env.VUE_APP_CLOUD_NAME,
      success: "",

      grades: [
        { grade: "Secondary" },
        { grade: "High School" },
        { grade: "College" },
      ],

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
      title: "Class Background",
      timeout: null,
    };
  },
  methods: {
    // onFileChange(e) {
    //   const file = e.target.files[0];
    //   // this.img = URL.createObjectURL(file);
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = (e) => {
    //     this.img = e.target.result;
    //     console.log(this.img);
    //   };
    // },

    openUploadModal() {
      window.cloudinary
        .openUploadWidget(
          { cloud_name: "dakqa3htw", upload_preset: "o5cs4w6z" },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done uploading..: ", result.info);
              this.img = result.info.url;
            }
          }
        )
        .open();
    },

    // onFileChange: function (e) {
    //   const file = e.target.files[0];

    //   let reader = new FileReader();
    //   reader.readAsDataURL(file);

    //   reader.onload = () => {
    //     // this.img = e.target.result;
    //     this.img = URL.createObjectURL(file);
    //     console.log(this.img);
    //   };
    // },

    ClassName(e) {
      this.className = e.target.value;
      console.log(this.className);
    },
    async onCreateClass(e) {
      e.preventDefault();

      const data = {
        id:
          this.lastId +
          Math.floor(Math.random() * (999999999999 - this.lastId + 1)),
        className: this.className,
        src: this.img,
        Grade: this.gradeSelected,
        time: moment().format("MMMM Do YYYY"),
      };
      if (data) {
        await Service.CreateClass(data).then(
          () => {
            this.isUpdating = true;
            this.timeout = setTimeout(() => {
              this.isUpdating = false;
              this.dialog = false;
            }, 1500);
            window.location.reload();
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        console.log("error");
      }
    },
  },
  watch: {
    gradeSelected: function (grade) {
      this.gradeSelected = grade;
      console.log(this.gradeSelected);
    },
  },
};
</script>
