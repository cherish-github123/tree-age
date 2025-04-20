import axios from 'axios'
import { ResType } from '../api/login'

// http://192.168.137.32:8080/resources/4b65978b-68fc-47dd-9ba5-670a49ca3fa8.jpg
// const baseURL = 'http://localhost:8080';
export const baseURL = 'http://127.0.0.1:8080';
const http = axios.create({
  baseURL,
  timeout: 5000,
})

// 添加请求拦截器
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') // 假设token存储在localStorage中
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}` // 将token添加到请求头中
    }
    return config
  }
  , error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      // 处理错误响应，例如弹出错误提示等
      alert(response.data.message)
      return Promise.reject(new Error(response.data.message || '请求失败'))      
    } else {
      return Promise.resolve(response.data)
    }
  },
  error => {
    return Promise.reject(error)
  } 
)

const get = (url: string, params?: any) => {
  return http.get(url, { params })
}

const post = (url: string, data?: any, config?: any): any => {
  return http.post(url, data, config)
}


 

export { get, post }