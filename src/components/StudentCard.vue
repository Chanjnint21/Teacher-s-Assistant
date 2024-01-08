<template>
  <v-card max-width="500" class="mx-auto" elevation="4">
    <v-container>
      <v-row>
        <v-col v-for="student in students" :key="student.id">
          <v-card color="#952175" class="theme--dark">
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5">
                  {{ student.fullName }}
                </v-card-title>
                <v-card-subtitle> <span>class:</span> {{ student.class }}</v-card-subtitle>
                <v-card-actions>
                  <v-btn class="ms-2" icon @click="editStudentInfo(student)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <span>Add Score </span>
                </v-card-actions>
              </div>
              <v-avatar class="ma-3" size="125" rounded="0">
                <v-img :src="'https://placekitten.com/200/300?image=' + student.id"></v-img>
              </v-avatar>
            </div>
            <v-row justify="end">
              <!-- <v-col cols="2">
                <edit-user-dia class="m-4" :students="students"/>
              </v-col> -->
              <v-col cols="2" class="m-2">
                <v-dialog v-model="dialog" width="400">
                  <template v-slot:activator="{ props }">
                    <v-btn class="ms-2" icon @click="showDeleteDialog(student.id)" color="transparent" v-bind="props">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">Confirmation</span>
                    </v-card-title>
                    <v-card-text>
                      Are you sure you want to delete this item?
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" variant="text" @click="dialog = false">
                        Cancel
                      </v-btn>
                      <v-btn color="green darken-1" variant="text" @click="confirmDelete()">
                        Delete
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { Service } from '@/Service/MockService';
// import EditUserDia from '@/components/EditUserDia'

export default {
  name: 'StudentCard',
  data() {
    return {
      students: [],
      dialog: false,
      selectedStudent: null,
    };
  },
  components: {
    // EditUserDia
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
      this.$emit('edit-student-info', student);
      console.log('Editing student:', student);
    },
    showDeleteDialog(student) {
      this.dialog = true;
      console.log('student', student)
      this.selectedStudent = student
      console.log('selectedStudent', this.selectedStudent)

    },
    async confirmDelete() {
      try {
        const response = await Service.deleteStudentById(this.selectedStudent);
        console.log('Response from deleteStudentById:', response);
        const index = this.students.findIndex((student) => student.id === this.selectedStudent);
        if (index !== -1) {
          this.students.splice(index, 1);
        }
        this.dialog = false;
        console.log('Student deleted successfully!');
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    },

  },
  mounted() {
    this.fetchStudentData();
  },
};
</script>

<style scoped></style>
