<template>
  <div>
    <v-row>
      <v-col cols="4">
        <div>
          <h2>
            Student's List
          </h2>
        </div>
        <div>
          <v-row>
            <v-col v-for="n in 5" :key="n" cols="12">
              <v-card height="250">
                <StudentCard/>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col cols="6">
        <div>
          <p>testing 6 cols</p>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import StudentCard from '@/components/StudentCard';
  export default {

    components: {
      StudentCard
    },
    data: () => {
    }

  }
</script>

<style scoped>

</style>
