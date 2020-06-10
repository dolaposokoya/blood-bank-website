const url = "https://api-bloodbank.herokuapp.com/user/get-all-user";
// const url = "http://localhost:5000/user/get-all-user";
let token = localStorage.getItem("userToken");
document.querySelector(".back").classList.add("backPop");
document.querySelector(".main").classList.add("spinner3");

function checkToken() {
  if (localStorage.getItem("userToken")) {
    fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let users = data.data;
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        users.forEach((item, index) => {
          const list = document.querySelector("#user-list");
          const row = document.createElement("tr");
          row.innerHTML = `<td><i class="fas fa-user"></i> ${item.first_name} ${item.last_name}</td>
      <td><i class="fas fa-envelope"></i> ${item.email}</td>
      <td><i class="fas fa-tint"></i> ${item.blood_group}</td>
      <td><a href="#"  class="btn btn-primary btn-sm" id="tableContact" onClick="openModal()">contact</a></td>`;
          list.appendChild(row);
        });
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
      });
  } else {
    window.location.assign("/index.html");
  }
}

checkToken();

var modal = document.getElementById("simpleModal");
var openBtn = document.getElementById("tableContact");
closeBtn.addEventListener("click", closeModal);

function openModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
}
