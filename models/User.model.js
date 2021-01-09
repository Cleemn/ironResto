const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'First name is required.']
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'Last name is required.']
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
    },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true
  }
);

module.exports = model('User', userSchema);