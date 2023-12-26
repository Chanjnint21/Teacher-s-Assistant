<template>
  <v-app id="inspire">
    <v-app-bar extended>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

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

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
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
            <v-slide-group-item v-for="n in recentClassOpen" :key="n.title">
              <v-sheet
                class="mx-3"
                color="grey-lighten-1"
                rounded
                height="140"
                width="250"
              >
                <v-img :src="n.src" class="text-white align-end" cover>
                  <v-card-title>{{ n.title }}</v-card-title>
                </v-img>
              </v-sheet>
            </v-slide-group-item>
          </v-slide-group>
        </v-sheet>
      </v-container>
      <v-container>
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="end">
          <v-tab :value="1">Secondary</v-tab>
          <v-tab :value="2">High School</v-tab>
          <v-tab :value="3">College</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item v-for="n in 3" :key="n" :value="n">
            <v-container>
              <v-row>
                <v-col v-for="i in 3" :key="i" cols="4">
                  <v-img
                    :src="`https://picsum.photos/500/300?image=${
                      i * n * 5 + 10
                    }`"
                    :lazy-src="`https://picsum.photos/10/6?image=${
                      i * n * 5 + 10
                    }`"
                    aspect-ratio="1"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>
        <v-sheet><h2>All Classes</h2> </v-sheet>

        <v-row>
          <v-col v-for="card in cards" :key="card.title" cols="4">
            <v-card>
              <v-img
                :src="card.src"
                class="align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
                cover
              >
                <v-card-title class="text-white">
                  {{ card.title }}
                </v-card-title>
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
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import HelloWorld from '@/components/HelloWorld.vue'
export default {
  data: () => ({
    tab: null,
    cards: [
      {
        title: "Pre-fab homes",
        src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
      },
      {
        title: "Favorite road trips",
        src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
      },
      {
        title: "Best airlines",
        src: "https://image.slidesdocs.com/responsive-images/background/stationery-green-mathematics-subject-for-high-school-9th-grade-algebra-ii-education-powerpoint-background_d2f7faea92__960_540.jpg",
      },
      {
        title: "Best airlines",
        src: "https://media.licdn.com/dms/image/D5612AQE8czRzI3xV6Q/article-cover_image-shrink_720_1280/0/1674676914781?e=2147483647&v=beta&t=MmLoU96vjqZsUdkw2BLNTho5ksnCHww3ORIKYNPALKo",
      },
      {
        title: "Best airlines",
        src: "https://l450v.alamy.com/450v/2btgwe5/social-media-seamless-pattern-on-dark-blue-background-hand-drawn-doodle-design-doodle-vector-illustration-2btgwe5.jpg",
      },
      {
        title: "Best airlines",
        src: "https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701450960.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cutewallpaper.org/28/development-background-wallpaper/44439241.jpg",
      },
    ],
    recentClassOpen: [
      {
        title: "Biology",
        src: "https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77701450960.jpg",
      },
      {
        title: "Favorite road trips",
        src: "https://media.licdn.com/dms/image/D5612AQE8czRzI3xV6Q/article-cover_image-shrink_720_1280/0/1674676914781?e=2147483647&v=beta&t=MmLoU96vjqZsUdkw2BLNTho5ksnCHww3ORIKYNPALKo",
      },
      {
        title: "Best airlines",
        src: "https://image.slidesdocs.com/responsive-images/background/stationery-green-mathematics-subject-for-high-school-9th-grade-algebra-ii-education-powerpoint-background_d2f7faea92__960_540.jpg",
        flex: 4,
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
      {
        title: "Best airlines",
        src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
      },
    ],
  }),
};
</script>
