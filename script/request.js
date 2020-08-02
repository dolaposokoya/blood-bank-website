const url = `http://localhost:5000`
const site_origin = `http://127.0.0.1:5500`;

// Check if token already exist
window.addEventListener("load", () => {
    let token = localStorage.getItem("userToken")
    if (!token) {
        console.log("Token", token);
        alert('Unauthorized access')
        window.location.assign("/");
    }
});

function logOut() {
    localStorage.removeItem("userToken");
    localStorage.removeItem("profileId");
    window.location.assign("/");
}

const previousBtn = document.getElementById('previousBtn')
const nextBtn = document.getElementById('nextBtn')
const submitBtn = document.getElementById('submitBtn')
const content = document.getElementById('content')
const step1 = document.getElementById('step1')
const step2 = document.getElementById('step2')
const step3 = document.getElementById('step3')
const step4 = document.getElementById('step4')
const bullets = [...document.querySelectorAll('.bullet')];
const myState = document.getElementById('myState')
const myBlood = document.getElementById('myBlood')

// Display Error for filed name
const p_name = document.getElementById('p_name')
const p_email = document.getElementById('p_email')
const p_mobile = document.getElementById('p_mobile')
const b_group = document.getElementById('b_group')
const h_name = document.getElementById('h_name')

const maxSteps = 4;
let currentStep = 1;

if (currentStep == 1) {
    step1.style.display = 'block'
    step2.style.display = 'none'
    step4.style.display = 'none'
    step3.style.display = 'none'
}

nextBtn.addEventListener('click', () => {
    bullets[currentStep - 1].classList.add('completed')
    currentStep++
    if (currentStep == 2) {
        step1.style.display = 'none'
        step2.style.display = 'block'
        step3.style.display = 'none'
    } else if (currentStep == 3) {
        step1.style.display = 'none'
        step2.style.display = 'none'
        step4.style.display = 'none'
        step3.style.display = 'block'

    } else if (currentStep == 4) {
        step1.style.display = 'none'
        step2.style.display = 'none'
        step3.style.display = 'none'
        step4.style.display = 'block'
    }
    previousBtn.disabled = false
    if (currentStep === maxSteps) {
        nextBtn.disabled = true
    }
    content.innerText = `Step Number ${currentStep}`
    console.log(`currentStep is ${currentStep}`)
})

previousBtn.addEventListener('click', () => {
    bullets[currentStep - 2].classList.remove('completed')
    currentStep--

    nextBtn.disabled = false
    if (currentStep === 1) {
        previousBtn.disabled = true
        step1.style.display = 'block'
        step2.style.display = 'none'
        step4.style.display = 'none'
        step3.style.display = 'none'

    } else if (currentStep == 2) {
        step1.style.display = 'none'
        step3.style.display = 'none'
        step4.style.display = 'none'
        step2.style.display = 'block'
    } else if (currentStep == 3) {
        step1.style.display = 'none'
        step2.style.display = 'none'
        step4.style.display = 'none'
        step3.style.display = 'block'
    } else if (currentStep == 4) {
        step1.style.display = 'none'
        step2.style.display = 'none'
        step3.style.display = 'none'
        step4.style.display = 'block'
    }
    content.innerText = `Step  ${currentStep}`
})



fetch(`${url}/request/blood-all-group`, {
    method: 'GET',
    headers: {
        "content-type": "application/json",
        accept: "application/json",
    },
}).then((response) => {
    return response.json()
}).then(data => {
    data.data.map(blood => {
        let states = blood.state
        states.forEach(bl => {
            let group = bl.state
            let myOptions = document.createElement('option')
            myOptions.textContent = `${group}`;
            myOptions.id = 'my-state'
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
})

function makeRequest() {
    // Process request field
    const patient_name = document.getElementById('patient_name').value;
    const patient_email = document.getElementById('patient_email').value;
    const patient_mobile = document.getElementById('patient_mobile').value;
    const date_needed = document.getElementById('date_needed').value;
    var blood_group = document.getElementById("myBlood").selectedIndex;
    const blood_groups = document.getElementsByTagName("option")[blood_group].value;
    const city = document.getElementById('city').value;
    const pincode = document.getElementById('pincode').value;
    var state = document.getElementById("myState").selectedIndex;
    const states = document.getElementById("myState").options;
    let statee = states[state].text
        // const states = document.getElementsByTagName("option")[state].value;
    const hospital_name = document.getElementById('hospital_name').value;
    const hospital_address = document.getElementById('hospital_address').value;
    const hospital_phone = document.getElementById('hospital_phone').value;
    const hospital_email = document.getElementById('hospital_email').value;
    let formData = {
        patient_name: patient_name,
        patient_email: patient_email,
        patient_mobile: patient_mobile,
        date_needed: date_needed,
        blood_group: blood_groups,
        city: city,
        pincode: pincode,
        state: statee,
        hospital_name: hospital_name,
        hospital_address: hospital_address,
        hospital_phone: hospital_phone,
        hospital_email: hospital_email,
    }
    let token = localStorage.getItem('userToken')
    if (formData.patient_name == '') {
        alert('Patient Name is empty')
    } else if (formData.patient_email == '') {
        alert('Patient Email is empty')
    } else if (formData.patient_mobile == '') {
        alert('Patient Mobile is empty')
    } else if (formData.blood_group == 'select blood group.....') {
        alert('Blood Group is empty')
    } else if (formData.hospital_name == '') {
        alert('Hospital Name is empty')
    } else if (formData.hospital_address == '') {
        alert('Hospital Address is empty')
    } else if (formData.city == '') {
        alert('City is empty')
    } else if (formData.state == 'select state.....') {
        alert('State is empty')
    } else if (formData.pincode == '') {
        alert('Pincode is empty')
    } else if (formData.hospital_email == '') {
        alert('Hospital Email is empty')
    } else if (formData.hospital_phone == '') {
        alert('Hospital Phone is empty')
    } else if (formData.date_needed == '') {
        alert('Date is empty')
    } else {
        fetch(`${url}/request/create-request`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': site_origin,
                authorization: `Bearer ${token}`,
                "content-type": "application/json",
                accept: "application/json",
            },
            body: JSON.stringify(formData)
        }).then(response => response.json()).then(data => {
            if (data.success == true) {
                alert(data.message)
            } else {
                window.location.assign("../pages/contactdonor.html");
                alert(data.message)

            }
        })
    }

}