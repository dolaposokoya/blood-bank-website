// const url = `http://localhost:5000/api`
const url = `https://api-bloodbank-v1.herokuapp.com/api`
const site_origin = `http://127.0.0.1:5500`;
const form = document.getElementById('userForm');
const gender = document.getElementById("myGender");
const mobile = document.getElementById('mobile');
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const age = document.getElementById('age');
const email = document.getElementById('email');
const password = document.getElementById('password');
const date_of_birth = document.getElementById('date_of_birth');
const blood_group = document.getElementById('blood_group');
const address = document.getElementById('address');
const zip_code = document.getElementById('zip_code');
const city = document.getElementById('city');
const state = document.getElementById("state");


const basicAuth = btoa(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)
form.addEventListener('submit', async(event) => {
    event.preventDefault();
    let formData = {
        first_name: first_name.value,
        last_name: last_name.value,
        gender: gender.value,
        mobile: mobile.value,
        age: age.value,
        email: email.value,
        password: password.value,
        date_of_birth: date_of_birth.value,
        blood_group: blood_group.value,
        address: address.value,
        city: city.value,
        state: state.value,
        zip_code: zip_code.value,
        clientBrowser: window.clientInformation.userAgent,
        clientVendor: window.clientInformation.vendor
    }
    if (first_name.value === '' || first_name.value === null) {
        showAlert('First name is empty', 'warning', 'exclamation-triangle')
    } else if (last_name.value === '' || last_name.value === null) {
        showAlert('Last name is empty', 'warning', 'exclamation-triangle')
    } else if (email.value === '' || email.value === null) {
        showAlert('Email is empty', 'warning', 'exclamation-triangle')
    } else if (password.value === '' || password.value === null || password.value.length < 8) {
        showAlert('Password must be longer than 8 characters', 'warning', 'exclamation-triangle')
    } else if (gender.value === '' || gender.value === null || gender.value === 'Choose...') {
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
    } else if (state.value === '' || state.value === null || state.value === 'Choose...') {
        showAlert('State is empty', 'warning', 'exclamation-triangle')
    } else if (zip_code.value === '' || zip_code.value === null) {
        showAlert('zip code is empty', 'warning', 'exclamation-triangle')
    } else {
        try {
            const headers = {
                "authorization": `Basic ${basicAuth}`,
                'Access-Control-Allow-Origin': site_origin,
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
            const apiURL = `${url}/user/createUser`;
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            if (!response) {
                showAlert('No response', 'warning', 'exclamation-triangle')
            } else {
                if (data.success === false) {
                    showAlert(data.message, 'warning', 'exclamation-triangle')
                } else if (data.success === true) {
                    showAlert(data.message, 'success', "check-circle")
                    setTimeout(() => myFunction(), 4000)
                    setTimeout(() => window.location.assign("/"), 4500)
                }
            }
        } catch (error) {
            showAlert('Something went wrong!', 'warning', 'exclamation-triangle')
        }
    }
})

const header = {
    "authorization": `Basic ${basicAuth}`,
    "Content-type": "application/json",
    "Accept": "application/json",
}

async function pageData() {
    const response = await fetch(`${url}/bloodgroup/bloodAllGroup`, { headers: header })
    const data = await response.json()

    data.data.map(state => {
        const myState = document.getElementById('state')
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
            console.log('group', group.group)
            let options = document.createElement('option')
            options.textContent = `${group.group}`;
            options.classList.add("control");
            options.id = 'my-group'
            options.value = `${group.group}`
            blood_group.appendChild(options)
        })
    })
}


// clear form fields
function myFunction() {
    document.getElementById("userForm").reset();
}
// Form Animation
gsap.from("#userForm", { duration: 2.5, x: '-5000px', ease: "power3.out" });


// Show Alert Function
function showAlert(message, className, iconType) {
    const alertMessage = document.querySelector(".alertMessage");
    alertMessage.innerHTML = `<div class="alert alert-${className}" role="alert">
    <i class="fa fa-${iconType}" aria-hidden="true"></i>  ${message}
  </div>`
        // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 5000);
}

pageData()