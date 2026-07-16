const express = require("express");
const path = require("path");
const { body, validationResult } = require("express-validator");
const apiRoutes = require("./routes/api");
const app = express();

const PORT = 3000;

// Temporary Server Storage
const students = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
    res.render("index", {
        errors: [],
        oldData: {}
    });
});

app.post(
    "/register",

    [
        body("name")
            .trim()
            .isLength({ min: 3 })
            .withMessage("Name must contain at least 3 characters"),

        body("email")
            .isEmail()
            .withMessage("Enter a valid email"),

        body("phone")
            .isLength({ min: 10, max: 10 })
            .withMessage("Phone number must contain 10 digits"),

        body("age")
            .isInt({ min: 18, max: 60 })
            .withMessage("Age should be between 18 and 60"),

        body("course")
            .notEmpty()
            .withMessage("Please select a course"),

        body("password")
            .isLength({ min: 8 })
            .withMessage("Password should be at least 8 characters"),

        body("confirmPassword")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }
                return true;
            })
    ],

    (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.render("index", {
                errors: errors.array(),
                oldData: req.body
            });

        }

        const student = {

            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            age: req.body.age,
            course: req.body.course

        };

        students.push(student);

        res.render("success", { student });

    }

);

app.get("/students", (req, res) => {

    res.render("students", {
        students
    });

});

app.use("/api",apiRoutes);

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});