const express = require("express");

const router = express.Router();

// Temporary Database
let students = [];

// ================= GET ALL =================

router.get("/students", (req, res) => {

    res.status(200).json(students);

});

// ================= GET SINGLE =================

router.get("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    if (id < 0 || id >= students.length) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    res.json(students[id]);

});

// ================= CREATE =================

router.post("/students", (req, res) => {

    const student = {

        id: Date.now(),

        name: req.body.name,

        email: req.body.email,

        phone: req.body.phone,

        age: req.body.age,

        course: req.body.course

    };

    students.push(student);

    res.status(201).json({

        message: "Student Added Successfully",

        student

    });

});

// ================= UPDATE =================

router.put("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    if (id < 0 || id >= students.length) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    students[id] = {

        ...students[id],

        ...req.body

    };

    res.json({

        message: "Student Updated",

        student: students[id]

    });

});

// ================= DELETE =================

router.delete("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    if (id < 0 || id >= students.length) {

        return res.status(404).json({
            message: "Student not found"
        });

    }

    students.splice(id, 1);

    res.json({

        message: "Student Deleted Successfully"

    });

});

module.exports = router;