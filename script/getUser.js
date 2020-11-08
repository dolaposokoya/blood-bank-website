const url = `https://api-bloodbank-v1.herokuapp.com/api`;
// const url = "http://localhost:5000/api"
const basicAuth = btoa(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)
const token = localStorage.getItem("userToken");
document.querySelector(".back").classList.add("backPop");
document.querySelector(".main").classList.add("spinner3");
document.querySelector(".grid-main").style.display = 'none';
const list = document.querySelector("#user-list");
checkToken();


const state = {
    data: '',
    page: 1,
    rows: 5,
    window: 5
}


/**
 * Get user from database
 */
function getUser() {
    try {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', `${url}/user/getAllUser`, true)
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
        xhr.setRequestHeader('token', `Bearer ${token}`)
        xhr.setRequestHeader('authorization', `Basic ${basicAuth}`, )
        xhr.onload = function() {
            const users = JSON.parse(this.responseText)
            if (users.success === false && users.message === 'Unauthorized Access') {
                showAlert(users.message, 'warning', "exclamation-triangle")
                logOut()
            } else {
                if (users.success === false) {
                    showAlert(users.message, 'warning', "exclamation-triangle")
                    document.querySelector(".table").style.display = 'none';
                    document.querySelector(".grid-main").style.display = 'block';
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                } else {
                    document.querySelector(".grid-main").style.display = 'block';
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                    state.data = users.data
                    displayData()
                }
            }
        }

        xhr.send()
    } catch (error) {
        showAlert('Something went wrongdssss', 'warning', "exclamation-triangle")
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
    }
}

/**
 * 
 * @param {filter user by search parameters} search
 */
function filterUser(search) {
    try {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', `${url}/user/filterUser?search=${search}`, true)
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
        xhr.setRequestHeader('token', `Bearer ${token}`)
        xhr.setRequestHeader('authorization', `Basic ${basicAuth}`, )
        xhr.onload = function() {
            const users = JSON.parse(this.responseText)
            if (users.success === false && users.message === 'Unauthorized Access') {
                showAlert(users.message, 'warning', "exclamation-triangle")
                logOut()
            } else if (this.status === 200) {
                if (users.success === false) {
                    showAlert(users.message, 'warning', "exclamation-triangle")
                    document.querySelector(".table").style.display = 'none';
                    document.querySelector(".grid-main").style.display = 'block';
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                } else {
                    document.querySelector(".grid-main").style.display = 'block';
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                    state.data = users.data.docs
                    displayData()
                }
            } else if (this.status !== 200) {
                const dataError = JSON.parse(this.responseText)
                showAlert('Something went wrong', 'warning', "exclamation-triangle")
                document.querySelector(".table").style.display = 'none';
                document.querySelector(".grid-main").style.display = 'block';
                document.querySelector(".main").classList.remove("spinner3");
                document.querySelector(".back").classList.remove("backPop");
            }
        }
        xhr.send()
    } catch (error) {
        showAlert('Something went wrong', 'warning', "exclamation-triangle")
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
    }
}

// Trim the date to be displayed page by page
function pagination(data, page, rows) {
    let trimStart = (page - 1) * rows
    let trimEnd = trimStart + rows
    let trimmedData = data.slice(trimStart, trimEnd)
    let pages = Math.ceil(data.length / rows)
    return {
        data: trimmedData,
        pages: pages
    }
}


/**
 * 
 * @param {data to be displayed} data 
 * @param {number of pages} totalPage 
 * @param {next page } hasNextPage 
 * @param {previous page} hasPrevPage 
 * Function to populate table with data
 */
