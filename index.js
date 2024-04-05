require('dotenv').config(); // เรียกใช้ dotenv เพื่อโหลด Environment Variables

const express = require('express');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const fileRouter = require('./routes/file');
const calendarEventRouter = require('./routes/calendarEvent');

const app = express();
const PORT = process.env.APP_PORT;

// ใช้ Environment Variables จากไฟล์ .env
const apiURL = process.env.APP_API_URL;
const apiKey = process.env.APP_API_KEY;
const secret = process.env.APP_SECRET;


console.log({apiURL});
console.log({apiKey});
console.log({secret});

const cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/product', productRouter);
app.use('/api/files', fileRouter);
app.use('/api/events', calendarEventRouter);
app.use('/api/asset/uploads/images', express.static(__dirname + '/asset/uploads/images'));
app.use('/api/asset/uploads/files', express.static(__dirname + '/asset/uploads/files'));

app.use('/api/asset/image', express.static(__dirname + '/asset/image'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
