<template>
  <div>
    <v-row>
      <v-col cols="4">
        <br />
        <div>
          <h2 class="ml-4">Student's List Name</h2>
        </div>
        <div class="ml-4 mt-4 v-scroll-y">
          <v-row>
              <v-card height="800" class="mt-4 student-card">
                <StudentCard />
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
          <v-card class="mr-8 grade-info" max-width="800" elevation="4" style="height: 780px">
            <v-row align="start">
              <v-col cols="2" class="mt-8">
                <v-avatar class="ml-8">
                  <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" max-width="1000"></v-img>
                </v-avatar>
              </v-col>
              <v-col cols="6" class="mt-8">
                <h3>Chansovanmony Yoeun </h3>
              </v-col>
            </v-row>
            <v-form ref="form">
              <v-row>
                <v-col cols="6" class="mt-8">
                  <TextField label="Math" prependIcon="mdi-calculator-variant-outline" class="mb-8" v-model="math" />
                  <TextField label="Physic" prependIcon="mdi-flash" class="mb-8" v-model="physic" />
                  <TextField label="Chemistry" prependIcon="mdi-atom" class="mb-8" v-model="chemistry" />
                  <TextField label="Biology" prependIcon="mdi-dna" class="mb-8" v-model="biology" />
                </v-col>
                <v-col cols="6" class="mt-8">
                  <TextField label="Khmer" prependIcon="mdi-note-outline" class="mb-8" v-model="khmer" />
                  <TextField label="English" prependIcon="mdi-alphabetical-variant" class="mb-8" v-model="english" />
                  <TextField label="Sport" prependIcon="mdi-soccer" class="mb-8" v-model="Sport" />
                  <TextField label="Computer" prependIcon="mdi-desktop-classic" class="mb-8" v-model="computer" />
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="2" class="mb-4">
                  <BtnComp label="Cancel" prependIcon="mdi-cancel" color="#BF3131" @click="clearInput" />
                </v-col>
                <v-col cols="2">
                  <BtnComp label="Edit" prependIcon="mdi-pen" color="#EAD196" />
                </v-col>
                <v-col cols="2">
                  <BtnComp label="Submit" prependIcon="mdi-check" color="#219C90" @click="saveInput" />
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import StudentCard from '@/components/StudentCard';
import TextField from '@/components/TextField.vue';
import BtnComp from '@/components/BtnComp.vue';

export default {
  components: {
    StudentCard,
    TextField,
    BtnComp,
  },
  data: () => ({
    math: '',
    physic: '',
    chemistry: '',
    biology: '',
    khmer: '',
    english: '',
    sport: '',
    computer: '',
  }),


  methods: {
    async saveInput() {
      const { valid } = await this.$refs.form.validate();
      if (valid) {
        const savedDataInput = {
          math: this.math,
          physic: this.physic,
          chemistry: this.chemistry,
          biology: this.biology,
          khmer: this.khmer,
          english: this.english,
          sport: this.sport,
          computer: this.computer,
        };
        console.log(savedDataInput);
      } else {
        alert('Please fill in all required fields.');
      }
    },
    clearInput() {
      this.$refs.form.reset()
    }

  },
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
