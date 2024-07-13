const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");


const MONGO_URL = "mongodb://127.0.0.1:27017/airBnb";

main()
  .then(() => {
    console.log("Connect to DB");
})
.catch(err => {
    console.log(err);
});
async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/",  (req, res) => {
    res.send("Hi, I am root");
});

//  INDEX Route
app.get("/listings", async (req, res) => {
   const allListings = await Listing.find({});
       res.render("./listings/index.ejs", { allListings });
});
// app.get("/testListing", async (req, res) =>{
//   let sampleListing = new Listing({
//      title: "My New Villa",
//      description: "By the beach",
//      price: 1200,
//      location: "Calanguate, Goa",
//      country: "India"
//   });

//    await sampleListing.save();
//    console.log("Sample was Saved");
//    res.send("Successful testing");
// });

app.listen(8080, () => {
    console.log("Server is listening to port: 8080");
});