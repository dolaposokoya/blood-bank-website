// const url = "https://api-bloodbank.herokuapp.com/user/get-all-user";
const url = "http://localhost:5000";
let token = localStorage.getItem("userToken");
document.querySelector(".back").classList.add("backPop");
document.querySelector(".main").classList.add("spinner3");
const error = document.querySelector(".displayError");

function checkToken() {
    if (localStorage.getItem("userToken")) {
        var xhr = new XMLHttpRequest()
        headers = {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
            accept: "application/json",
        };
        xhr.open('GET', `${url}/user/get-all-user`, true)
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
        xhr.setRequestHeader('authorization', `Bearer ${token}`, )
        xhr.onload = function() {
            if (this.status == 200) {
                users = JSON.parse(this.responseText)
                document.querySelector(".main").classList.remove("spinner3");
                document.querySelector(".back").classList.remove("backPop");
                users.data.forEach((item, index) => {
                    const list = document.querySelector("#user-list");
                    const row = document.createElement("tr");
                    row.innerHTML = `<td data-label="Name"><i class="fas fa-user"></i> ${item.first_name}</td>
      <td data-label="Email"> <i class="fas fa-venus-mars"></i> ${item.gender}</td>
      <td data-label="Blood Group"><i class="fas fa-tint"></i> ${item.blood_group}</td><td data-label="City"><i class="fas fa-map-marker"></i> ${item.city}</td><td data-label="Action" class="action"><button class="btn btn-primary btn-lg contact"  onClick="openModal()">contact</button></td>`;
                    list.appendChild(row);
                });
            } else if (this.status != 200) {
                error.style.display = 'block'
                error.innerHTML = `Error ${this.statusText}`
                document.querySelector(".table").style.display = 'none';
                document.querySelector(".main").classList.remove("spinner3");
                document.querySelector(".back").classList.remove("backPop");
            }
        }

        xhr.send()
        console.log('XHR', xhr)
    } else {
        window.location.assign("/");
    }
}

checkToken();


function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("profileId");
    window.location.assign("/");
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