const url = "http://localhost:5000";
let token = localStorage.getItem("userToken");

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
const bullets = [...document.querySelectorAll('.bullet')];

function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector("main");
    container.insertBefore(div, main);

    // Vanish in 2 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
}
const maxSteps = 2;
let currentStep = 1;

if (currentStep == 1) {
    step1.style.display = 'block'
    step2.style.display = 'none'
}

nextBtn.addEventListener('click', () => {
    bullets[currentStep - 1].classList.add('completed')
    currentStep++
    if (currentStep == 2) {
        step1.style.display = 'none'
        step2.style.display = 'block'
    }
    previousBtn.disabled = false
    if (currentStep === maxSteps) {
        nextBtn.disabled = true
            // nextBtn.style.cursor = 'not-allowed';
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
    } else if (currentStep == 2) {
        step1.style.display = 'none'
        step2.style.display = 'block'
    } else if (currentStep == 3) {
        step1.style.display = 'none'
        step2.style.display = 'none'
    } else if (currentStep == 4) {
        step1.style.display = 'none'
        step2.style.display = 'none'
    }
})

function makeReservation() {
    setTimeout(() => {
        const donor_name = document.getElementById("donor_name").value;
        const age = document.getElementById("age").value;
        const donor_mobile = document.getElementById("donor_mobile").value;
        const weight = document.getElementById("weight").value;
        const gender = document.getElementById("gender").value;
        const reservation_date = document.getElementById("reservation_date").value;
        document.querySelector(".back").classList.add("backPop");
        document.querySelector(".main").classList.add("spinner3");
        let formData = {
            donor_name: donor_name,
            age: age,
            donor_mobile: donor_mobile,
            weight: weight,
            gender: gender,
            reservation_date: reservation_date,
        };
        let data = JSON.stringify(formData);
        if (formData.donor_name == "") {
            document.querySelector(".main").classList.remove("spinner3");
            document.querySelector(".back").classList.remove("backPop");
            showAlert("Donor Name is empty", "warning");
        } else if (formData.age == "") {
            document.querySelector(".main").classList.remove("spinner3");
            document.querySelector(".back").classList.remove("backPop");
            showAlert("Age is empty", "warning");
        } else if (formData.donor_mobile == "") {
            document.querySelector(".main").classList.remove("spinner3");
            document.querySelector(".back").classList.remove("backPop");
            showAlert("Mobile is empty", "warning");
        } else if (formData.weight == "") {
            document.querySelector(".main").classList.remove("spinner3");
            document.querySelector(".back").classList.remove("backPop");
            showAlert("Weight is empty", "warning");
        } else if (formData.gender == "" || formData.gender == "Choose...") {
            document.querySelector(".main").classList.remove("spinner3");
            document.querySelector(".back").classList.remove("backPop");
            showAlert("Gender is empty", "warning");
        } else if (formData.reservation_date == "") {
            document.querySelector(".main").classList.remove("spinner3");
            document.querySelector(".back").classList.remove("backPop");
            showAlert("Date is empty", "warning");
        } else {
            console.log(formData)
            fetch(`${url}/reservation/create-reservation`, {
                    method: "POST",
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        accept: "application/json",
                    },
                    body: data,
                }).then((response) => {
                    if (!response) {
                        setTimeout(() => document.querySelector(".main").remove(), 10000)
                        console.log(response)
                        return response.json();
                    } else {
                        console.log(response)
                        return response.json();
                    }
                })
                .then((data) => {
                    console.log('Data', data)
                    if (data) {
                        if (data.success == false) {
                            document.querySelector(".main").classList.remove("spinner3");
                            document.querySelector(".back").classList.remove("backPop");
                            showAlert(data.message, "warning");
                        } else if (data.success == true) {
                            showAlert(data.message, "success");
                            document.querySelector(".main").classList.remove("spinner3");
                            document.querySelector(".back").classList.remove("backPop");
                            window.location.assign("../pages/contactdonor.html");
                        }
                    }
                });
        }
    }, 2000)
}