let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

displayStudents();
updateCount();

function addStudent() {

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let course = document.getElementById("course").value.trim();
    let photoFile = document.getElementById("photo").files[0];

    if (!name || !roll || !course) {
        alert("Please fill all fields");
        return;
    }

    const saveStudent = (photoData) => {

        let student = {
            name: name,
            roll: roll,
            course: course,
            photo: photoData,
            date: new Date().toLocaleDateString()
        };

        if (editIndex === -1) {
            students.push(student);
        } else {

            if (!photoData) {
                student.photo = students[editIndex].photo;
            }

            students[editIndex] = student;
            editIndex = -1;

            document.getElementById("addBtn").innerText =
                "Add Student";
        }

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();
        updateCount();

        document.getElementById("name").value = "";
        document.getElementById("roll").value = "";
        document.getElementById("course").value = "";
        document.getElementById("photo").value = "";
    };

    if (photoFile) {

        let reader = new FileReader();

        reader.onload = function (e) {
            saveStudent(e.target.result);
        };

        reader.readAsDataURL(photoFile);

    } else {

        let oldPhoto = "";

        if (editIndex !== -1) {
            oldPhoto = students[editIndex].photo;
        }

        saveStudent(oldPhoto);
    }
}

function displayStudents() {

    let tbody =
        document.getElementById("studentTableBody");

    tbody.innerHTML = "";

    students.forEach((student, index) => {

        tbody.innerHTML += `
        <tr>
            <td>
                ${
                    student.photo
                        ? `<img src="${student.photo}" width="60" height="60" style="border-radius:50%;">`
                        : "No Photo"
                }
            </td>

            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.course}</td>
            <td>${student.date}</td>

            <td>
                <button onclick="editStudent(${index})">
                    Edit
                </button>

                <button onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

function editStudent(index) {

    document.getElementById("name").value =
        students[index].name;

    document.getElementById("roll").value =
        students[index].roll;

    document.getElementById("course").value =
        students[index].course;

    editIndex = index;

    document.getElementById("addBtn").innerText =
        "Update Student";
}

function deleteStudent(index) {

    if (confirm("Delete this student?")) {

        students.splice(index, 1);

        localStorage.setItem(
            "students",
            JSON.stringify(students)
        );

        displayStudents();
        updateCount();
    }
}

function clearAll() {

    if (confirm("Delete all students?")) {

        students = [];

        localStorage.removeItem("students");

        displayStudents();
        updateCount();
    }
}

function updateCount() {

    document.getElementById("totalStudents").innerText =
        students.length;
}

function searchStudent() {

    let filter =
        document.getElementById("searchInput")
            .value
            .toLowerCase();

    let rows =
        document.querySelectorAll(
            "#studentTableBody tr"
        );

    rows.forEach(row => {

        let text =
            row.innerText.toLowerCase();

        row.style.display =
            text.includes(filter)
                ? ""
                : "none";
    });
}

function exportCSV() {

    let csv =
        "Name,Roll No,Course,Date Added\n";

    students.forEach(student => {
