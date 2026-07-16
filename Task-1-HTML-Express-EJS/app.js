const express = require("express");
const path = require("path");

const app = express();

const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Home Route
app.get("/", (req, res) => {
    res.render("index");
});

// Form Submission Route
app.post("/register", (req, res) => {

    const { name, email, course } = req.body;

    res.render("success", {
        name,
        email,
        course
    });

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});