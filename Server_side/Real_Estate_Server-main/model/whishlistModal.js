import mongoose from "mongoose";


const {Schema} = mongoose;

const whishschema = new Schema({
    propertyid:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    beds:{
        type: Number,
        required: true
    },
    baths:{
        type: Number,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    size:{
        type: Number,
        required: true
    },
    poster:{
        userid:{
            type: String,
            required: true
        },
        name:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true
        },
        profile:{
            type: String,
            required: true
        }
    },
    price:{
        type: Number,
        required: true
    }
})
const Whishlist = mongoose.model("Whishlist",whishschema);

export default Whishlist;