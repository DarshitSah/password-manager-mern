const express = require('express');
const Password = require('../models/Password');
const jwt = require('jsonwebtoken');

const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

router.use(auth);

router.get('/', async (req, res) => {
  const passwords = await Password.find({ user: req.userId });
  res.json(passwords);
});

router.post('/', async (req, res) => {
  const { site, username, password } = req.body;
  const newPass = await Password.create({ user: req.userId, site, username, password });
  res.status(201).json(newPass);
});

module.exports = router;