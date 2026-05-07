const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, masterPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(masterPassword, user.masterPassword))) {
      return res.status(401).json({ error: "Invalid email or master password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
router.post('/register', async (req, res) => {
  try {
    const { name, regNo, marks, address, email, masterPassword } = req.body;
    
    const hashed = await bcrypt.hash(masterPassword, 10);
    
    const user = await User.create({ 
      name, 
      regNo, 
      marks,      
      address, 
      email, 
      masterPassword: hashed 
    });

    res.status(201).json({ message: "Registration successful", userId: user._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;