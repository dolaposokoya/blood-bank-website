const url = `https://api-bloodbank-v1.herokuapp.com/api`
    // const url = "http://localhost:5000/api";
const token = localStorage.getItem("userToken");
document.querySelector(".back").classList.add("backPop");
document.querySelector(".main").classList.add("spinner3");

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
            const users = JSON.parse(this.responseText)
            if (users.success === false && users.message === 'Unauthorized Access') {
                showAlert(users.message, 'warning')
                logOut()
            } else if (this.status === 200) {
                if (users.success === false) {
                    showAlert(users.message, 'warning')
                    document.querySelector(".table").style.display = 'none';
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                } else {
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                    users.data.docs.map((item, index) => {
                        // const list = document.querySelector("#user-list");
                        const row = document.querySelector(".dateRow");
                        // const row = document.createElement("tr");
                        row.innerHTML = `<td data-label="Name"><i class="fas fa-user"></i> ${item.first_name}</td>
          <td data-label="Email"> <i class="fas fa-venus-mars"></i> ${item.gender}</td>
          <td data-label="Blood Group"><i class="fas fa-tint"></i> ${item.blood_group}</td><td data-label="City"><i class="fas fa-map-marker"></i> ${item.city}</td><td data-label="Action"><button class="btn btn-outline-primary"  onClick="openModal()">contact</button></td>`;
                        // list.appendChild(row);
                    });
                    const pages = document.createElement("div");
                    const pageNumber = document.querySelector(".pageNumber");
                    pages.innerHTML = `<small class="totalPages">Number of pages ${users.data.totalPages}<small>`
                    pageNumber.appendChild(pages)
                }
            } else if (this.status !== 200) {
                const dataError = JSON.parse(this.responseText)
                showAlert('Something went wrong', 'warning')
                console.log('dataError', dataError)
                console.log(`$statusText ${this.statusText}`)
                document.querySelector(".table").style.display = 'none';
                document.querySelector(".main").classList.remove("spinner3");
                document.querySelector(".back").classList.remove("backPop");
            }
        }

        xhr.send()
    } catch (error) {
        showAlert('Something went wrong', 'warning')
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
    }
}


function filterUser(search) {
    try {
        $('#user-list').hide();
        const basicAuth = btoa(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)
        var xhr = new XMLHttpRequest()
        xhr.open('GET', `${url}/user/filterUser?search=${search}`, true)
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
        xhr.setRequestHeader('token', `Bearer ${token}`)
        xhr.setRequestHeader('authorization', `Basic ${basicAuth}`, )
        xhr.onload = function() {
            const users = JSON.parse(this.responseText)
            if (users.success === false && users.message === 'Unauthorized Access') {
                showAlert(users.message, 'warning')
                logOut()
            } else if (this.status === 200) {
                if (users.success === false) {
                    showAlert(users.message, 'warning')
                    document.querySelector(".table").style.display = 'none';
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                } else {
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                    console.log('users.data.docs', users.data.docs)
                    users.data.docs.map((item, index) => {
                        // const list = $("#search-list");
                        // const row = document.createElement("tr");
                        const row = $('.row');
                        row.innerHTML = `<td data-label="Name"><i class="fas fa-user"></i> ${item.first_name}</td>
          <td data-label="Email"> <i class="fas fa-venus-mars"></i> ${item.gender}</td>
          <td data-label="Blood Group"><i class="fas fa-tint"></i> ${item.blood_group}</td><td data-label="City"><i class="fas fa-map-marker"></i> ${item.city}</td><td data-label="Action"><button class="btn btn-outline-primary"  onClick="openModal()">contact</button></td>`;
                        // list.appendChild(row);
                    });
                    const totalPages = $('.totalPages')
                    totalPages.html = `Number of pages ${users.data.totalPages}`
                }
            } else if (this.status !== 200) {
                const dataError = JSON.parse(this.responseText)
                showAlert('Something went wrong', 'warning')
                console.log('dataError', dataError)
                console.log(`$statusText ${this.statusText}`)
                document.querySelector(".table").style.display = 'none';
                document.querySelector(".main").classList.remove("spinner3");
                document.querySelector(".back").classList.remove("backPop");
            }
        }
        xhr.send()
    } catch (error) {
        showAlert('Something went wrong', 'warning')
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
    }
}
$("#search").keyup(function() {
    const search = $('#search').val();
    $('#user-list').hide();
    console.log('searchg', search)
    filterUser(search)
    if (search === null || search === '') {
        getUser();
        $('#user-list').show();
        $('#search-list').hide();
    }
});

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


function showAlert(message, className, iconType) {
    const alertMessage = document.querySelector(".alertMessage");
    alertMessage.innerHTML = `<div class="alert alert-${className}" role="alert">
    <i class="fa fa-${iconType}" aria-hidden="true"></i>  ${message}
  </div>`
        // Vanish in 5 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 5000);
}