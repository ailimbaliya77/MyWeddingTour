import './src/config/env.js';
import { createServer } from "http";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";


const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    createServer(app).listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(() => {
    console.log("Server is not running.");
  });
