<template>
  <v-card
    max-width="500"
    class="mx-auto"
    elevation="4"
  >
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="#952175"
            theme="dark"
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">
                  Chansovanmony Yoeun
                </v-card-title>

                <v-card-subtitle>Student</v-card-subtitle>

                <v-card-actions>
                  <v-btn
                    class="ms-2"
                    icon="mdi-pen"
                    variant="text"
                    @click="editStudentInfo"
                  ></v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                rounded="0"
              >
                <v-img src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name : 'StudentCard',
    components: {
    },
    data: () => {
    }

  }
</script>

<style scoped>

</style>


