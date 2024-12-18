import axios from "axios"

export default {
  list: () => {
    return axios.get('https://fake-api.tractian.com/companies')
  }
}