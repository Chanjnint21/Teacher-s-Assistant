<template>
  <v-card class="text-center pa-3" elevation="0" style="width: 60%">
    <v-form v-model="formValidate">
      <v-row>
        <v-col cols="12">
          <h3>Sign Up to Teacher's Assistant</h3>
        </v-col>
        <v-col cols="12">
          <v-text-field
            prepend-inner-icon="mdi-email-outline"
            v-model="Email"
            label="Email"
            rounded
            variant="outlined"
            density="compact"
            hide-details="auto"
            :rules="[required, rules.email]"
            :error-messages="EmailError"
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
            :rules="[required, rules.passwords]"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="ConfirmPassword"
            label="Confirm Password"
            rounded
            variant="outlined"
            density="compact"
            hide-details="auto"
            prepend-inner-icon="mdi-lock-outline"
            :type="visible ? 'text' : 'password'"
            :error-messages="PasswordError"
            :rules="[required]"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-btn
            rounded
            block
            color="grey-darken-4"
            @click="SubmitSignUp"
            :disabled="!formValidate"
          >
            Sign Up
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
          Already have account?
          <router-link to="/login" style="color: #212121">Sign In</router-link>
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
      ConfirmPassword: "",
      PasswordError: "",
      EmailError: "",
      visible: false,
      formValidate: false,
      rules: {
        passwords: (value) => {
          const pattern = /(?=.*\d)/;
          if (!pattern.test(value)) {
            return "Must mix between letter and number";
          }
          return value.length >= 8 || "Must be at least 8 characters long";
        },
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail address.";
        },
      },
    };
  },
  watch: {
    ConfirmPassword(newVal) {
      if (newVal) {
        this.PasswordError = "";
      }
    },
  },
  methods: {
    async SubmitSignUp(e) {
      e.preventDefault();
      if (this.Password !== this.ConfirmPassword) {
        this.PasswordError = "Password not matched.";
      }
      const UserInp = {
        email: this.Email,
        password: this.Password,
      };

      await Service.SignUp(UserInp)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    required(v) {
      return !!v || "The following Field is required";
    },
  },
};
</script>
