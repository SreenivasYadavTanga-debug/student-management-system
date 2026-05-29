let students = JSON.parse(localStorage.getItem("students")) || [];

window.onload = function () {
    displayStudents();
};

function addStudent() {
    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let course = document.getElementById("course").value;

    if (name === "" || roll === "" || course === "") {
        alert("Please fill all fields");
        return;
    }

    students.push({ name, roll, course });

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("course").value = "";
}

function displayStudents() {
    let table = document.getElementById("studentList");
    table.innerHTML = "";

    students.forEach((student, index) => {
        let row = table.insertRow();

        row.insertCell(0).innerHTML = student.name;
        row.insertCell(1).innerHTML = student.roll;
        row.insertCell(2).innerHTML = student.course;
        row.insertCell(3).innerHTML =
            `<button onclick="deleteStudent(${index})">Delete</button>`;
    });
}

function deleteStudent(index) {
    students.splice(index, 1);

    localStorage.setItem("students", JSON.stringify(students));

    displayStudents();

    alert("Student deleted successfully");
}