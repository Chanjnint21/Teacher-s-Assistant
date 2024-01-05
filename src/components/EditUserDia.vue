<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <template v-slot:activator="{ props }">
        <v-btn class="ms-2" icon @click="a" color="transparent" v-bind="props">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="bgColor text-white">
          <span class="text-h5">Edit Student</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <TextField label="Full Name"  class="input-field" v-model="fullName" required />
              </v-col>
              <v-col cols="12">
                <TextField label="Age"  class="input-field" v-model="age" required />
              </v-col>
              <v-col cols="12">
                <TextField label="Gender"  class="input-field" v-model="gender" required />
              </v-col>
              <v-col cols="12">
                <TextField label="Email"  class="input-field" v-model="email" required />
              </v-col>
              <v-col cols="8">
                <v-select :items="['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']" label="Class" class="input-field" required v-model="studentClass"> </v-select>
              </v-col>
            </v-row>
          </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-2" text @click="dialog = false">Close</v-btn>
          <v-btn color="primary darken-2" text @click="saveStudent ">Save</v-btn>

        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import TextField from './TextField.vue';
// import { Service } from '@/Service/MockService';

export default {
  name: 'EditUserComp',
  data: () => ({
    dialog: false,
    fullName: '',
    age: '',
    email: '',
    studentClass: ' ',
    gender: ''
  }),
  components: {
    TextField
  },
  props: {
    students: Array
  },
  methods: {
    async saveStudent() {
      const { valid } = await this.$refs.form.validate();
      console.log('students',this.students)
      if (valid) {
        const addStudentData = {
          fullName: this.fullName,
          age: this.age,
          email: this.email,
          gender: this.gender,
          studentClass: this.studentClass
        }
        this.dialog = false;
        console.log('saveStudent',addStudentData);
      } else {
        console.log('There is something error');
      }
    }
  }
};
</script>

<style scoped>
.bgColor {
  background-color: #952175;
}

.text-white {
  color: #ffffff;
}
.v-dialog {
  border-radius: 8px;
}

.v-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.mb-4 {
  margin-bottom: 1rem;
}
.ms-2 {
  margin-left: 0.5rem;
}

.input-field {
  width: 100%;
}
</style>
