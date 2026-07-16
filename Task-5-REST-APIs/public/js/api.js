let editIndex = -1;
const form = document.querySelector("form");
const studentTable = document.getElementById("studentTableBody");

async function loadStudents() {

    const response = await fetch("/api/students");

    const students = await response.json();

    studentTable.innerHTML = "";
    document.getElementById("totalStudents").innerHTML = students.length;

const courses = [...new Set(students.map(s => s.course))];

document.getElementById("totalCourses").innerHTML = courses.length;
    students.forEach((student, index) => {

        studentTable.innerHTML += `

        <tr>

            <td>${student.name}</td>

            <td>${student.email}</td>

            <td>${student.phone}</td>

            <td>${student.course}</td>

            <td>

<button
class="btn btn-warning btn-sm"
onclick="editStudent(${index})">

Edit

</button>

<button
class="btn btn-danger btn-sm ms-2"
onclick="deleteStudent(${index})">

Delete

</button>

</td>
        </tr>

        `;

    });

}

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const student = {

        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        age: document.getElementById("age").value,
        course: document.querySelector("select").value

    };

    if (editIndex === -1) {

        // Add New Student
        await fetch("/api/students", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });

    } else {

        // Update Existing Student
        await fetch(`/api/students/${editIndex}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(student)

        });

        editIndex = -1;

    }

    form.reset();

    loadStudents();

});

async function deleteStudent(id) {

    await fetch(`/api/students/${id}`, {

        method: "DELETE"

    });

    loadStudents();

}

loadStudents();

async function editStudent(id){

    const response=await fetch(`/api/students/${id}`);

    const student=await response.json();

    name.value=student.name;

    email.value=student.email;

    phone.value=student.phone;

    age.value=student.age;

    document.querySelector("select").value=student.course;

    editIndex=id;

}

document.getElementById("totalStudents").innerHTML = students.length;

const courses = [...new Set(students.map(s => s.course))];

document.getElementById("totalCourses").innerHTML = courses.length;

let editIndex=-1;

async function editStudent(id){

const response=await fetch(`/api/students/${id}`);

const student=await response.json();

document.getElementById("name").value=student.name;
document.getElementById("email").value=student.email;
document.getElementById("phone").value=student.phone;
document.getElementById("age").value=student.age;
document.querySelector("select").value=student.course;

editIndex=id;

}