const mongoose = require('mongoose');

const UserSchema =new mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    email: {type: 'string', required:true},
    password: {type: 'string', required:true},
    notes:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Notes"
    }]
})


module.exports=mongoose.model("User",UserSchema);