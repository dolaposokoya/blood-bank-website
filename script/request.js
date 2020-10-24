// const url = `http://localhost:5000/api`
const url = `https://api-bloodbank-v1.herokuapp.com`
const site_origin = `http://127.0.0.1:5500`;
const token = localStorage.getItem("userToken")


window.addEventListener("load", () => {
    if (!token) {
        showAlert('Unauthorized access', 'warning')
        window.location.assign("/");
    }
});

function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("profileId");
    window.location.assign("/");
}

const submitBtn = document.getElementById('submitBtn')
const myState = document.getElementById('myState')
const myBlood = document.getElementById('myBlood')




const basicAuth = btoa(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)
async function makeRequest() {
    // Process request field
    const patient_name = document.getElementById('patient_name');
    const patient_email = document.getElementById('patient_email');
    const patient_mobile = document.getElementById('patient_mobile');
    const date_needed = document.getElementById('date_needed');
    const blood_group = document.getElementById("myBlood");
    const city = document.getElementById('city');
    const pincode = document.getElementById('pincode');
    const state = document.getElementById("myState");
    const hospital_name = document.getElementById('hospital_name');
    const hospital_address = document.getElementById('hospital_address');
    const hospital_phone = document.getElementById('hospital_phone');
    const hospital_email = document.getElementById('hospital_email');
    let formData = {
        patient_name: patient_name,
        patient_email: patient_email,
        patient_mobile: patient_mobile,
        date_needed: date_needed,
        blood_group: blood_group,
        city: city,
        pincode: pincode,
        state: state,
        hospital_name: hospital_name,
        hospital_address: hospital_address,
        hospital_phone: hospital_phone,
        hospital_email: hospital_email,
    }
    if (patient_name.value == '') {
        showAlert('Patient Name is empty', 'warning', 'exclamation-triangle')
    } else if (patient_email.value == '') {
        showAlert('Patient Email is empty', 'warning', 'exclamation-triangle')
    } else if (patient_mobile.value == '') {
        showAlert('Patient Mobile is empty', 'warning', 'exclamation-triangle')
    } else if (blood_group.value == 'Choose...') {
        showAlert('Blood Group is empty', 'warning', 'exclamation-triangle')
    } else if (hospital_name.value == '') {
        showAlert('Hospital Name is empty', 'warning', 'exclamation-triangle')
    } else if (hospital_address.value == '') {
        showAlert('Hospital Address is empty', 'warning', 'exclamation-triangle')
    } else if (city.value == '') {
        showAlert('City is empty', 'warning', 'exclamation-triangle')
    } else if (state.value == 'Choose...') {
        showAlert('State is empty', 'warning', 'exclamation-triangle')
    } else if (pincode.value == '') {
        showAlert('Pincode is empty', 'warning', 'exclamation-triangle')
    } else if (hospital_email.value == '') {
        showAlert('Hospital Email is empty', 'warning', 'exclamation-triangle')
    } else if (hospital_phone.value == '') {
        showAlert('Hospital Phone is empty', 'warning', 'exclamation-triangle')
    } else if (date_needed.value == '') {
        showAlert('Date is empty', 'warning', 'exclamation-triangle')
    } else {
        try {
            console.log('formData', formData)
            const headers = {
                'Access-Control-Allow-Origin': site_origin,
                'token': `Bearer ${token}`,
                "content-type": "application/json",
                accept: "application/json",
            }
            const requestUrl = `${url}/request/createRequest`;
            const requestHeaders = {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(formData)
            }
            const response = await fetch(requestUrl, requestHeaders)
            const data = await response.json()
            if (data.success == true) {
                showAlert(data.message, 'success', "check-circle")
                setTimeout(() => myFunction(), 3500)
            } else {
                showAlert(data.message, 'warning', 'exclamation-triangle')
            }
        } catch (error) {
            showAlert('Something went wrong!', 'warning', 'exclamation-triangle')
        }
    }

}

// clear form fields
function myFunction() {
    document.getElementById("reservationForm").reset();
}

// Fetch Some Data
async function fetchData() {
    const headers = {
        "content-type": "application/json",
        accept: "application/json",
        'authorization': `Basic ${basicAuth}`,
    };
    const request = `${url}/bloodgroup/bloodAllGroup`
    const response = await fetch(request, { headers: headers, })
    const data = await response.json()
    data.data.map(blood => {
        let states = blood.state
        states.forEach(bl => {
            let group = bl.state
            let myOptions = document.createElement('option')
            myOptions.textContent = `${group}`;
            myOptions.id = 'my-state'
            myOptions.classList.add("control");
            myState.appendChild(myOptions)
        })
        let group = blood.bloodgroup
        group.forEach(bl => {
            let group = bl.group
            let myOptions = document.createElement('option')
            myOptions.textContent = `${group}`;
            myBlood.appendChild(myOptions)
            myOptions.id = 'my-group'
            myOptions.classList.add('blood_group')
        })
    })
}

// Show Alert Function
function showAlert(message, className, iconType) {
    const alertMessage = document.querySelector(".alertMessage");
    alertMessage.innerHTML = `<div class="alert alert-${className}" role="alert">
    <i class="fa fa-${iconType}" aria-hidden="true"></i>  ${message}
  </div>`
        // Vanish in 5 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 5000);
}

fetchData()