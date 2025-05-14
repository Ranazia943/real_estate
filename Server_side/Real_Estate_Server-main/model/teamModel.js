import mongoose from "mongoose";


const {Schema} = mongoose;

const teamschema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    linkedin_link:{
        type: String,
        required: true
    },
    facebooklink:{
        type: String,
        required: true
    },
    twitterlink:{
        type: String,
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
})

const Team = mongoose.model("Team", teamschema);

export default Team;