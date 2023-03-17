const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeRouter = require("./Routes/Employees-routes");
const UserRouter = require("./Routes/User-routes");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;

const start = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://prabalrai17:rai123@clusterluniva.wabggw6.mongodb.net/lunivaEmployees?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    app.listen(port, () => {
      console.log(`connected to DB...server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

app.use("/api/employees", EmployeeRouter);
app.use("/api/user", UserRouter);
