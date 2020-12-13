const env = `production`;
const apiEndpoint = env === 'development' ? `http://localhost:5000/api` : `https://api-bloodbank-v1.herokuapp.com/api`
const baseUrl = env === 'development' ? `http://localhost:5000/images/` : `https://api-bloodbank-v1.herokuapp.com/images/`
const basicAuth = btoa(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)
const token = localStorage.getItem("userToken");
const scrollUp = document.querySelector('.scrollUp')
const form = document.getElementById('userForm');
const gender = document.getElementById("myGender");
const mobile = document.getElementById('mobile');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');
const date_of_birth = document.getElementById('date_of_birth');
const blood_group = document.getElementById('userBlood');
const address = document.getElementById('address');
const zip_code = document.getElementById('zip_code');
const city = document.getElementById('city');
const myState = document.getElementById("userState");
console.log('my State0', myState)
const list = document.querySelector("#user-list");
const headers = {
    "content-type": "application/json",
    accept: "application/json",
    token: `Bearer ${token}`,
    authorization: `Basic ${basicAuth}`,
};
checkToken();
pageData();

async function pageData() {
    const response = await fetch(`${apiEndpoint}/bloodgroup/bloodAllGroup`, { headers: headers })
    const data = await response.json()
    data.data.map(state => {
        const statesData = state.state
        statesData.forEach(states => {
            let group = states.state
            let myOptions = document.createElement('option')
            myOptions.textContent = `${group}`;
            myOptions.classList.add("control");
            myOptions.id = 'my-state'
            myOptions.value = `${group}`
            myState.appendChild(myOptions)
        })
        state.bloodgroup.map(group => {
            let options = document.createElement('option')
            options.textContent = `${group.group}`;
            options.classList.add("control");
            options.id = 'my-group'
            options.value = `${group.group}`
            blood_group.appendChild(options)
        })
    })
}


date_of_birth.addEventListener('change', getAge);
function getAge() {
    let user_age = new Date().getFullYear() - new Date(this.value).getFullYear()
    age.value = user_age
}

/**
 * Get user from database
 */
function getUserData() {
    try {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', `${apiEndpoint}/user/getUserById`, true)
        xhr.setRequestHeader("content-type", "application/x-www-form-apiEndpointencoded")
        xhr.setRequestHeader('token', `Bearer ${token}`)
        xhr.setRequestHeader('authorization', `Basic ${basicAuth}`)
        xhr.onload = function () {
            const users = JSON.parse(this.responseText)
            if (users.success === false && users.message === 'Unauthorized Access') {
                showAlert(users.message, 'warning', "exclamation-triangle")
                logOut()
            } else {
                if (users.success === false) {
                    showAlert(users.message, 'warning', "exclamation-triangle")
                } else {
                    const userData = users.data
                    let date = new Date(userData.date_of_birth)
                    let user_age = new Date().getFullYear() - new Date(userData.date_of_birth).getFullYear()
                    let year = date.getFullYear()
                    let month = parseInt(date.getMonth()) + 1
                    month = month < 10 ? `0${month}` : `0${month}`;
                    let day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
                    const userDate = `${year}-${month}-${day}`
                    first_name.value = userData.first_name
                    last_name.value = userData.last_name
                    mobile.value = userData.mobile
                    gender.value = userData.gender
                    date_of_birth.value = userDate
                    age.value = user_age
                    email.value = userData.email
                    // password.value = userData.password
                    blood_group.value = userData.blood_group
                    address.value = userData.address
                    zip_code.value = userData.zip_code
                    city.value = userData.city
                    myState.value = userData.state
                    console.log('myState.value', myState.value)
                }
            }
        }

        xhr.send()
    } catch (error) {
        showAlert('Something went wrongdssss', 'warning', "exclamation-triangle")
    }
}


