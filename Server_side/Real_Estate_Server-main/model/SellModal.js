import mongoose from "mongoose";


const {Schema} = mongoose;

const sellschema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    experience:{
        type: String,
        required: true
    },
    userInfo:{
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
    agentInfo:{
        agentid:{
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
    actions:{
        cancel:{
            type: Boolean,
            default: false
        },
        complete:{
            type: Boolean,
            default: false
        }
    },
    deletedby:{
        user:{
            type:Boolean,
            default: false
        },
        agent:{
            type:Boolean,
            default: false
        }
    }
})

const Seller = mongoose.model("Seller", sellschema);

export default Seller;