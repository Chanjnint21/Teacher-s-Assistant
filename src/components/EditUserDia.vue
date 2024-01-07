<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600">
      <template v-slot:activator="{ props }">
        <v-btn class="ms-2" icon @click="a" color="transparent" v-bind="props">
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      <v-col>
        <v-card>
          <v-card-title class="bgColor text-white">
            <span class="text-h5">Edit Student</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-form ref="form">
                <v-row>
                  <v-col cols="12">
                    <TextField label="Full Name" class="input-field" v-model="updateFullName" required />
                  </v-col>
                  <v-col cols="12">
                    <TextField label="Age" class="input-field" v-model="updateAge" required />
                  </v-col>
                  <v-col cols="12">
                    <TextField label="Gender" class="input-field" v-model="updateGender" required />
                  </v-col>
                  <v-col cols="12">
                    <TextField label="Email" class="input-field" v-model="updateEmail" required />
                  </v-col>
                  <v-col cols="12">
                    <v-select :items="['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']" label="Class" required v-model="updateStudentClass"> </v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-2" text @click="dialog = false">Close</v-btn>
            <v-btn color="primary darken-2" text @click="clickEdit()">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-dialog>
  </v-row>
</template>

<script>
import TextField from './TextField.vue';
import { Service } from '@/Service/MockService';


export default {
  name: 'EditUserComp',
  data: () => ({
    dialog: false,
    updateFullName: '',
    updateAge: '',
    updateEmail: '',
    updateStudentClass: ' ',
    updateGender: '',
    selectedStudentId: null,
    students: []
  }),
  components: {
    TextField,
  },
  methods: {
    async updateStudent() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        const updatedStudentData = {
          fullName: this.updateFullName,
          age: this.updateAge,
          email: this.updateEmail,
          gender: this.updateGender,
          studentClass: this.updateStudentClass,
        };

        try {
          await Service.editStudent(this.selectedStudentId, updatedStudentData);
          this.dialog = false;
          console.log('Student updated successfully', updatedStudentData);
        } catch (error) {
          console.error('Error updating student:', error);
        }
      } else {
        console.log('There is something error');
      }
    },

    clickEdit() {
      console.log(this.students)
      if (this.students.length > 0) {
        // Assuming you want to use the first student's studentId
        this.selectedStudentId = this.students[5].id;
        console.log(this.students)
        console.log('selectedId', this.selectedStudentId);
      } else {
        console.log('No students available to edit');
      }
    },

    async fetchStudentData() {
      try {
        const response = await Service.getStudents();
        console.log('Response from fetchStudentData:', response);
        this.students = response;
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    },
  },
  mounted() {
    this.fetchStudentData()
  }
};
</script>
