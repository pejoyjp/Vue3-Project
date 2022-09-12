import axios from "axios";
//create the instance of axios
const service = axios.create({
    //baseURL: "https://www.fastmock.site/mock/bf1fcb3c2e2945669c2c8d0ecb8009b8/api",
    baseURL: "https://www.fastmock.site/mock/49ef0bc037b5144cb7d523ceed2742f9/_jin",
    timeout: 5000,
    headers: {
        "Content-Type":"application/json;charset=utf-8"
    }
})
//Require intercept
service.interceptors.request.use((config) => {
    config.headers = config.headers || {}
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') || ""
    }
    return config
})
//response intercept
service.interceptors.response.use((res) => {
    const code: number = res.data.code
    if (code != 200) {
        return Promise.reject(res.data)
    }
    return res.data
}, (err) => {
    console.log(err)
})
export default service