const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./Routes/Employees-routes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`connected to DB...server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

app.use("/api/employees", router);
