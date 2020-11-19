
const express = require('express');
const authRoutes = express.Router();
const bcrypt = require('bcryptjs');

authRoutes.post('/signup', (req, res, next) => {
    res.status(400).json({message:"post signup"})
})

authRoutes.post('/login', (req, res, next) => {
    res.status(400).json({message:"post login"})
})

authRoutes.get('/loggedin', (req, res, next) => {
    res.status(400).json({message:"get loggedin"})
})

authRoutes.post('/logout', (req, res, next) => {
    res.status(400).json({message:"post logout"})
})

authRoutes.post('/user:id', (req, res, next) => {
    res.status(400).json({message:"post user:id"})
})



module.exports = authRoutes;