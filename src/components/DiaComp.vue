<template>
    <v-dialog v-model="dialog" persistent max-width="600">
      <template v-slot:activator="{ props }">
        <v-btn
          class="ms-2"
          icon
          @click="a"
          color="#952175"
          v-bind="props"
          size="x-small"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="bgColor text-white">
          <span class="text-h5">Add Student</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
            <v-row>
              <v-col cols="12">
                <TextField label="Full Name"  class="input-field" v-model="fullName" required />
              </v-col>
              <v-col cols="12">
                <TextField label="Date of Birth"  class="input-field" v-model="DOB" required />
              </v-col>
              <v-col cols="12">
                <TextField label="Gender"  class="input-field" v-model="gender" required />
              </v-col>
              <v-col cols="12">
                <TextField label="Email"  class="input-field" v-model="email" required />
              </v-col>
              <v-col cols="12">
                <v-select :items="['M1', 'M2', 'M3', 'M4', 'M5', 'M6']" label="Class" required v-model="Class"> </v-select>
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
</template>

<script>
import TextField from './TextField.vue';
import { Service } from '@/Service/MockService';

export default {
  name: 'AddStudentComp',
  data: () => ({
    dialog: false,
    fullName: '',
    DOB: '',
    email: '',
    Class: ' ',
    gender: ''
  }),
  components: {
    TextField
  },
  methods: {
    async saveStudent() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const addStudentData = {
          fullName: this.fullName,
          DOB: this.DOB,
          email: this.email,
          gender: this.gender,
          class: this.Class,
          attendance: 100,
          attendances: { }
        }
        try {
          await Service.addStudent(addStudentData);
          this.$router.go()
        } catch (error) {
          console.error('Error adding student:', error);
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
