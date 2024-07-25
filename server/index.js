const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.json());
// Use CORS middleware
app.use(cors(
    {
        original:["https://notesfrontend-ten.vercel.app"],
        methods:["GET", "POST"],
        credentials:true
    }
));

app.get('/', (req, res) => {
    res.send("Hello, how are you?");
});



// Mount the user login and signup routes
const userRoutes = require('./src/routes/userRouter');
app.use('/api/v1/user', userRoutes);

//mount the notes  addnotes,getusernotes routes
const notesRoutes = require('./src/routes/notesRouter');
app.use('/api/v1/notes', notesRoutes);




clg


const connect = require('./src/config/database');
connect();



//activation

const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`listening on url->  http://localhost:${PORT}`);
});

