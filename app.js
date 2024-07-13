const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path = require("path");
const methodOverride = require("method-override");


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
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

app.get("/",  (req, res) => {
    res.send("Hi, I am root");
});

//  INDEX Route
app.get("/listings", async (req, res) => {
   const allListings = await Listing.find({});
       res.render("./listings/index.ejs", { allListings });
});

//NEW Route
app.get("/listings/new", (req,res) => {
    res.render("listings/new.ejs");
});


// SHOW Route
app.get("/listings/:id", async (req, res) => {
   let {id} = req.params;
   const listing = await Listing.findById(id);
   res.render("listings/show.ejs", { listing });
});

//CREATE Route
app.post("/listings", async (req, res) =>{
    // let {title, decription, image, price, country, location} = req.body;             this is one method for listing items
    // let listing = req.body.listing;
    // new listing = (listing);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
});

//EDIT Route
app.get("/listings/:id/edit", async (req,res) =>{
   let {id} = req.params;
   const listing = await Listing.findById(id);
   res.render("listings/edit.ejs", { listing });
});

//UPDATE Route
app.put("/listings/:id", async (req, res) =>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
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