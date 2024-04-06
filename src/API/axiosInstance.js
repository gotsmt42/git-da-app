import axios from "axios";
console.log(process.env.REACT_APP_API_URL)
const API = axios.create({
  
  baseURL: process.env.REACT_APP_API_URL, // ใช้ Environment Variable ที่ชื่อ APP_API_URL
  headers: {
    Accept: "application/json", // แก้ไข Content-Type ให้เป็น application/json
    // "X-API-Key": process.env.REACT_APP_API_KEY, // เพิ่ม API Key เข้าไปใน header หากต้องการ
    "X-Secret": process.env.REACT_APP_SECRET // เพิ่ม Secret Key เข้าไปใน header หากต้องการ
  },

  
  
});

export default API;
