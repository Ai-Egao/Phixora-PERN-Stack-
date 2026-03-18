import pool from "../../config/database.js";

export const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

export const createUser = async (name, email) => {
  const result = await pool.query(
    `INSERT INTO users (name, email, role)
     VALUES ($1, $2, 'customer')
     RETURNING *`,
    [name, email]
  );

  return result.rows[0];
};