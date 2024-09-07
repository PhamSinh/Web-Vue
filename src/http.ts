import axios from 'axios';

const http = axios.create({
  baseURL: 'http://example.com/api',
  timeout: 10000,
});

http.interceptors.request.use(config => {
  // Thêm header hoặc làm gì đó trước khi gửi request
  return config;
}, error => {
  return Promise.reject(error);
});

http.interceptors.response.use(response => {
  return response;
}, error => {
  // Xử lý lỗi toàn cục
  return Promise.reject(error);
});

export default http;
