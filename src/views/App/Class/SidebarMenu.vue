<template>
  <v-app id="inspire">
    <v-app-bar app  color="#2C3E50">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Classroom</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer"  width="300" class="sidebar" color="#2C3E50">
      <v-list dense>
        <v-list-item-group>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-content>
              <v-list-item-title @click="handleItemClick(item)" :class="{ 'router-button': currentRoute === item.route }"> <v-icon v-if="item.icon">{{ item.icon }}</v-icon>
                {{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <v-list-item class="logout-button" @click="handleLogout">
        <v-list-item-content>
          <v-list-item-title>
            <v-icon>mdi-logout</v-icon>
            Logout
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
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
    drawer: false,
    currentRoute: null,
    items: [
      // { title: 'class', route: 'class', icon: 'mdi-view-dashboard' },
      { title: 'Dashboard', route: 'dashboard', icon: 'mdi-view-dashboard' },
      { title: 'Attendance', route: 'attendance', icon: 'mdi-account-check' },
      { title: 'Score Grading', route: 'score-grading', icon: 'mdi-format-list-numbered' },
      { title: 'Generate Overall Performance Report', route: 'performance-report', icon: 'mdi-chart-bar' },
      { title: 'Setting', route: 'setting', icon: 'mdi-cog' },
    ],
  }),
  methods: {
    handleItemClick(item) {
      console.log(`Clicked on ${item.title}`);
      this.$router.push({name:item.route})
    },
  },
  watch: {
    $route(to) {
      // Update the currentRoute when the route changes
      this.currentRoute = to.name;
    },
  },
  created() {
    this.currentRoute = this.$route.name;
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


