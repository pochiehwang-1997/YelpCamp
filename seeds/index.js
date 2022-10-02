const mongoose = require("mongoose");
const Campground = require("../models/campground");
const { toLocaleString } = require("./cities");
const cities = require("./cities");
const {descriptors,places} = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console,"Connection error:"));
db.once("open",()=>{
    console.log("Databased connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random()*array.length)]};

const seedDB = async ()=>{
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++){
        const random1000 = Math.floor(Math.random()*1000);
        const camp = new Campground({
            author: "62c3f62d3fa7368d67d6101d",
            location : `${cities[random1000].city} ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [{
                url: 'https://res.cloudinary.com/de7d3nghg/image/upload/v1657704841/YelpCamp/u2kzenpecfiehwqrmf1h.jpg',
                filename: 'YelpCamp/u2kzenpecfiehwqrmf1h'
              },
              {
                url: 'https://res.cloudinary.com/de7d3nghg/image/upload/v1657709264/YelpCamp/vltzhsr6mihkw9bbljbr.jpg',
                filename: 'YelpCamp/vltzhsr6mihkw9bbljbr'
              },
              {
                url: 'https://res.cloudinary.com/de7d3nghg/image/upload/v1657709764/YelpCamp/vuudtyersceqmi5cqszr.jpg',
                filename: 'YelpCamp/vuudtyersceqmi5cqszr'
              }],            
            price: 10,
            geometry: {
                type: "Point",
                coordinates:[cities[random1000].longitude,cities[random1000].latitude]
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, maxime quibusdam incidunt accusantium rem eum officiis, ex, culpa voluptate iste id suscipit impedit. Accusantium, sit quas debitis quae suscipit officia." 
        });
    await camp.save();
        
    }
};

seedDB()
.then(()=>{
    mongoose.connection.close();
});