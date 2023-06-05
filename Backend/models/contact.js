const mongoose = require("mongoose");
const contactusSchema=mongoose.Schema({
    fullName:{
        type:String,
    },

    Message:{
        type:String,
    },
    email:{
        type:String,
    },

},
    {
    timestamps: true,
    }
    
)
module.exports = mongoose.model("Contactus", contactusSchema);