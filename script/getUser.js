const url = "https://api-bloodbank.herokuapp.com/user/get-all-user";
// const url = "http://localhost:5000/user/get-all-user";
let token = localStorage.getItem("userToken");

fetch(url, {
  method: "GET",
  headers: {
    authorization: "Bearer " + token,
    "content-type": "application/json",
    accept: "application/json",
  },
})
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let users = data.data;
    users.forEach((item) => {
      const list = document.querySelector("#user-list");

      const row = document.createElement("tr");
      row.innerHTML = `<td>${item.first_name}</td>
      <td>${item.last_name}</td>
      <td>${item.email}</td>
      <td><a href="#"  class="btn btn-primary btn-sm" id="tableContact" onClick="openModal()">contact</a></td>`;
      list.appendChild(row);
    });
  });

var modal = document.getElementById("simpleModal");
var openBtn = document.getElementById("tableContact");
closeBtn.addEventListener("click", closeModal);

function openModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
}
