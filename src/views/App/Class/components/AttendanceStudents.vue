<template>
  <v-container fluid class="px-10">
    <v-row>
      <v-col cols="6">
        <h3>Attendance</h3>
      </v-col>
      <v-col cols="6" class="text-end">
        <v-btn @click="openDialog" color="primary"> New Student</v-btn>
      </v-col>
    </v-row>
    <v-card flat>
      <template v-slot:text>
        <v-row align="center">
          <v-col>
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              single-line
              variant="outlined"
              hide-details
              rounded
            ></v-text-field>
          </v-col>
        </v-row>
      </template>
      <v-data-table
        :headers="headers"
        :items="students"
        :search="search"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td v-for="(header, index) in headers" :key="index" :style="{ whiteSpace: header.key === 'fullName' ? 'nowrap' : 'normal'}">
              <!-- Check if the header corresponds to a day (day1, day2, ..., day31) -->
              <template v-if="header.key.startsWith('day')">
                <v-select
                  v-model="item.attendances[header.key]"
                  :items="['', 'Present', 'Absent', 'Permission' ]"
                  variant="solo"
                  @change="updateStudentAttendance(item, header.key)"
                  hide-details
                ></v-select>
              </template>
              <!-- If not a day header, display regular cell content -->
              <template v-else>
                {{ item[header.key] }}
              </template>
            </td>
          </tr>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" max-width="600" >
        <v-card>
          <v-card-title>Add New Student</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addNewStudent">
              <v-row>
                <v-col>
                  <v-text-field v-model="newStudent.id" label="ID" required></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="newStudent.fullName" label="Full Name" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-select v-model="newStudent.gender" :items="['Male', 'Female']" label="Gender" required></v-select>
                </v-col>
                <v-col>
                  <v-text-field v-model="newStudent.class" label="Class" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-btn type="submit" color="primary">Add Student</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      dialog: false,
      newStudent: {
        id: '',
        fullName: '',
        gender: '',
        class: '',
        attendance: '',
      },
      headers: [
        { align: 'start', key: 'id', sortable: true, title: 'ID' },
        { key: 'fullName', title: 'Full Name' },
        { key: 'gender', title: 'Gender' },
        { key: 'class', title: 'Class' },
        { key: 'attendance', title: 'Attendance' },
        ...Array.from({ length: 31 }, (_, index) => ({
          key: `day${index + 1}`,
          title: `${index + 1 < 10 ? '0' : ''}${index + 1}`,
        }))
      ],
      students: [
      { id: 1, fullName: 'Student 1', gender: 'Male', class: 'M4', attendance: 100, attendances: { } },
      { id: 2, fullName: 'Student 2', gender: 'Female', class: 'M4', attendance: 100, attendances: { } },
      { id: 3, fullName: 'Student 3', gender: 'Male', class: 'M4', attendance: 100, attendances: { } },
      { id: 4, fullName: 'Student 4', gender: 'Female', class: 'M4', attendance: 100, attendances: { } },
      { id: 5, fullName: 'Student 5', gender: 'Male', class: 'M4', attendance: 100, attendances: { } },
      ],
    };
  },
  watch: {
    // Watch for changes in the attendances object of each student and update the attendance value
    'students': {
      handler(newStudents) {
        newStudents.forEach((student) => {
          this.$watch(() => student.attendances, () => {
            const attendanceValues = Object.values(student.attendances);
            if (attendanceValues.length === 0) {
              student.attendance = 100; // Default value when attendances is empty
              return;
            }
            const totalAttendance = attendanceValues.reduce((sum, value) => sum + (value === 'Present' ? 1 : 0), 0);
            const averageAttendance = (totalAttendance / attendanceValues.length) * 100;
            student.attendance = Math.round(averageAttendance);
          }, { deep: true });
        });
      },
      deep: true, // Watch changes deeply in the students array
    },
  },
  computed: {
    // Compute the current day of the month
    currentDay() {
      return new Date().getDate();
    },
  },
  methods: {
    todayDate() {
      return new Date().toLocaleDateString('en-US', { day: 'numeric' })
    },
    openDialog() {
      this.dialog = true;
    },
    addNewStudent() {

      // Clear the form fields
      this.newStudent = {
        id: '',
        fullName: '',
        gender: '',
        class: '',
        attendance: '',
        attendances: { }
      };
      this.students.push({ ...this.newStudent });
      this.dialog = false;
    },
    getRandomAttendance() {
      return Math.floor(Math.random() * (100 - 90 + 1)) + 90;
    },
    updateStudentAttendance(student, dayKey) {
      this.students.attendances[dayKey] = student.attendances[dayKey];
    },
    isCurrentDateHeader(headerKey) {
      const day = parseInt(headerKey.slice(3), 10);
      return day === this.currentDay;
    },
  },
  mounted() {
    this.todayDate()
  }
};
</script>
