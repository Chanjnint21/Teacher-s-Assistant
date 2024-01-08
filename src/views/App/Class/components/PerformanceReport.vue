<template>
  <div>
    <v-row>
      <v-col cols="6">
        <br />
        <v-row>
          <v-col cols="10">
            <div>
              <h2 class="ml-4">Student's List Name</h2>
            </div>
          </v-col>
          <v-col cols="2">
            <div>
              <dia-comp />
            </div>
          </v-col>
        </v-row>
        <div class="ml-4 mt-4 v-scroll-y">
          <v-row>
            <v-card height="800" class="mt-4">
              <scoreCardComp :students="students" @view-student-info="handleViewStudentInfo" />
            </v-card>
          </v-row>
        </div>
      </v-col>
      <v-col cols="6">
        <br />
        <div>
          <h2 class="mr-4">Overall Report:</h2>
          <br>
          <v-row v-if="studentScores && Object.keys(studentScores).length > 0">
            <v-spacer></v-spacer>
            <v-row>
              <span class="mr-4">Name: {{ studentName }}</span>
              <span>Class: {{ studentClass }}</span>
            </v-row>
            <v-row v-for="(score, subject) in studentScores" :key="subject">
              <v-col>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title class="subject">
                        <span class="subject-name">{{ subject }}: <span class='subject-value' v-for="(value, key) in score"
                            :key="key">
                            {{ typeof value === 'string' && value.length >= 0 ? value : 0 }}
                          </span></span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-row>
          <v-row v-else>
            <v-col class="text-center">
              <h1>Please choose a student to view scores.</h1>
            </v-col>
          </v-row>

        </div>
        <div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import scoreCardComp from '@/components/scoreCardComp.vue';
import DiaComp from '@/components/DiaComp';
import { Service } from '@/Service/MockService';

export default {
  components: {
    scoreCardComp,
    DiaComp,
  },
  data: () => ({
    disabled: true,
    studentId: null,
    studentName: '',
    studentClass: '',
    valid: false,
    students: [],
    studentScores: [],
  }),
  methods: {
    async handleViewStudentInfo(student) {
      console.log('Received student ID:', student.id);
      this.studentId = student.id;
      console.log('Updated studentId:', this.studentId);
      this.studentName = student.fullName;
      this.studentClass= student.studentClass
      this.fetchStudentScore();
    },
    async fetchStudentScore() {
      try {
        const response = await Service.getStudentScores(this.studentId);
        this.studentScores = response
        console.log('studentScore', this.studentScores)
      } catch (error) {
        console.error('Error getting student scores:', error);
      }
    }
  },

  created() {
    // ...
  },
};
</script>

<style scoped>
.subject {
  font-size: 1.2em;
  color: black;
  font-weight: bold;
}

.subject-name {
  margin-right: 5px;
  text-transform: uppercase;
}

.subject-value {
  color: red;
}

/* Add some margin to the top of the content */
.ml-4 {
  margin-left: 1rem;
}

/* Center the content horizontally */
.text-center {
  text-align: center;
}

/* Add spacing to the right of the Name */
.mr-4 {
  margin-right: 1rem;
}

/* Additional Styles for Overall Report */
h2 {
  font-size: 1.5em;
  color: #007BFF; /* Adjust the color for the Overall Report title */
  margin-bottom: 10px;
}

span {
  font-size: 1.1em;
  color: black;
}

h1 {

  color: #FF0000; /* Adjust the color for the error message */
}
</style>
