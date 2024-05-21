const express = require("express");
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const port = 8080;
const app = express();

// <=====================Database Connection==========================>

const MONGO_URL = "mongodb://127.0.0.1:27017/tourlisting";

main()
  .then(() => {
    console.log("Successfully Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

// <=====================Setings==========================>

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

// <===================== Index Route ==========================>

app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  // console.log(allListings);
  res.render("./listings/index.ejs", { allListings });
});

// <===================== Show Route ==========================>
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  console.log(listing);
  res.render("./listings/show.ejs", { listing });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
