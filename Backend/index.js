require("./Database/db");
require("dotenv").config({ path: "./.env" });
const express = require("express");


const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));

app.listen(PORT, () => {
  console.log(`Server listening on : http://localhost:${PORT} 🚀`);
});
