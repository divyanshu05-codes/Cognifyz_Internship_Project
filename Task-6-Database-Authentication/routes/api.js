const express = require("express");

const router = express.Router();

const Student = require("../models/Student");

const auth = require("../middleware/auth");

/* =========================
GET ALL STUDENTS
========================= */

router.get("/students", auth, async (req,res)=>{

    const students = await Student.find();

    res.json(students);

});

/* =========================
GET SINGLE
========================= */

router.get("/students/:id", auth, async (req,res)=>{

    const student = await Student.findById(req.params.id);

    res.json(student);

});

/* =========================
ADD STUDENT
========================= */

router.post("/students", auth, async (req,res)=>{

    const student = await Student.create(req.body);

    res.status(201).json(student);

});

/* =========================
UPDATE STUDENT
========================= */

router.put("/students/:id", auth, async (req,res)=>{

    const student = await Student.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
            new:true
        }

    );

    res.json(student);

});

/* =========================
DELETE STUDENT
========================= */

router.delete("/students/:id", auth, async (req,res)=>{

    await Student.findByIdAndDelete(req.params.id);

    res.json({

        message:"Student Deleted Successfully"

    });

});

module.exports = router;