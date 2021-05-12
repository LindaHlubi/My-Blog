//set env variables on host in production
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

//connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});
const db = mongoose.connection;
db.once("open", () => console.log("Connected to mongodDB"));
db.on("error", err => console.log(err));

app.use("/", express.static(path.join(__dirname, "/client/build")));

//parse form to json
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//routes
app.use("/form", require("./routes/form"));
app.use("/blog", require("./routes/blog"));
app.use("/admin/register", require("./routes/register"));
app.use("/admin/login", require("./routes/login"));
app.use("/admin/user", require("./routes/user"));

//serve static assets if in production
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening @ port ${PORT}`));
