import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: false
    },
    isPinned: {
        type: Boolean,
        required: false
    },
    createdAt: {
        type: Date,
        default: new Date().getTime()
    }
})

const Note = mongoose.model('Note', noteSchema);
export default Note;