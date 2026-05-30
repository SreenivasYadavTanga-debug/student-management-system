let students = JSON.parse(localStorage.getItem("students")) || [];

displayStudents();
updateCount();

function addStudent() {
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const course = document.getElementById("course").value.trim();
    const photoFile = document.getElementById("photo").files[0];

    if (!name || !roll || !course) {
        alert("Please fill all fields!");
        return;
    }

    const saveStudent = (photoData) => {
        const student = {
            name,
            roll,
            course,
            photo: photoData,
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

    if (photoFile) {
        const reader = new FileReader();

        reader.onload = function (e) {
            saveStudent(e.target.result);
        };

        reader.readAsDataURL(photoFile);
    } else {
        saveStudent("");
    }
}

function displayStudents() {
    const tbody = document.getElementById("studentTableBody");

    tbody.innerHTML = "";

    students
