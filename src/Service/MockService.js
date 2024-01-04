import axios from 'axios'

export const Service = {
  async SignUp (newUser) {
    try {
      await axios.post('http://localhost:8080/user', newUser)
      .then((response) => {
        localStorage.setItem('token', JSON.stringify(response.data.token))
      })
      return
    } catch (e) {
      console.log(e)
    }
  },
  async SignIn (userData) {
    try {
      await axios.post('http://localhost:8080/login', userData)
        .then((response) => {
          localStorage.setItem('token', JSON.stringify(response.data.token))
        })
      return
    } catch (e) {
      console.log(e)
    }
  },
  async getStudents() {
    try {
      const response = await axios.get('http://localhost:8080/getStudents');
      console.log(response)
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error fetching students:', error);
      throw error;
    }
  }
}
