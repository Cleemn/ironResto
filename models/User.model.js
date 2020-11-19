const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: [true, 'Password is required.']
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required']
    },
    type: {
      type: String,
      enum: ['user', 'restaurant'],
      default: 'user'
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);