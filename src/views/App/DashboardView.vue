<template>
  <v-app id="inspire">
    <v-app-bar extended color="#2C3E50">
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-toolbar-className>Your Dashboard</v-toolbar-className>

      <v-spacer></v-spacer>
      <p>You logged as <b> Koemnak GK</b></p>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <!-- <v-icon>mdi-heart</v-icon> -->
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/foster.jpg"
          alt=""
          width="35"
          height="35"
          class="rounded-circle"
          style="
             {
              width: 35px;
              height: 35px;
              background-color: #e0e0e0;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-right: 10px;
              object-fit: cover;
            }
          "
        >
        </v-img>
      </v-btn>

      <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <v-btn color="indigo" v-bind="props" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-card min-width="300">
            <v-list>
              <v-list-item
                prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                title="John Leider"
                subtitle="Founder of Vuetify"
              >
                <template v-slot:append>
                  <v-btn
                    variant="text"
                    :class="fav ? 'text-red' : ''"
                    icon="mdi-heart"
                    @click="fav = !fav"
                  ></v-btn>
                </template>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list>
              <v-list-item>
                <v-switch
                  v-model="message"
                  color="purple"
                  label="Enable messages"
                  hide-details
                ></v-switch>
              </v-list-item>

              <v-list-item>
                <v-switch
                  v-model="hints"
                  color="purple"
                  label="Enable hints"
                  hide-details
                ></v-switch>
              </v-list-item>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn variant="text" @click="menu = false"> </v-btn>
              <v-btn color="primary" variant="text" @click="onLogout" block>
                LOGOUT
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-sheet color="grey-lighten-4">
          <v-sheet
            color="grey-lighten-2"
            class="text-center ma-5"
            rounded="pill"
            width="130"
          >
            Recently Open
          </v-sheet>
          <v-slide-group show-arrows>
            <v-slide-group-item v-for="n in recentClassOpen" :key="n.className">
              <v-sheet
                class="mx-3"
                color="grey-lighten-1"
                rounded
                height="140"
                width="250"
              >
                <v-img :src="n.src" class="text-white align-end" cover>
                  <v-card-className>{{ n.className }}</v-card-className>
                </v-img>
              </v-sheet>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-container>

      <v-container>
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              flat
              width="250"
              v-bind="props"
              class="pa-5 d-flex align-center justify-center bg-purple"
              :color="isHovering ? 'primary' : undefined"
            >
              <FormCreateClass />
            </v-card>
          </template>
        </v-hover>
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="end">
          <v-tab :value="1">Secondary</v-tab>
          <v-tab :value="2">High School</v-tab>
          <v-tab :value="3">College</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item v-for="n in 3" :key="n" :value="n">
            <v-row>
              <div v-for="card in classes" :key="card.id">
                <v-card
                  class="card d-flex justify-center align-center flex-wrap flex-column mr-5 mt-5"
                  v-if="
                    card.Grade === 'Secondary' && tab === 1
                      ? true
                      : card.Grade === 'High School' && tab === 2
                      ? true
                      : card.Grade === 'College' && tab === 3
                      ? true
                      : false
                  "
                >
                  <v-img
                    :src="card.src"
                    :lazy-src="card.src"
                    class="align-start"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    cover
                    width="250px"
                  >
                    <v-card-className class="text-white ml-2">
                      <!-- {{ card.className }} -->
                      <v-icon end icon="mdi-dots-vertical"></v-icon>
                    </v-card-className>
                  </v-img>

                  <v-card-actions>
                    <v-card-className class="text-white ml-2">
                      {{ card.className.toUpperCase() }}
                    </v-card-className>
                    <div class="text-white ml-2 text-caption">
                      {{ card.time }}
                    </div>

                    <v-spacer></v-spacer>

                    <v-btn
                      size="small"
                      color="surface-variant"
                      variant="text"
                      icon="mdi-share-variant"
                    ></v-btn>
                    <v-btn
                      size="small"
                      color="surface-variant"
                      variant="text"
                      icon="mdi-bookmark"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-row>
          </v-window-item>
        </v-window>
        <v-sheet class="mt-12"><h2>All Classes</h2> </v-sheet>

        <v-row>
          <v-col
            v-for="card in classes"
            :key="card.id"
            cols="4"
            @click="GetAClass(card.id)"
          >
            <v-card class="card">
              <v-img
                :src="card.src"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
              >
                <v-card-className class="text-white ml-2">
                  {{ card.className.toUpperCase() }}
                </v-card-className>
                <v-card-className class="text-white ml-2 fs-1">
                  {{ card.time }}
                </v-card-className>
              </v-img>

              <div class="d-flex align-center justify-space-between">
                <div class="card-actions-left">
                  <v-btn
                    size="small"
                    color="surface-variant"
                    variant="text"
                    icon="mdi-bookmark"
                  ></v-btn>
                  <v-btn
                    size="small"
                    color="surface-variant"
                    variant="text"
                    icon="mdi-share-variant"
                  ></v-btn>
                </div>
                <div class="card-actions-right">
                  <v-btn
                    size="small"
                    color="surface-variant"
                    variant="text"
                    icon="mdi-dots-vertical"
                    @click="DropDown()"
                  ></v-btn>
                  <!-- <v-menu transition="scale-transition">
                    <template v-slot:activator="{ props }">
                      <v-btn v-bind="props">
                        <v-icon end icon="mdi-dots-vertical"></v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item v-for="(item, i) in items" :key="i">
                        <v-list-item-title @click="getItem(item.title)">{{
                          item.title
                        }}</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu> -->
                </div>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<style lang="css" scoped>
