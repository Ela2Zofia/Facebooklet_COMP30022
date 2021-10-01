const mongoose = require("mongoose");

const url = "mongodb+srv://ela2zofia:derrick%400824@5silvers.3bu4k.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const dbName = "5Silvers";

mongoose.connect(`${url}/${dbName}`, {
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
