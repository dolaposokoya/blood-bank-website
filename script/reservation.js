const env = `production`;
const url = env === 'development' ? `http://localhost:5000/api` : `https://api-bloodbank-v1.herokuapp.com/api`
const token = localStorage.getItem("userToken");
const baseUrl = env === 'development' ? `http://localhost:5000/images/` : `https://api-bloodbank-v1.herokuapp.com/images/`
const image = localStorage.getItem('image')
const profileImage = document.querySelector('.profileImage');
profileImage.src = image ? `${baseUrl}${image}` : '../images/image.png'

function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("profileId");
    window.location.assign("/");
}
const basicAuth = btoa(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)
const myState = document.getElementById('myState')
const submitBtn = document.getElementById('submitBtn')
const content = document.getElementById('content')

function showAlert(message, className, iconType) {
    const alertMessage = document.querySelector(".alertMessage");
    alertMessage.innerHTML = `<div class="alert alert-${className}" role="alert">
    <i class="fa fa-${iconType}" aria-hidden="true"></i>  ${message}
  </div>`
    // Vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 4000);
}



async function makeReservation() {
    const donor_name = document.getElementById("donor_name").value;
    const age = document.getElementById("age").value;
    const donor_mobile = document.getElementById("donor_mobile").value;
    const weight = document.getElementById("weight").value;
    const gender = document.getElementById("gender").value;
    const reservation_date = document.getElementById("reservation_date").value;
    const hospital_name = document.getElementById("hospital_name").value;
    const hospital_address = document.getElementById("hospital_address").value;
    const city = document.getElementById("city").value;
    const myState = document.getElementById("myState").value;
    const pincode = document.getElementById("pincode").value;
    document.querySelector(".back").classList.add("backPop");
    document.querySelector(".main").classList.add("spinner3");
    let formData = {
        donor_name: donor_name,
        age: age,
        donor_mobile: donor_mobile,
        weight: weight,
        gender: gender,
        reservation_date: reservation_date,
        hospital_name: hospital_name,
        hospital_address: hospital_address,
        city: city,
        myState: myState,
        pincode: pincode
    };
    if (formData.donor_name === "" || formData.donor_name === null) {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("Donor Name is empty", "warning", "exclamation-triangle");
    } else if (formData.donor_mobile === "" || formData.donor_mobile === null) {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("Mobile is empty", "warning", "exclamation-triangle");
    } else if (formData.age === "" || formData.age === null) {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("Age is empty", "warning", "exclamation-triangle");
    } else if (formData.weight === "" || formData.weight === null) {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("Weight is empty", "warning", "exclamation-triangle");
    } else if (formData.gender === "" || formData.gender === "Choose...") {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("Gender is empty", "warning", "exclamation-triangle");
    } else if (formData.reservation_date === "" || formData.reservation_date === null) {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("Date is empty", "warning", "exclamation-triangle");
    } else if (formData.hospital_name === "" || formData.hospital_name === null) {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("Hospital name is empty", "warning", "exclamation-triangle");
    } else if (formData.hospital_address === "" || formData.hospital_address === null) {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("Hospital address is empty", "warning", "exclamation-triangle");
    } else if (formData.city == "" || formData.gender == "Choose...") {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("City is empty", "warning", "exclamation-triangle");
    } else if (formData.myState === "" || formData.myState === "Choose...") {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("State is empty", "warning", "exclamation-triangle");
    } else if (formData.pincode === "" || formData.myState === null) {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("Pin code is empty", "warning", "exclamation-triangle");
    } else {
        try {
            const headers = {
                token: `Bearer ${token}`,
                "Content-Type": "application/json",
                accept: "application/json",
            }
            const response = await fetch(`${url}/reservation/createReservation`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(formData),
            })
            if (!response) {
                document.querySelector(".main").classList.remove("spinner3");
                document.querySelector(".back").classList.remove("backPop");
                return response.json();
            } else {
                const data = await response.json();
                if (data) {
                    if (data.success === false) {
                        document.querySelector(".main").classList.remove("spinner3");
                        document.querySelector(".back").classList.remove("backPop");
                        showAlert(data.message, "warning", "exclamation-triangle");
                    } else if (data.success === true) {
                        document.querySelector(".main").classList.remove("spinner3");
                        document.querySelector(".back").classList.remove("backPop");
                        showAlert(data.message, "success", "check-circle")
                        setTimeout(() => myFunction(), 3500)
                    }
                } else {
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                    showAlert('No response', "warning", "exclamation-triangle");
                }
            }
        } catch (error) {
            document.querySelector(".main").classList.remove("spinner3");
            document.querySelector(".back").classList.remove("backPop");
            showAlert('Something went wrong', "warning", "exclamation-triangle");
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
            myState.appendChild(myOptions)
        })
    })
}
fetchData()