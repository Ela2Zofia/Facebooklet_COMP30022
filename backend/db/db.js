const mongoose = require("mongoose");

const url = "mongodb://localhost:27017";
const dbName = "project_demo";

mongoose.connect(`${url}/${dbName}`, {
  //配置
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err);
});

db.once("open", () => {
  console.log("mongodb open success");
});

module.exports = mongoose
