const Notes=require('../models/Notes');
const User=require('../models/User');

exports.addNotes = async (req, res) => {
    try {
        const { text, date } = req.body;
        const userId = req.user.id;  // Extracted from the decoded token
        console.log(req.user);

        if (!text || !date) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const note = await Notes.create({ text, date });

        //push in add note in user id
        const user = await User.findById(userId); 
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.notes.push(note._id);
        await user.save();

        //send response
        return res.status(200).json({
            success: true,
            message: "Note added successfully",
            note
        });
    } catch (error) {
        console.log("Error in addNotes controller: " + error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to add note"
        });
    }
};



//get user notes

exports.getUserNotes = async (req, res) => {
    try {

        const userId = req.user.id;  // Extracted from the decoded token
        const user = await User.findById(userId).populate('notes');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            notes: user.notes
        });

    } catch (error) {
        console.log("Error in getUserNotes controller: " + error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to get user notes"
        });
    }
};


//delete notes
exports.deleteNote = async (req, res) => {
    try {
        const noteId = req.params.noteId;  // Note ID from the URL parameters
        const userId = req.user.id;  // Extracted from the decoded token

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const noteIndex = user.notes.indexOf(noteId);
        if (noteIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Note not found"
            });
        }

        user.notes.splice(noteIndex, 1);  // Remove the note from the user's notes array
        await user.save();

        await Notes.findByIdAndDelete(noteId);  // Delete the note from the Notes collection

        return res.status(200).json({
            success: true,
            message: "Note deleted successfully"
        });
    } catch (error) {
        console.log("Error in deleteNote controller: " + error.message);
        return res.status(500).json({
            success: false,
            message: "Failed to delete note"
        });
    }
};