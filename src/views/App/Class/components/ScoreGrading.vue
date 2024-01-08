<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        <br />
        <v-row>
          <v-col cols="10">
            <div>
              <h3 class="mt-1">Student's List Name</h3>
            </div>
          </v-col>
          <v-col cols="2">
            <div>
              <dia-comp />
            </div>
          </v-col>
        </v-row>
        <div class=" mt-4 v-scroll-y">
          <v-row>
            <v-card height="800" class="mt-4 student-card">
              <StudentCard :students="students" @edit-student-info="handleEditStudentInfo" />
            </v-card>
          </v-row>
        </div>
      </v-col>
      <v-col cols="8" class="m-12">
        <br />
        <div>
          <h2 class="mr-4">Grade Scores Information</h2>
        </div>
        <div>
          <v-card class="mr-8 grade-info" max-width="900" elevation="4" style="height: 780px">
            <v-row align="start">
              <v-col cols="2" class="mt-8">
                <v-avatar class="ml-8">
                  <v-img src="https://placekitten.com/200/300?image=" alt="John" max-width="1000"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="4" class="mt-8">
                <h3> {{ studentName ? studentName : 'No Student Was Selected!' }}</h3>
              </v-col>
            </v-row>
            <v-form ref="form">
              <v-row class="mr-2 ml-2">
                <v-col cols="6" class="mt-8">
                  <text-field label="Math" prependIcon="mdi-calculator-variant-outline" class="mb-8" v-model="math"
                    type="number" :rules="numberRules" />
                  <text-field label="Physic" prependIcon="mdi-flash" class="mb-8" v-model="physic" type="number"
                    :rules="numberRules" />
                  <text-field label="Chemistry" prependIcon="mdi-atom" class="mb-8" v-model="chemistry" type="number"
                    :rules="numberRules" />
                  <text-field label="Biology" prependIcon="mdi-dna" class="mb-8" v-model="biology" type="number"
                    :rules="numberRules" />
                </v-col>
                <v-col cols="6" class="mt-8">
                  <text-field label="Khmer" prependIcon="mdi-note-outline" class="mb-8" v-model="khmer" type="number"
                    :rules="numberRules" />
                  <text-field label="English" prependIcon="mdi-alphabetical-variant" class="mb-8" v-model="english"
                    type="number" :rules="numberRules" />
                  <text-field label="Sport" prependIcon="mdi-soccer" class="mb-8" v-model="sport" type="number"
                    :rules="numberRules" />
                  <text-field label="Computer" prependIcon="mdi-desktop-classic" class="mb-8" v-model="computer"
                    type="number" :rules="numberRules" />
                </v-col>
              </v-row>

              <v-row justify="center">
                <v-col cols="2" class="mb-4">
                  <btn-comp label="Cancel" prependIcon="mdi-cancel" color="#BF3131" @click="clearInput" />
                </v-col>
                <v-col cols="2">
                  <btn-comp label="Save Draft" prependIcon="mdi-pen" color="#EAD196" :disabled="disabled"/>
                </v-col>
                <v-col cols="2">
                  <btn-comp label="Submit" prependIcon="mdi-check" color="#219C90" @click="saveInput" />
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StudentCard from '@/components/StudentCard';
import { Service } from '@/Service/MockService';


export default {
  components: {
    StudentCard
  },
  data: () => ({
    disabled: true,
    studentId: null,
    studentName: '',
    valid: false,
    math: '',
    physic: '',
    chemistry: '',
    biology: '',
    khmer: '',
    english: '',
    sport: '',
    computer: '',
    students: [],
    numberRules: [
      (v) => !!v || 'Field is required',
      (v) => (v >= 0 && v !== null) || 'Value must be a non-negative number',
    ],
  }),
  methods: {
    async saveInput() {
      if (!this.studentId) {
        alert('Please select a student before adding scores!');
        return;
      }
      if (!this.isFormCompleted()) {
        alert('Please fill in all required fields.');
        return;
      }
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const savedDataInput = {
          studentId: this.studentId,
          scores: {
            math: this.math,
            physic: this.physic,
            chemistry: this.chemistry,
            biology: this.biology,
            khmer: this.khmer,
            english: this.english,
            sport: this.sport,
            computer: this.computer,
          }
        };
        console.log(savedDataInput);
        try {
          await Service.addStudentScore(this.studentId, savedDataInput)
          this.$refs.form.reset();
        } catch (error) {
          console.error('Error to add score', error)
        }
      } else {
        alert('Please fill in all required fields.');
      }
    },
    isFormCompleted() {
      return (
        this.math !== '' &&
        this.physic !== '' &&
        this.chemistry !== '' &&
        this.biology !== '' &&
        this.khmer !== '' &&
        this.english !== '' &&
        this.sport !== '' &&
        this.computer !== ''
      );
    },
    handleEditStudentInfo(student) {
      console.log('Received student ID:', student.id);
      this.studentId = student.id;
      console.log('Updated studentId:', this.studentId);
      this.studentName = student.fullName
      console.log('this is whole student object!!!', student)
    },


    clearInput() {
      this.$refs.form.reset()
    }
  },

  created() {
    console.log('Students data:', this.students);
  }

};
</script>

<style scoped>
.ml-4 {
  margin-left: 1rem;
}

.mr-4 {
  margin-right: 1rem;
  margin-top: 1rem;
}

.mt-4 {
  margin-top: 1rem;
}

.v-scroll-y {
  overflow-y: auto;
  max-height: 4000px;
}

.student-card {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.grade-info {
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mb-8 {
  margin-bottom: 2rem;
}
</style>
