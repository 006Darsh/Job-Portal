require("./Database/db");
require("dotenv").config({ path: "./.env" });
const cors = require("cors");
const express = require("express");
const path = require("path");

const logger = require("morgan");

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(express.json({ limit: "10mb" }));

app.use(logger("dev"));

require("./Routes/AuthRoutes")(app);

app.listen(PORT, () => {
  console.log(`Server listening on : http://localhost:${PORT} 🚀`);
});