async function updateUser() {
    let formData = {}
    try {
        if (first_name.value === '' || first_name.value === null) {
            showAlert('First name is empty', 'warning', 'exclamation-triangle')
        } else if (last_name.value === '' || last_name.value === null) {
            showAlert('Last name is empty', 'warning', 'exclamation-triangle')
        } else if (email.value === '' || email.value === null) {
            showAlert('Email is empty', 'warning', 'exclamation-triangle')
        }
        // else if (password.value === '' || password.value === null || password.value.length < 8) {
        //     showAlert('Password must be longer than 8 characters', 'warning', 'exclamation-triangle')
        // } 
        else if (gender.value === '' || gender.value === null || gender.value === 'Choose...') {
            showAlert('Gender is empty', 'warning', 'exclamation-triangle')
        } else if (date_of_birth.value === '' || date_of_birth.value === null) {
            showAlert('Date of birth is empty', 'warning', 'exclamation-triangle')
        } else if (blood_group.value === '' || blood_group.value === null || blood_group.value === 'Choose...') {
            showAlert('Blood group is empty', 'warning', 'exclamation-triangle')
        } else if (age.value === '' || age.value === null) {
            showAlert('Age is empty', 'warning', 'exclamation-triangle')
        } else if (mobile.value === '' || mobile.value === null) {
            showAlert('Mobile is empty', 'warning', 'exclamation-triangle')
        } else if (address.value === '' || address.value === null) {
            showAlert('Address is empty', 'warning', 'exclamation-triangle')
        } else if (city.value === '' || city.value === null) {
            showAlert('City is empty', 'warning', 'exclamation-triangle')
        } else if (myState.value === '' || myState.value === null || myState.value === 'Choose...') {
            showAlert('State is empty', 'warning', 'exclamation-triangle')
        } else if (zip_code.value === '' || zip_code.value === null) {
            showAlert('zip code is empty', 'warning', 'exclamation-triangle')
        }
        else {
            formData = {
                first_name: first_name.value,
                last_name: last_name.value,
                gender: gender.value,
                mobile: mobile.value,
                email: email.value,
                // password: password.value,
                date_of_birth: date_of_birth.value,
                age: age.value,
                blood_group: blood_group.value,
                address: address.value,
                city: city.value,
                state: myState.value,
                zip_code: zip_code.value,
                clientBrowser: window.clientInformation.userAgent,
                clientVendor: window.clientInformation.vendor
            }
            const apiURL = `${apiEndpoint}/user/updateUser`
            const response = await fetch(apiURL, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (data.success === false && data.message === 'Unauthorized Access') {
                showAlert(data.message, 'warning', "exclamation-triangle")
                logOut()
            } else {
                if (data.success === false) {
                    showAlert(data.message, 'warning', "exclamation-triangle")
                } else if (data.status === 200 && data.success === true) {
                    showAlert(data.message, 'success', "check-circle")
                    getUserData()
                }
            }
        }

        xhr.send(JSON.stringify(formData))
    }
    catch (error) {

    }
}

// Check if token is present
async function checkToken() {
    if (token === undefined || token === null || token === '') {
        logOut()
    } else {
        getUserData();
    }
}

function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("profileId");
    document.querySelector('.logOut')
    window.location.assign("/");
}

function showAlert(message, className, iconType) {
    const alertMessage = document.querySelector(".alertMessage");
    alertMessage.innerHTML = `<div class="alert alert-${className}" role="alert">
    <i class="fa fa-${iconType}" aria-hidden="true"></i>  ${message}
  </div>`
    // Vanish in 5 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 4000);
}

/**
 * Scroll button
 */
window.onscroll = function () { scrollFunction() };

/**
 * Scroll button
 */
function scrollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        scrollUp.style.display = "block";
    } else {
        scrollUp.style.display = "none";
    }
}

/**
 * Scroll button
 */
function topButton() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0;
}

// Change between tabs
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

document.querySelector('.icon').addEventListener('click', () => {
    document.querySelector('.mainMenu').classList.toggle('show')
})