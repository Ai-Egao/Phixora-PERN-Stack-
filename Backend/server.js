import dotenv from "dotenv";
import app from "./src/app.js";
import db from "./src/config/database.js";

dotenv.config();

//------- for starting server with database connection -------
const DbPORT = process.env.DB_PORT || 5000;

db.connect()
  .then(() => {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`DB Server running on port ${DbPORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });



//------- for starting server without database connection -------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});