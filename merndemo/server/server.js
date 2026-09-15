const express = require("express");
const cors = require("cors");

const Student = require("./models/Student");

const mongoose = require("mongoose");
require("dotenv").config();

let databaseConnected = false;
const mongoUri = process.env.MONGODB_URI;

if (mongoUri) {
    mongoose.connect(mongoUri)
        .then(() => {
            databaseConnected = true;
            console.log("Connected to MongoDB Atlas");
        })
        .catch(err => console.error("MongoDB connection failed:", err.message));
} else {
    console.warn("MONGODB_URI is not set; starting without database");
}

const app = express();

app.use(cors());
app.use(express.json());

// API kiểm tra server
app.get("/api/hello", (req, res) => {
    res.json({ message: "Backend đang hoạt động", databaseConnected });
});

const requireDatabase = (req, res, next) => {
    if (!databaseConnected) {
        return res.status(503).json({ message: "MongoDB chưa kết nối" });
    }

    next();
};

// Câu 36: GET danh sách sinh viên
app.get("/api/Students", requireDatabase, async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Câu 37: POST thêm sinh viên
app.post("/api/Students", requireDatabase, async (req, res) => {
    try {
        const student = await Student.create(req.body);
        res.status(201).json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Câu 38: PUT cập nhật sinh viên
app.put("/api/Students/:id", requireDatabase, async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Câu 39: DELETE xóa sinh viên
app.delete("/api/Students/:id", requireDatabase, async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});