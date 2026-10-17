import mongoose from "mongoose";

const allProjectSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, 'Title or Degree is required'],
    },
    ttile: {
        type: String,
        required: [true, 'Ttile required']
    },
    detail: {
        type: String,
        required: [
            true, 'Detail importn '
        ]
    }

})