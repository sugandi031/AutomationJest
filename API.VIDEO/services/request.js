const axios = require('axios')
const baseURL = "https://sandbox.api.video/"


//Authorization
exports.generateToken = (dataRequestToken) => axios.post(`${baseURL}auth/api-key`,dataRequestToken)

//Watermakrs
exports.uploadWatermarks = async(file,token) => {return axios.post(`${baseURL}watermarks`, file, {headers:{...file.getHeaders(),Authorization: `Bearer ${token}`}})}
exports.deleteWatermakrs = (id) => axios.delete(`${baseURL}watermarks/${id}`, {headers:{Authorization: `Bearer ${token}`}})
exports.getAllWatermakrs = () => axios.get(`${baseURL}watermarks`,{headers:{Authorization: `Bearer ${token}`}})