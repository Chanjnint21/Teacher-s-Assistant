<template>
  <v-card class="text-center pa-3" elevation="0" style="width: 60%">
    <v-form v-model="formValidate">
      <v-row>
        <v-col cols="12">
          <h3>Sign In to Teacher's Assistant</h3>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="Email"
            prepend-inner-icon="mdi-email-outline"
            label="Email or Username"
            rounded
            variant="outlined"
            density="compact"
            hide-details="auto"
            :rules="[required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="Password"
            label="Password"
            rounded
            variant="outlined"
            density="compact"
            hide-details="auto"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            @click:append-inner="visible = !visible"
            :rules="[required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-end pa-0">
          <span>Forget password?</span>
        </v-col>
        <v-col cols="12">
          <v-btn
            rounded
            block
            color="grey-darken-4"
            @click="onLogin"
            :disabled="!formValidate"
          >
            Sign In
          </v-btn>
        </v-col>
        <v-col cols="12">
          <span>- or login with -</span>
        </v-col>
        <v-col cols="12">
          <v-btn rounded block>
            <v-icon> mdi-google </v-icon>
            Google
          </v-btn>
        </v-col>
        <v-col cols="12">
          Don't have account yet?
          <router-link to="/signup" style="color: #212121">Sign Up</router-link>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
import { Service } from "@/Service/MockService";

export default {
  name: "SignUp",
  data() {
    return {
      Email: "",
      Password: "",
      PasswordError: "",
      visible: false,
      formValidate: false,
    };
  },
  watch: {
    Password(newVal) {
      if (newVal) {
        this.PasswordError = "";
      }
    },
  },
  methods: {
    async onLogin() {
      const UserInp = {
        email: this.Email,
        password: this.Password,
      };
      await Service.SignIn(UserInp);
      const auth = localStorage.getItem("token");
      if (auth === "loginSuccess") {
        this.$router.push("/dashboard");
      }
    },
    required(v) {
      return !!v || "The following Field is required";
    },
  },
};
</script>