.card :hover {
  cursor: pointer;
}
</style>

<script>
import { Service } from "@/Service/MockService";
import moment from "moment";

import FormCreateClass from "./dialog/FormCreateClass.vue";
// import UpdateClassForm from "./dialog/UpdateClassForm.vue";

import axios from "axios";

export default {
  components: {
    FormCreateClass,
    // UpdateClassForm,
  },

  data: () => ({
    //open table
    tab: null,
    classes: null,
    class: null,
    //menu profile
    fav: true,
    menu: false,
    message: false,
    hints: true,
    //open dialog form
    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    //profile
    profileImg: "",
    isDropDown: false,
    recentClassOpen: null,

    idUpdate: false,
    items: [
      { title: "Edit" },
      { title: "Delete" },
      { title: "Share" },
      { title: "Favorite" },
    ],

    // cards: [
    //   {
    //     id: 1,
    //     className: "Pre-fab homes",
    //     src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
    //     Grade: "Secondary",
    //   },
    //   {
    //     id: 2,
    //     className: "Favorite road trips",
    //     src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
    //     Grade: "High School",
    //   },
    //   {
    //     id: 3,
    //     className: "Best airlines",
    //     src: "https://image.slidesdocs.com/responsive-images/background/stationery-green-mathematics-subject-for-high-school-9th-grade-algebra-ii-education-powerpoint-background_d2f7faea92__960_540.jpg",
    //     Grade: "High School",
    //   },
    //   {
    //     id: 4,
    //     className: "Best airlines",
    //     src: "https://media.licdn.com/dms/image/D5612AQE8czRzI3xV6Q/article-cover_image-shrink_720_1280/0/1674676914781?e=2147483647&v=beta&t=MmLoU96vjqZsUdkw2BLNTho5ksnCHww3ORIKYNPALKo",
    //     Grade: "Secondary",
    //   },
    //   {
    //     id: 5,
    //     className: "Best airlines",
    //     src: "https://l450v.alamy.com/450v/2btgwe5/social-media-seamless-pattern-on-dark-blue-background-hand-drawn-doodle-design-doodle-vector-illustration-2btgwe5.jpg",
    //     Grade: "High School",
    //   },
    //   {
    //     id: 6,
    //     className: "Best airlines",
    //     src: "https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701450960.jpg",
    //     Grade: "College",
    //   },
    //   {
    //     id: 7,
    //     className: "Best airlines",
    //     src: "https://cutewallpaper.org/28/development-background-wallpaper/44439241.jpg",
    //     Grade: "College",
    //   },
    //   {
    //     id: 7,
    //     className: "Best airlines",
    //     src: "https://cutewallpaper.org/28/development-background-wallpaper/44439241.jpg",
    //     Grade: "College",
    //   },
    //   {
    //     id: 7,
    //     className: "Best airlines",
    //     src: "https://cutewallpaper.org/28/development-background-wallpaper/44439241.jpg",
    //     Grade: "College",
    //   },
    //   {
    //     id: 7,
    //     className: "Best airlines",
    //     src: "https://cutewallpaper.org/28/development-background-wallpaper/44439241.jpg",
    //     Grade: "College",
    //   },
    // ],
  }),
  methods: {
    onLogout(){
      this.$router.push('/login')
    },
    getItem(itemTitle) {
      if (itemTitle === "Edit") {
        this.idUpdate = true;
      } else if (itemTitle === "Delete") {
        console.log("delete");
      } else {
        console.log("share");
      }
    },
    DropDown() {
      console.log((this.isDropDown = !this.isDropDown));
    },
    async GetAClass(classId) {
      await axios
        .get("http://localhost:8080/class/" + classId)
        .then((response) => {
          const newOpen = {
            id: response.data[0].id,
            className: response.data[0].className,
            src: response.data[0].src,
            Grade: response.data[0].Grade,
            time: moment().format("MMMM Do YYYY"),
          };
          console.log(newOpen);
          if (newOpen) {
            Service.AddRecentClass(newOpen).then(
              () => {
                console.log("good work");
              },
              (err) => {
                console.log(err);
              }
            );
          } else {
            console.log("error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getClasses() {
      axios
        .get("http://localhost:8080/class")
        .then((response) => {
          this.classes = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getRecentOpenClasses() {
      axios
        .get("http://localhost:8080/class/recently-open")
        .then((response) => {
          this.recentClassOpen = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  mounted() {
    this.getClasses();
    this.getRecentOpenClasses();
  },
};
</script>
