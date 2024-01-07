import axios from "axios";

export const Service = {
  async SignUp(newUser) {
    try {
      await axios
        .post("http://localhost:8080/user", newUser)
        .then((response) => {
          localStorage.setItem("token", JSON.stringify(response.data.token));
        });
      return;
    } catch (e) {
      console.log(e);
    }
  },
  async SignIn(userData) {
    try {
      await axios
        .post("http://localhost:8080/login", userData)
        .then((response) => {
          localStorage.setItem("token", JSON.stringify(response.data.token));
        });
      return;
    } catch (e) {
      console.log(e);
    }
  },
  async CreateClass(Class) {
    try {
      await axios
        .post("http://localhost:8080/create-class", Class)
        .then((response) => {
          console.log(response.data);
        });
      return;
    } catch (e) {
      console.log(e);
    }
  },
  async AddRecentClass(Class) {
    try {
      await axios
        .post("http://localhost:8080/add-recent-class", Class)
        .then((response) => {
          console.log(response.data);
        });
      return;
    } catch (e) {
      console.log(e);
    }
  },
};
