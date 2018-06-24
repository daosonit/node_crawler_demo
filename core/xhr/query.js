let axios = require('axios')

module.exports.axios = axios.create({
  baseURL: 'https://hochay.com',
  timeout: 1000
})