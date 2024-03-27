const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const app = express();
const users = require("./routes/api/users");
const auth = require("./routes/api/auth")
app.use(express.json());
app.use(cors());
const mongoUrl = "mongodb://127.0.0.1:27017/mern";
mongoose.set('strictQuery', true);
mongoose.connect(mongoUrl, { useNewUrlParser:true , useUnifiedTopology:true }).then(() =>console.log("MongoDB connected...")).catch((err) =>console.log(err));

app.use("/api/users", users);
app.use("/api/auth", auth);
const port = process.env.PORT || 3001;
app.listen(port, () =>console.log(`Server running on port ${port}`));
