import axios from "axios"

export default {
  list: () => {
    return axios.get('https://fake-api.tractian.com/companies')
  },
  
  locations: (id: string) => {
    return axios.get(`https://fake-api.tractian.com/companies/${id}/locations`)
  },
  
  assets: (id: string) => {
    return axios.get(`https://fake-api.tractian.com/companies/${id}/assets`)
  },

}