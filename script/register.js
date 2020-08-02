const url = `http://localhost:5000`
const site_origin = `http://127.0.0.1:5500`;


const first_name = document.registerForm.first_name.value;
const last_name = document.registerForm.last_name.value;

// Getting gender value 
var myGender = document.getElementById("myGender").selectedIndex;
const genders = document.getElementsByTagName("option")[myGender].value;
const mobile = document.getElementById('mobile').value;
const age = document.getElementById('age').value;
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const date_of_birth = document.getElementById('date_of_birth').value;
const address = document.getElementById('address').value;
const city = document.getElementById('city').value;

// Getting state value
var state = document.getElementById("myState").selectedIndex;
const states = document.getElementById("myState").options;
let statee = states[state].text


function registerUser() {

    const zip_code = document.getElementById('zip_code').value;

    let formData = {
        first_name: first_name,
        last_name: last_name,
        genders: genders,
        mobile: mobile,
        age: age,
        email: email,
        password: password,
        date_of_birth: date_of_birth,
        address: address,
        city: city,
        statee: statee,
        zip_code: zip_code,
        clientBrowser: window.clientInformation.userAgent,
        clientVendor: window.clientInformation.vendor
    }
    console.log('formData', formData)
    if (formData.first_name == '') {
        alert('First name is empty')
    } else {
        console.log('formData', formData)
        fetch(`${url}/user/create-user`, {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json'
            },
            body: formData
        }).then(response => {
            return response.json()
        }).then(data => {
            console.log('Data', data)
                // if (data)
        })
    }
}

// Previous and NExt button
const previousBtn = document.getElementById('previousBtn')
const nextBtn = document.getElementById('nextBtn')
const submitBtn = document.getElementById('submitBtn')
const content = document.getElementById('content')
const step1 = document.getElementById('step1')
const step2 = document.getElementById('step2')
const step3 = document.getElementById('step3')
const bullets = [...document.querySelectorAll('.bullet')];
const myState = document.getElementById('myState')

const maxSteps = 3;
let currentStep = 1;

if (currentStep == 1) {
    step1.style.display = 'block'
    step2.style.display = 'none'
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
        step3.style.display = 'block'

    }
    previousBtn.disabled = false
    if (currentStep === maxSteps) {
        nextBtn.disabled = true
    }
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
        step3.style.display = 'none'

    } else if (currentStep == 2) {
        step1.style.display = 'none'
        step3.style.display = 'none'
        step2.style.display = 'block'
    } else if (currentStep == 3) {
        step1.style.display = 'none'
        step2.style.display = 'none'
        step3.style.display = 'block'
    } else if (currentStep == 4) {
        step1.style.display = 'none'
        step2.style.display = 'none'
        step3.style.display = 'none'
    }
    console.log(`currentStep is ${currentStep}`)
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
    data.data.map(state => {
        let states = state.state
        states.forEach(bl => {
            let group = bl.state
            let myOptions = document.createElement('option')
            myOptions.textContent = `${group}`;
            myOptions.id = 'my-state'
            myState.appendChild(myOptions)
        })
    })
})

gsap.from(".registerForm", { duration: 2.5, x: '-5000px', ease: "power3.out" });
gsap.from("#previousBtn", { duration: 2.5, x: '-10000px', ease: "power3.out", stagger: .2 });
gsap.from("#nextBtn", { duration: 3.5, x: '-1350px', ease: "power3.out", stagger: .4 });