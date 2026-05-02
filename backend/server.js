const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tiffinDB";

mongoose.connect(MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/meals", require("./routes/meals"));

app.listen(5000, () => console.log("Server running"));