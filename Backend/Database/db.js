require("dotenv").config({ path: "./.env" });
const URL = process.env.DBURL;
const mongoose = require("mongoose");

mongoose
  .connect(URL)
  .then(() => {
    console.log("Connected to the DB......");
  })
  .catch((error) => {
    console.error("Error in Connection with DB:" + error);
  });
