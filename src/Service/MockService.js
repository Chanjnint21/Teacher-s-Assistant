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
  async getStudents() {
    try {
      const response = await axios.get("http://localhost:8080/getStudents");
      console.log(response);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching students:", error);
      throw error;
    }
  },

  async addStudent(addStudentData) {
    try {
      const response = await axios.post(
        "http://localhost:8080/addStudents",
        addStudentData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error posting students", error);
      throw error;
    }
  },

  async deleteStudentById(id) {
    try {
      const response = await axios.delete(
        `http://localhost:8080/deleteStudents/${id}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error Deleting student", error);
      throw error;
    }
  },

  async addStudentScore(studentId, scoreData) {
    try {
      const response = await axios.post(
        `http://localhost:8080/addScore/${studentId}`,
        scoreData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error in adding student score", error);
      throw error;
    }
  },
};
