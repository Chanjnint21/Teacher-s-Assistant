<template>
  <v-card max-width="500" class="mx-auto" elevation="4">
    <v-container>
      <v-row>
        <v-col v-for="student in students" :key="student.id" cols="12">
          <v-card color="#952175" class="theme--dark">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">
                  {{ student.fullName }}
                </v-card-title>
                <v-card-subtitle> <span>Class:</span> {{ student.studentClass }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn class="ms-2" icon @click="viewStudent(student)">
                    <v-icon>mdi-account-eye</v-icon>
                  </v-btn>
                  <span>View Score </span>
                </v-card-actions>
                <div v-if="student.scores">
                  <v-card-subtitle> <span>Scores:</span></v-card-subtitle>
                  <v-row v-for="(score, subject) in student.scores" :key="subject">
                    <v-col>
                      <span class="font-weight-bold">{{ subject }}:</span> {{ score }}
                    </v-col>
                  </v-row>
                </div>
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
  name: 'scoreCardComp',
  data() {
    return {
      students: [],
      dialog: false,
      selectedStudent: null,
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
    viewStudent(student) {
      this.$emit('view-student-info', student);
    },
  },
  mounted() {
    this.fetchStudentData();
  },
};
</script>

<style scoped></style>
