const mongoose = require("mongoose");

const url = "mongodb+srv://ela2zofia:derrick%400824@cluster0.3bu4k.mongodb.net/Cluster0?retryWrites=true&w=majority";
// const dbName = "5Silvers";

// mongoose.connect(`${url}/${dbName}`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
mongoose.connect(url, {
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
