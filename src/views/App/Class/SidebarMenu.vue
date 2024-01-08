<template>
  <v-app id="inspire">
    <v-app-bar app  color="#2C3E50">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span> <span>Classroom</span> / {{ currentRouteName }} </span>
      <v-spacer></v-spacer>
      <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
          <template v-slot:activator="{ props }">
            <v-btn  v-bind="props" icon>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-card min-width="300">
            <v-list>
              <v-list-item
                prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                title="User077"
                subtitle="Owner of this class"
              >
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions class="d-flex justify-center">
              <v-spacer></v-spacer>
              <v-btn color="primary" variant="text" @click="onLogout" block>
                LOGOUT
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer"  width="300" class="sidebar" color="#2C3E50">
      <v-list active-color="error">
        <v-list-item-group>
          <v-list-item active-color="warning" v-for="(item, i) in items" :key="i">
            <v-list-item-content>
              <v-list-item-title @click="handleItemClick(item)"  :class="{ 'router-button': currentRoute === item.route }"> <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                {{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- <v-list-item class="logout-button" @click="handleLogout">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon>mdi-logout</v-icon>
            Logout
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
    </v-navigation-drawer>
    <v-main>
      <v-container v-if="currentRoute === 'dashboard'">
        <v-row>
          <v-col v-for="n in 24" :key="n" cols="4">
            <v-card height="250">
              <CardComp/>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <router-view v-else></router-view>
    </v-main>
  </v-app>
</template>

<script>
import CardComp from '@/components/CardComp.vue';

export default {
  components: {
    CardComp,
  },
  data: () => ({
    menu: false,
    drawer: false,
    currentRoute: null,
    currentRouteName: null,
    items: [
      // { title: 'class', route: 'class', icon: 'mdi-view-dashboard' },
      // { title: 'Dashboard', route: 'dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Attendance', route: 'attendance', icon: 'mdi-account-check' },
      { title: 'Score Grading', route: 'score-grading', icon: 'mdi-format-list-numbered' },
      { title: 'Overall Performance Report', route: 'performance-report', icon: 'mdi-chart-bar' },
      { title: 'Setting', route: 'setting', icon: 'mdi-cog' },
      { title: 'Leave Class', route: 'dashboard', icon: 'mdi-logout' },
    ],
  }),
  methods: {
    handleItemClick(item) {
      this.currentRouteName = item.title
      this.$router.push({name:item.route})
    },
    onLogout(){
      this.$router.push('/login')
    }
  },
  watch: {
    $route(to) {
      // Update the currentRoute when the route changes
      this.currentRoute = to.name;
    },
  },
  created() {
    this.currentRoute = this.$route.name;
    this.currentRouteName = this.$route.title
  },
};
</script>
<style>
.sidebar {
  background-color: #2C3E50;
  color: #ECF0F1;
}

.sidebar v-list-item-title {
  color: #ECF0F1;
}

.router-button {
  background-color: #3498db;
  color: #ffffff;
}

.logout-button {
  margin-top: auto;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #e74c3c;
}

</style>


