// Model ka schema banane ke liye mongodb se connection nhi chahiye hota
// but jab CRUD operation krrhe ho toh connect karna jaroori hai.

const mongoose = require("mongoose");
const Review = require("./reviews");    

const listingSchema = mongoose.Schema({
    title : {
        type : String ,
        required : true
    } , 
    description : {
        type : String ,
        maxLength : 500
    } , 
    image : {
        type : String ,
        default : "https://in.images.search.yahoo.com/search/images?p=unsplash+images&fr=mcafee&type=E211IN714G0&imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F34046635%2Fpexels-photo-34046635.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-ahmetyuksek-34046635.jpg%26fm%3Djpg#id=34&iurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F34046635%2Fpexels-photo-34046635.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-ahmetyuksek-34046635.jpg%26fm%3Djpg&action=click" ,
    } , 
    price : {
        type : Number
    } , 
    location : {
        type : String
    } , 
    country : { 
        type : String
    } ,
    reviews : [
        {
            type : mongoose.Schema.Types.ObjectId ,
            ref : "Review" , 
        }
    ] , 
    owner : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Users" ,
    } ,
});

listingSchema.post("findOneAndDelete" , async(listing) => {
    if(listing){
        await Review.deleteMany({_id : {$in : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing" , listingSchema);
module.exports = Listing;