
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    // Define user schema fields here
    name: {
        type: String,
        maxlength: 255,
        required: true
    },
    // phone: {
    //     type: Number,
    //     maxlength: 10,
    //     required: true
    // },
    email: {
        type:String,
        required : true,
        validate: {
            validator : async function(value) {
                console.log({value});
               let exists = await mongoose.models.User.findOne({email:value})
                if (exists){

                    return false;
                }
                return true;
            },
            msg:"email already exsists"
        }
    },
    password: {
        type: String,
        required: true
    },
});

const Admin = mongoose.model("Admin", AdminSchema); 

module.exports = Admin; 
