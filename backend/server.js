const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/tiffinDB")
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));
app.use("/api/meals", require("./routes/meals"));
app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => console.log("Server running"));