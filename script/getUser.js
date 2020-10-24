// const url = "https://api-bloodbank.herokuapp.com/api";
const url = "http://localhost:5000/api";
const token = localStorage.getItem("userToken");
document.querySelector(".back").classList.add("backPop");
document.querySelector(".main").classList.add("spinner3");
console.log('token', token)

checkToken();


function getUser() {
    try {
        const basicAuth = btoa(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)
        var xhr = new XMLHttpRequest()
        xhr.open('GET', `${url}/user/getAllUser`, true)
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
        xhr.setRequestHeader('token', `Bearer ${token}`)
        xhr.setRequestHeader('authorization', `Basic ${basicAuth}`, )
        xhr.onload = function() {
            if (this.status === 200) {
                const users = JSON.parse(this.responseText)
                if (users.success === false && users.message === 'Unauthorized Access') {
                    showAlert(users.message, 'warning')
                    logOut()
                } else if (users.success === false) {
                    showAlert(users.message, 'warning')
                    document.querySelector(".table").style.display = 'none';
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                } else {
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
                }
            } else if (this.status !== 200) {
                const dataError = JSON.parse(this.responseText)
                showAlert(dataError, 'warning')
                console.log('dataError', dataError)
                console.log(`$statusText ${this.statusText}`)
                    // error.innerHTML = `${this.statusText}`
                document.querySelector(".table").style.display = 'none';
                document.querySelector(".main").classList.remove("spinner3");
                document.querySelector(".back").classList.remove("backPop");
            }
        }

        xhr.send()
    } catch (error) {
        showAlert('Something went wrong', 'warning')
    }
}

async function checkToken() {
    if (token) {
        getUser()
    } else {
        logOut()
    }
}

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


function showAlert(message, alertType) {
    const alertMessage = document.querySelector(".alertMessage");
    alertMessage.innerHTML = `<div class="alert alert-${alertType}">${message}</div>`
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}