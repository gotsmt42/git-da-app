import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;
const apiSecret = process.env.REACT_APP_SECRET;


const API = axios.create({
  
  baseURL: apiUrl, // ใช้ Environment Variable ที่ชื่อ APP_API_URL
  headers: {
    Accept: "application/json", // แก้ไข Content-Type ให้เป็น application/json
    "X-API-Key": apiKey, // เพิ่ม API Key เข้าไปใน header หากต้องการ
    "X-Secret": apiSecret // เพิ่ม Secret Key เข้าไปใน header หากต้องการ
  },

  
  
});

export default API;
