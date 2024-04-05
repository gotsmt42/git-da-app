// models/User.js
const mongoose = require('../db/');

const calendarEventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    backgroundColor: { type: String, required: true },
    textColor: { type: String, required: true },
    fontSize: { type: Number, required: true },

    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // เพิ่มฟิลด์ userId ที่เก็บ ObjectId ของผู้ใช้

});

const CalendarEvent = mongoose.model('CalendarEvent', calendarEventSchema);




module.exports = CalendarEvent;