function displayData() {
    $('#user-list').empty()
    const newData = pagination(state.data, state.page, state.rows)

    newData.data.map((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td data-label="Name"><i class="fas fa-user"></i> ${item.first_name}</td>
<td data-label="Gender"> <i class="fas fa-venus-mars"></i> ${item.gender}</td>
<td data-label="Blood Group"><i class="fas fa-tint"></i> ${item.blood_group}</td><td data-label="City"><i class="fas fa-map-marker"></i> ${item.city}</td><td data-label="View Deatils"><button class="contact-btn btn-outline-primary" value=${item._id} >Contact</button></td>`;
        list.appendChild(row);
    });
    paginationButtons(newData.pages)
}

const closeBtn = document.getElementById('closeBtn')
const close = document.getElementById('close')
const modal = document.getElementById('simpleModal')
closeBtn.addEventListener("click", closeModal);
close.addEventListener("click", closeModal);

// Get user
$(document).on('click', '.contact-btn', function() {
    try {
        const item = $(this).val();
        var xhr = new XMLHttpRequest()
        xhr.open('GET', `${url}/user/getUserById?id=${item}`, true)
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
        xhr.setRequestHeader('token', `Bearer ${token}`)
        xhr.setRequestHeader('authorization', `Basic ${basicAuth}`)
        xhr.onload = function() {
            const users = JSON.parse(this.responseText)
            if (users.success === false && users.message === 'Unauthorized Access') {
                showAlert(users.message, 'warning', "exclamation-triangle")
                logOut()
            } else {
                if (users.success === false) {
                    showAlert(users.message, 'warning', "exclamation-triangle")
                } else {
                    $(".email").html(`<i class="fas fa-envelope ml-3"></i> ${users.data.email}`)
                    $(".state").html(`<i class="far fa-compass ml-3"></i> ${users.data.state}`)
                    $(".city").html(` <i class="fas fa-map-marker ml-3"></i> ${users.data.city}`)
                    $("#simpleModal").show();
                }
            }
        }
        xhr.send()
    } catch (error) {
        showAlert('Something went wrong', 'warning', "exclamation-triangle")
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
    }
});

// Close modal
function closeModal() {
    modal.style.display = "none";
    document.querySelector(".email").innerHTML = ''
    document.querySelector(".blood_group").innerHTML = ''
    document.querySelector(".state").innerHTML = ''
    document.querySelector(".city").innerHTML = ''
}
// Add page button
function paginationButtons(pages) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = ''
    let maxLeft = (state.page - Math.floor(state.window / 2))
    let maxRight = (state.page + Math.floor(state.window / 2))
    if (maxLeft <= 1) {
        maxLeft = 1;
        maxRight = state.window
    }
    if (maxRight >= pages) {
        maxLeft = pages - (state.window - 1);
        maxRight = pages

        if (maxLeft <= 1) {
            maxLeft = 1
        }
    }

    for (let page = maxLeft; page <= maxRight; page++) {
        const button = document.createElement("div");
        button.classList.add('"page-item')
        button.innerHTML = `<button class="btn page page-link mr-1"  value=${parseInt(page)}>${parseInt(page)}</button>`
        pagination.appendChild(button)
    }
    if (state.page !== 1) {
        const button = document.createElement("div");
        button.innerHTML = `<button class="btn page page-link mr-1"  value=${parseInt(1)}>&#171 first</button>`
        pagination.appendChild(button)
    }

    if (state.page !== pages) {
        const button = document.createElement("div");
        button.innerHTML = `<button class="btn page page-link mr-1" value=${parseInt(pages)}>last &#187</button>`
        pagination.appendChild(button)
    }
    $('.page').on('click', function() {
        $('#user-list').empty()
        state.page = Number($(this).val());
        displayData();
    })
}

// filter user
$("#search").on('keyup', () => {
    const search = $('#search').val();
    filterUser(search)
    if (search === null || search === '') {
        getUser();
    }
});

// Check if token is present
async function checkToken() {
    if (token === undefined || token === null || token === '') {
        logOut()
    } else {
        getUser();
    }
}

function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("profileId");
    window.location.assign("/");
}

function showAlert(message, className, iconType) {
    const alertMessage = document.querySelector(".alertMessage");
    alertMessage.innerHTML = `<div class="alert alert-${className}" role="alert">
    <i class="fa fa-${iconType}" aria-hidden="true"></i>  ${message}
  </div>`
        // Vanish in 5 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 5000);
}