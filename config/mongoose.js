const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost/contact_list");

mongoose.connect(
  "mongodb+srv://kkg:kkg@cluster0.cz2sr.mongodb.net/contact_list?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "error connecting database"));

db.once("open", function () {
  console.log("successfully connected to the database");
});
