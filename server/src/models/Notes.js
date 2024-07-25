const mongoose=require('mongoose');


const NotesSchama=new mongoose.Schema({
    text:{
        type: 'string',
        required: true,
    },
    date:{
        type: 'string',
        required: true,
    },
    color:{
        type: 'string',
        required: true,
    }
})

module.exports=mongoose.model('Notes',NotesSchama);