// const logout = document.getElementById("logout");
// logout.style.display = "none"
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

// Process request field
const patient_name = document.getElementById('patient_name').value;
const patient_email = document.getElementById('patient_email').value;
const patient_mobile = document.getElementById('patient_mobile').value;
const date_needed = document.getElementById('date_needed').value;
const blood_group = document.getElementById('blood_group')
const city = document.getElementById('city').value;
const pincode = document.getElementById('pincode').value;
const state = document.getElementById('state')
const hospital_name = document.getElementById('hospital_name').value;
const hospital_address = document.getElementById('hospital_address').value;
const hospital_phone = document.getElementById('hospital_phone').value;
const hospital_email = document.getElementById('hospital_email').value;



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
    }
    else if (currentStep == 3) {
        step1.style.display = 'none'
        step2.style.display = 'none'
        step4.style.display = 'none'
        step3.style.display = 'block'

    }
    else if (currentStep == 4) {
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

    }
    else if (currentStep == 2) {
        step1.style.display = 'none'
        step3.style.display = 'none'
        step4.style.display = 'none'
        step2.style.display = 'block'
    }
    else if (currentStep == 3) {
        step1.style.display = 'none'
        step2.style.display = 'none'
        step4.style.display = 'none'
        step3.style.display = 'block'
    }
    else if (currentStep == 4) {
        step1.style.display = 'none'
        step2.style.display = 'none'
        step3.style.display = 'none'
        step4.style.display = 'block'
    }
    content.innerText = `Step  ${currentStep}`
})


fetch('http://localhost:5000/request/blood-all-group', {
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
            myState.appendChild(myOptions)
        })
        let group = blood.bloodgroup
        group.forEach(bl => {
            let group = bl.group
            let myOptions = document.createElement('option')
            myOptions.textContent = `${group}`;
            myBlood.appendChild(myOptions)
            myOptions.classList.add('blood_group')
        })
    })
})

function makeRequest(e) {
    e.preventDefault()
}