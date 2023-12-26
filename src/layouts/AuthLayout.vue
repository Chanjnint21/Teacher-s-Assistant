<template>
  <v-app>
    <v-container fluid class="Auth pa-0">
      <v-row class="full-height pa-0 ma-0">
        <v-col cols="6" sm="6" class="SideImage">
        </v-col>
        <v-col cols="12" xs="12" sm="6" md="6" class="d-flex justify-center align-center">
          <router-view/>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
  * {
    padding: 0;
    margin: 0;
  }
  .Auth {
    width: 100%;
    height: 100vh;
    /* overflow: hidden; */
  }
  .full-height {
    height: 100%;
  }

  .SideImage{
    background-image: url(https://i.gifer.com/origin/dc/dc412623146610157eb73e727f4d16bc.gif);
    background-size: cover;
    height: 100%;
  }

  @media (max-width: 700px) {
    .SideImage {
      display: none;
    }
  }
</style>
