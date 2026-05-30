let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents();
updateCount();

function addStudent() {
    const name = document.getElementById("name").value;
    const roll = document.getElementById("roll").value;
    const course = document.getElementById("course").value;
    const photo = document.getElementById("photo").files[0];

    if (!name || !roll || !course) {
        alert("Please fill all fields");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const student = {
            name: name,
            roll: roll,
            course: course,
            photo: e.target.result,
            date: new Date().toLocaleDateString()
        };

        students.push(student);

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

    if (photo) {
        reader.readAsDataURL(photo);
    } else {
        reader.onload({
            target: { result: "" }
        });
    }
}

function displayStudents() {
    const tbody = document.getElementById("studentTableBody");

    tbody.innerHTML = "";

    students.forEach((student, index) => {
        tbody.innerHTML += `
        <tr>
            <td>
                <img src="${student.photo}"
                     width="50"
                     height="50"
                     style="border-radius:50%;">
            </td>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.course}</td>
            <td>${student.date}</td>
            <td>
                <button onclick="deleteStudent(${index})">
                    Delete
                </button>
            </td>
        </tr>
        `;
    });
}

function deleteStudent(index) {
    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    displayStudents();
    updateCount();
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
