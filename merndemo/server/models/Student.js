const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Students = mongoose.model("Students", studentSchema);

module.exports = Students;