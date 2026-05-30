let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents();
updateCount();

function addStudent() {

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let course = document.getElementById("course").value;
    let photo = document.getElementById("photo").files[0];

    if (name === "" || roll === "" || course === "") {
        alert("Please fill all fields");
        return;
    }

    let reader = new FileReader();

    reader.onload = function(e) {

        let student = {
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
            target: {
                result: ""
            }
        });
    }
}

function displayStudents() {

    let tbody =
        document.getElementById("studentTableBody");

    tbody.innerHTML = "";

    students.forEach(function(student, index) {

        tbody.innerHTML += `
        <tr>
            <td>
                <img src="${student.photo}"
                     width="60"
                     height="60"
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

    students = [];

    localStorage.removeItem("students");

    displayStudents();
    updateCount();
}

function updateCount() {

    document.getElementById("totalStudents")
        .innerText = students.length;
}

function searchStudent() {

    let filter =
        document.getElementById("searchInput")
        .value.toLowerCase();

    let rows =
        document.querySelectorAll(
            "#studentTableBody tr"
        );

    rows.forEach(function(row) {

        let text =
            row.innerText.toLowerCase();

        if (text.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
