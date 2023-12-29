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
  }
}
