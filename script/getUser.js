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
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        users.forEach((item, index) => {
          const list = document.querySelector("#user-list");
          const row = document.createElement("tr");
          row.innerHTML = `<td data-label="Name"><i class="fas fa-user"></i> ${item.first_name}</td>
      <td data-label="Email"> <i class="fas fa-venus-mars"></i> ${item.gender}</td>
      <td data-label="Blood Group"><i class="fas fa-tint"></i> ${item.blood_group}</td><td data-label="City"><i class="fas fa-map-marker"></i> ${item.city}</td><td data-label="Action"><button class="btn btn-primary btn-sm"  onClick="openModal()">contact</button></td>`;
          list.appendChild(row);
        });

        //   users.forEach((item, index) => {
        //     const list = document.querySelector(".conatiner");
        //     const row = document.createElement("div");
        //     row.setAttribute("class", "box");
        //     row.innerHTML = `<p><i class="fas fa-user"></i> ${item.first_name} ${item.last_name}</p>
        //     <hr>
        // <p><i class="fas fa-envelope"></i> ${item.email}</p> <hr>
        // <p><i class="fas fa-tint"></i> ${item.blood_group}</p> <hr>
        // <p><i class="fa fa-map-marker"></i> ${item.city}</p> <img class="saveImage" src="../images/banner.png" alt="image" style="float: right"/> <hr>
        // <button class="btn btn-primary btn-sm" style="cursor: pointer" id="tableContact" onClick="openModal()">contact</button>`;
        //     list.appendChild(row);
        //   });
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
      });
  } else {
    window.location.assign("/");
  }
}

checkToken();

function logOut() {
  localStorage.removeItem("userToken");
  localStorage.removeItem("profileId");
  checkToken();
}

var modal = document.getElementById("simpleModal");
var openBtn = document.getElementById("tableContact");
closeBtn.addEventListener("click", closeModal);

function openModal() {
  modal.style.display = "block";
}
function closeModal() {
  modal.style.display = "none";
}
