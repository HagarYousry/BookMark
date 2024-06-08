var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var tBodyInput = document.getElementById("tbody");
var SubmitBtn = document.getElementById("SubmitBtn");
var UpdateBtn = document.getElementById("UpdateBtn");
var alertElement = document.getElementById("Alert");
var NewBookmarksIndexToUpdate = -1;
var isValid;
var bookmarks = [];

if (localStorage.getItem("NewBookmarks") === null) {
  bookmarks = [];
} else {
  bookmarks = JSON.parse(localStorage.getItem("NewBookmarks"));
  DisplayData();
}

function SubmitBookmark() {
  if (
    isValid == true &&
    bookmarkNameInput.value != "" &&
    bookmarkURLInput.value != ""
  ) {
    var NewBookmarks = {
      sitName: bookmarkNameInput.value,
      sitURL: bookmarkURLInput.value,
    };
    bookmarks.push(NewBookmarks);
    ClearInput();
    DisplayData();
    localStorage.setItem("NewBookmarks", JSON.stringify(bookmarks));
    bookmarkNameInput.classList.remove("is-valid", "is-invalid");
    bookmarkURLInput.classList.remove("is-valid", "is-invalid");
    console.log(bookmarks);
  } else {
    alertElement.classList.replace("d-none", "d-flex");
  }
}

function DisplayData() {
  var Div = "";
  for (var i = 0; i < bookmarks.length; i++) {
    Div += ` <tr>
            <td>${i}</td>
            <td>${bookmarks[i].sitName}</td>
            <td><a class="btn btn-success" href="${bookmarks[i].sitURL}" target="_blank">visit</a></td>
            <td><button class="btn btn-primary" onclick="SetUpToUpdate(${i});">Update</button></td>
            <td><button class="btn btn-danger" onclick="DeleteData(${i});">delete</button></td>
          </tr>`;
  }
  tBodyInput.innerHTML = Div;
}

function SetUpToUpdate(index) {
  NewBookmarksIndexToUpdate = index;
  bookmarkNameInput.value = bookmarks[index].sitName;
  bookmarkURLInput.value = bookmarks[index].sitURL;
  SubmitBtn.classList.add("d-none");
  UpdateBtn.classList.remove("d-none");
}

function UpdateBookmark() {
  if (
    isValid == true &&
    bookmarkNameInput.value != "" &&
    bookmarkURLInput.value != ""
  ) {
    var index = NewBookmarksIndexToUpdate;
    bookmarks[index].sitName = bookmarkNameInput.value;
    bookmarks[index].sitURL = bookmarkURLInput.value;
    localStorage.setItem("NewBookmarks", JSON.stringify(bookmarks));
    DisplayData();
    ClearInput();
    UpdateBtn.classList.add("d-none");
    SubmitBtn.classList.remove("d-none");
  } else {
    alertElement.classList.replace("d-none", "d-flex");
  }
}

function DeleteData(index) {
  bookmarks.splice(index, 1);
  DisplayData();
  localStorage.setItem("NewBookmarks", JSON.stringify(bookmarks));
}

function ClearInput() {
  (bookmarkNameInput.value = ""), (bookmarkURLInput.value = "");
}

function ValidateInput(inputId, regexKey) {
  var input = document.getElementById(inputId);
  var regex = {
    siteName: /^[A-Z][a-z]{3,15}$/,
    sitURL: /\bhttps?:\/\/[\w-]+(\.[\w-]+)+([/?#]\S*)?/,
  };
  isValid = regex[regexKey].test(input.value);

  input.classList.remove("is-valid", "is-invalid");
  if (isValid) {
    console.log("Matched");
    input.classList.add("is-valid");
  } else {
    input.classList.add("is-invalid");
    console.log("Not matched");
  }
}

function hideAlert() {
  alertElement.classList.replace("d-flex", "d-none");
}
