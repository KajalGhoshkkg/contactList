const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/contact_list");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting database"));

db.once("open", function () {
  console.log("successfully connected to the database");
});
