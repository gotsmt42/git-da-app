// models/User.js
const mongoose = require('../db/');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  fname: String,
  lname: String,
  tel: String,
  imageUrl: { type: String, default: "asset/image/profile-1.jpg" }, // ให้เก็บ URL ของภาพ

  rank: { type: String, default: 'employee' },
  role: { type: String, default: 'user' },
  token: String,
}, { timestamps: true });

// Middleware สำหรับก่อน save user
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

// เพิ่ม method เพื่อเปรียบเทียบ password
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
