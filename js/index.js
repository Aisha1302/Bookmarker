// ! select inputs
let webName = document.getElementById("name");
let url = document.getElementById("url");

let submit = document.getElementById("submit");
let tBody = document.getElementById("tBody");

let visitBtn = document.getElementById("visitBtn");
let deleteBtn = document.getElementById("deleteBtn");

let bookMarks;
let closeBtn = document.getElementById("closeBtn");
let lightBoxContainer = document.getElementById("lightBoxContainer");

if (localStorage.getItem("bookMarks") == null) {
    bookMarks = [];
} else {
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    display();
}

submit.addEventListener("click", addBookmark);

function addBookmark() {
    if (webName.value == "" || url.value == "") {
        lightBoxContainer.classList.replace("d-none", "d-flex");
        return;
    }
    if (validateBookName() == true && validateUrl() == true) {
        let bookMark = {
            webName: webName.value,
            url: url.value
        };
        bookMarks.push(bookMark);
        localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
        display();
        resetInputs();
    }
}

closeBtn.addEventListener("click", closeLightBox);

function closeLightBox() {
    lightBoxContainer.classList.replace("d-flex", "d-none");
}

function resetInputs() {
    webName.value = "";
    url.value = "";
    webName.style.border = "";
    webName.style.boxShadow = "";
    url.style.boxShadow = "";
    url.style.border = "";
}

function display() {
    var table = ``;
    for (var i = 0; i < bookMarks.length; i++) {
        table += ` <tr>
        <td>${i + 1}</td>
        <td>${bookMarks[i].webName}</td>
        <td><button id="visit" class="visit-style rounded-2"><a href="${bookMarks[i].url}" class="text-decoration-none text-white"><i class="fa-solid fa-eye text-white"></i> Visit</a> </button></td>
        <td><button id="delete" class="delete-style rounded-2" onclick="deleteBookMark(${i})"><i class="fa-solid fa-trash-can text-white"></i>  Delete</button></td>
    </tr>`;
    }
    tBody.innerHTML = table;
}

function deleteBookMark(index) {
    bookMarks.splice(index, 1);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    display();
}

//VALIDATION

function validateBookName() {
    var regex = /.{3,}/;
    if (regex.test(webName.value) == true) {
        webName.style.border = " 1px solid green";
        webName.style.boxShadow = "0 0 0 0.2rem rgba(46, 100, 46, 0.3)";
        return true;
    } else {
        webName.style.border = "1px solid red";
        webName.style.boxShadow = "0 0 0 0.3rem rgba(255, 0, 0, 0.1)";
        return false;
    }
}

function validateUrl() {
    var regex = /www\.[a-zA-Z]{2,}/;
    if (regex.test(url.value) == true) {
        url.style.border = " 1px solid green";
        url.style.boxShadow = "0 0 0 0.2rem rgba(46, 100, 46, 0.3)";
        return true;
    } else {
        url.style.border = "1px solid red";
        url.style.boxShadow = "0 0 0 0.3rem rgba(255, 0, 0, 0.1)";
        return false;
    }
}
