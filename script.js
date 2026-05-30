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

    if (name === "" || roll === "" || course === "") {
        alert("Please fill all fields");
        return;
    }

    if (editIndex === -1) {
        students.push({
            name,
            roll,
            course,
            date: new Date().toLocaleDateString()
        });
        alert("Student added successfully");
    } else {
        students[editIndex].name = name;
        students[editIndex].roll = roll;
        students[editIndex].course = course;

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
}

function displayStudents(filteredStudents = students) {
    let table = document.getElementById("studentList");
    table.innerHTML = "";

    filteredStudents.forEach((student, index) => {
        let row = table.insertRow();

        row.insertCell(0).innerHTML = student.name;
        row.insertCell(1).innerHTML = student.roll;
        row.insertCell(2).innerHTML = student.course;
        row.insertCell(3).innerHTML = student.date || "-";

        row.insertCell(4).innerHTML = `
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
        `;
    });
}

function editStudent(index) {
    document.getElementById("name").value = students[index].name;
    document.getElementById("roll").value = students[index].roll;
    document.getElementById("course").value = students[index].course;

    editIndex = index;

    document.getElementById("addBtn").innerText = "Update Student";
}

function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);

        localStorage.setItem("students", JSON.stringify(students));

        displayStudents();
        updateTotalStudents();

        alert("Student deleted successfully");
    }
}

function searchStudent() {
    let searchValue = document
        .getElementById("search")
        .value
        .toLowerCase();

    let filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchValue) ||
        student.roll.toLowerCase().includes(searchValue) ||
        student.course.toLowerCase().includes(searchValue)
    );

    displayStudents(filteredStudents);
}

function updateTotalStudents() {
    document.getElementById("totalStudents").innerText = students.length;
}

function clearAllStudents() {
    if (confirm("Delete all student records?")) {
        students = [];
        localStorage.removeItem("students");

        displayStudents();
        updateTotalStudents();
    }
}

function exportCSV() {
    let csv = "Name,Roll No,Course,Date Added\n";

    students.forEach(student => {
        csv += `${student.name},${student.roll},${student.course},${student.date || ""}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv" });
    let url = window.URL.createObjectURL(blob);

    let a = document.createElement("a");
    a.href = url;
    a.download = "students.csv";
    a.click();

    window.URL.revokeObjectURL(url);
}
