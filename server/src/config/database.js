const mongoose = require('mongoose');

require('dotenv').config();

const dbConnect=()=>{
    mongoose.connect(process.env.DB_URL,{
        // useNewUrlParser:true,
        // useUnifiedTopology:true
    }).then(()=>{console.log("DB connection established")})
    .catch((error)=>{
        console.log("Issue in DB Connection");
        console.error(error.message);
        process.exit(1);
    })
}

module.exports=dbConnect;