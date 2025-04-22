import axios from "axios";
const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InByYWJpbm5lcGFsMTk5NkBnbWFpbC5jb20iLCJzdWIiOiIxOGNhZDM0My0wZmQ3LTQyMWYtODI0MC04ZmZlYTI0Y2ZhODQiLCJpYXQiOjE3NDMxMjM4ODEsImV4cCI6MTc0MzIxMDI4MX0.lzCFIcqZlRE8EDS7xL4JNaboNrXGfF1mVHVqAxJFQLs' // Assuming token is stored in localStorage
    }
  });

const response = await api.get('/api/watchlists');
console.log(response)