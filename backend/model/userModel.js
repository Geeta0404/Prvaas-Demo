const db = require("../db");

const createUser = (name, email, mobile, message, hashedPassword, callback) => {
  const sql = "INSERT INTO users (name, email, mobile, message, password) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, email, mobile, message, hashedPassword], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

module.exports = { createUser, findUserByEmail };
