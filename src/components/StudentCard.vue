<template>
  <v-card max-width="500" class="mx-auto" elevation="4">
    <v-container>
      <v-row>
        <v-col v-for="student in students" :key="student.id">
          <v-card color="#952175" class="theme--dark">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">
                  {{ student.name }}
                </v-card-title>
                <v-card-subtitle>{{ student.id }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn
                    class="ms-2"
                    icon
                    @click="editStudentInfo(student)"
                  >

                  <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <span>Add Score </span>
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="125" rounded="0">
                <v-img :src="'https://placekitten.com/200/300?image=' + student.id"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { Service } from '@/Service/MockService';

export default {
  name: 'StudentCard',
  data() {
    return {
      students: [],
    };
  },
  methods: {
    async fetchStudentData() {
      try {
        const response = await Service.getStudents();
        console.log('Response from fetchStudentData:', response);
        this.students = response;
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    },
    editStudentInfo(student) {
      console.log('Editing student:', student);
    },
  },
  mounted() {
    this.fetchStudentData();
  },
};
</script>

<style scoped>
</style>
