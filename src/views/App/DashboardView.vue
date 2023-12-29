<template>
  <v-app id="inspire">
    <v-app-bar extended>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
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
              <v-btn color="primary" variant="text" @click="menu = false">
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
              <div v-for="card in cards" :key="card.id">
                <v-card
                  class="d-flex justify-center align-center flex-wrap flex-column mr-5 mt-5"
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
                    class="align-end"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    height="200px"
                    cover
                    width="250"
                  >
                    <v-card-className class="text-white">
                      {{ card.className }}
                    </v-card-className>
                  </v-img>

                  <v-card-actions>
                    <v-spacer></v-spacer>
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
                    <v-btn icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </div>
            </v-row>
          </v-window-item>
        </v-window>
        <v-sheet class="mt-12"><h2>All Classes</h2> </v-sheet>

        <v-row>
          <v-col v-for="card in cards" :key="card.id" cols="4">
            <v-card>
              <v-img
                :src="card.src"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
              >
                <v-card-className class="text-white">
                  {{ card.className }}
                </v-card-className>
              </v-img>

              <v-card-actions>
                <v-spacer></v-spacer>
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
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
  <ClassView />
</template>

<script>
import ClassView from "./ClassView.vue";
import FormCreateClass from "./dialog/FormCreateClass.vue";

export default {
  components: {
    ClassView,
    FormCreateClass,
  },
  data: () => ({
    //open table
    tab: null,

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

    cards: [
      {
        id: 1,
        className: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
        Grade: "Secondary",
      },
      {
        id: 2,
        className: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
        Grade: "High School",
      },
      {
        id: 3,
        className: "Best airlines",
        src: "https://image.slidesdocs.com/responsive-images/background/stationery-green-mathematics-subject-for-high-school-9th-grade-algebra-ii-education-powerpoint-background_d2f7faea92__960_540.jpg",
        Grade: "High School",
      },
      {
        id: 4,
        className: "Best airlines",
        src: "https://media.licdn.com/dms/image/D5612AQE8czRzI3xV6Q/article-cover_image-shrink_720_1280/0/1674676914781?e=2147483647&v=beta&t=MmLoU96vjqZsUdkw2BLNTho5ksnCHww3ORIKYNPALKo",
        Grade: "Secondary",
      },
      {
        id: 5,
        className: "Best airlines",
        src: "https://l450v.alamy.com/450v/2btgwe5/social-media-seamless-pattern-on-dark-blue-background-hand-drawn-doodle-design-doodle-vector-illustration-2btgwe5.jpg",
        Grade: "High School",
      },
      {
        id: 6,
        className: "Best airlines",
        src: "https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701450960.jpg",
        Grade: "College",
      },
      {
        id: 7,
        className: "Best airlines",
        src: "https://cutewallpaper.org/28/development-background-wallpaper/44439241.jpg",
        Grade: "College",
      },
      {
        id: 7,
        className: "Best airlines",
        src: "https://cutewallpaper.org/28/development-background-wallpaper/44439241.jpg",
        Grade: "College",
      },
      {
        id: 7,
        className: "Best airlines",
        src: "https://cutewallpaper.org/28/development-background-wallpaper/44439241.jpg",
        Grade: "College",
      },
      {
        id: 7,
        className: "Best airlines",
        src: "https://cutewallpaper.org/28/development-background-wallpaper/44439241.jpg",
        Grade: "College",
      },
    ],
    recentClassOpen: [
      {
        className: "Biology",
        src: "https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701450960.jpg",
      },
      {
        className: "Favorite road trips",
        src: "https://media.licdn.com/dms/image/D5612AQE8czRzI3xV6Q/article-cover_image-shrink_720_1280/0/1674676914781?e=2147483647&v=beta&t=MmLoU96vjqZsUdkw2BLNTho5ksnCHww3ORIKYNPALKo",
      },
      {
        className: "Best airlines",
        src: "https://image.slidesdocs.com/responsive-images/background/stationery-green-mathematics-subject-for-high-school-9th-grade-algebra-ii-education-powerpoint-background_d2f7faea92__960_540.jpg",
        flex: 4,
      },
      {
        className: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
      {
        className: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
    ],
  }),
  methods:{

    goToClass(){
      this.$router.push('/class')
    }

  }
};
</script>
