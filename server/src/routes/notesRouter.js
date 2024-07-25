const express = require('express');
const router = express.Router();


const {addNotes,getUserNotes,deleteNote,updateNotes}=require('../controllers/NotesController')
const { verifyToken } = require('../middlewares/VerifyToken');

router.post('/addnotes', verifyToken, addNotes);
router.post('/getusernotes',verifyToken, getUserNotes);
router.post('/remove',verifyToken, deleteNote);
router.post('/update',updateNotes);


module.exports = router;
