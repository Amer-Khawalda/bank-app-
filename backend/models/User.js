const mongoose = require('mongoose');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    require:true
  },
  email: {
    type: String,
    require:true,
    unique: true,
  },
  password: {
    type: String,
    require:true
  },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  
  
  UserSchema.methods.matchPasswords = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  
  UserSchema.methods.getSignToken = function () {
    const { _id, userName , email, } = this;
    return jwt.sign(
      { _id, userName, email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '1d' }
    );
  };
  
  UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
    return resetToken;
  };

const User = mongoose.model('User', UserSchema);

module.exports = User;
