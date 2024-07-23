const express = require('express');
const router = express.Router();


const {addNotes,getUserNotes}=require('../controllers/NotesController')
const { verifyToken } = require('../middlewares/VerifyToken');

router.post('/addnotes', verifyToken, addNotes);
router.post('/getusernotes',verifyToken, getUserNotes);



module.exports = router;
