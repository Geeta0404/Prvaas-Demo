// routes/auth.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const db = require('../config/db');

//register
router.post('/register', async (req, res) => {
  const { name, email, mobile, message, password } = req.body;

  if (!name || !email || !mobile || !password) {
    return res.status(400).json({ success: false, message: "❌ All fields are required." });
  }

  try {
    const [check] = await db.execute('SELECT id FROM users WHERE email = ?', [email]);
    if (check.length > 0) {
      return res.status(409).json({ success: false, message: "❌ Email already registered." });
    }

    const [result] = await db.execute(
      'INSERT INTO users (name, email, mobile, message, password) VALUES (?, ?, ?, ?, ?)',
      [name, email, mobile, message, password]
    );

    if (result.affectedRows > 0) {
      res.json({ success: true, message: '✅ Registered successfully' });
    } else {
      res.status(500).json({ success: false, message: '❌ Could not save user' });
    }
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ success: false, message: '❌ Server error' });
  }
});


// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(400).json({ success: false, message: "❌ User not found!" });
    }

    const user = rows[0];

    // Plaintext password match (only if you're not hashing passwords yet)
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: "❌ Incorrect password!" });
    }

    res.json({
      success: true,
      message: "✅ Login successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "❌ Server error" });
  }
});


module.exports = router;
