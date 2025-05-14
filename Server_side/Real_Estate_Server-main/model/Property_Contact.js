import mongoose from "mongoose";


const {Schema} = mongoose;

const propertycontactschema = new Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    contactmessage:{
        type: String,
        required: true
    },
    propertyInfo:{
        propertyid:{
            type: String,
            required: true
        },
        title:{
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        }
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
        },
        rejected:{
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

const Property_Contact = mongoose.model("Property_Contact", propertycontactschema);

export default Property_Contact;