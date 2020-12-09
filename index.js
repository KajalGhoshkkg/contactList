const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;

const db = require("./config/mongoose");
const Contact = require("./models/contact");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded()); //this is a parser which act as a middleware to access data of a form only that can be get from browser after submitting a form
app.use(express.static("assets"));

// var contactList = [
//   {
//     name: "kg",
//     phone: 10155050,
//   },
//   {
//     name: "kg",
//     phone: 10155050,
//   },
// ];

app.get("/", function (req, res) {
  Contact.find({}, function (err, contacts) {
    if (err) {
      console.log("error fetching contacts from db");
      return;
    }
    return res.render("home", {
      title: "my contact_list",
      contact_list: contacts,
    });
  });
});

app.get("/practice", function (req, res) {
  return res.render("practice", {
    title: "playground",
  });
});

app.post("/create-contact", function (req, res) {
  //contactList.push(req.body);
  // return res.redirect("/"); //incase of long url where a form is been submitted, that case to go to the same page after submit we can use this code return "res.redirect("back");"

  Contact.create(req.body, function (err, newContact) {
    if (err) {
      console.log("error creating new contact", err);
      return;
    }
    console.log("******", newContact);
    return res.redirect("back");
  });
});

app.get("/delete", function (req, res) {
  console.log(req.query);
  let id = req.query.id;
  // let contIndex = contactList.findIndex((contact) => contact.phone == phone);

  // if (contIndex != -1) {
  //   contactList.splice(contIndex, 1);
  // }

  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("error deleting a contact");
      return;
    }
    return res.redirect("back");
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("error connecting the server", err);
  } else {
    console.log("successfully connected to the server on port: ", port);
  }
});
