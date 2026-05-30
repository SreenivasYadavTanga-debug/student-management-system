let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

window.onload = function () {
    displayStudents();
    updateTotalStudents();
};

function addStudent() {
    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let course = document.getElementById("course").value.trim();

    let photoInput = document.getElementById("photo");
    let photo = "";

    if (photoInput.files.length > 0) {
        photo = URL.createObjectURL(photoInput.files[0]);
    }

    if (name === "" || roll === "" || course === "") {
        alert("Please fill all fields");
        return;
    }

    if (editIndex === -1) {
        students.push({
            name,
            roll,
            course,
            photo,
            date: new Date().toLocaleDateString()
        });

        alert("Student added successfully");
    } else {
        students[editIndex].name = name;
        students[editIndex].roll = roll;
        students[editIndex].course = course;

        if (photo !== "") {
            students[editIndex].photo = photo;
        }

        editIndex = -1;
        document.getElementById("addBtn").innerText = "Add Student";

        alert("Student updated successfully");
    }

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();
    updateTotalStudents();

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("course").value = "";
    document.getElementById("photo").value = "";
}

function displayStudents(filteredStudents = students) {
    let table = document.getElementById("studentList");
    table.innerHTML = "";

    filteredStudents.forEach((student, index) => {
        let row = table.insertRow();

        row.insertCell(0).innerHTML =
            student.photo
                ? `<img src="${student.photo}" width="50" height="50" style="border-radius:50%;object-fit:cover;">`
                : "No Photo";

        row.insertCell(1).innerHTML = student.name;
        row.insertCell(2).innerHTML = student.roll;
        row.insertCell(3).innerHTML = student.course;
        row.insertCell(4).innerHTML = student.date || "-";

        row.insertCell(5).innerHTML = `
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        `;
    });
}

function editStudent(index) {
    document.getElementById("name").value = students[index].name;
    document.getElementById("roll").value = students[index].roll
