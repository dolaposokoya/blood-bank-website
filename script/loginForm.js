// const url = "http://localhost:5000/api";
const url = `https://api-bloodbank-v1.herokuapp.com/api`
const token = localStorage.getItem("userToken");
gsap.from(".form-card", { duration: 2.5, x: '-4500px', ease: "power4.out" });


function showAlert(message, className, iconType) {
    const alertMessage = document.querySelector(".alertMessage");
    alertMessage.innerHTML = `<div class="alert alert-${className}" role="alert">
    <i class="fa fa-${iconType}" aria-hidden="true"></i>  ${message}
  </div>`
        // Vanish in 5 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 5000);
}



// Check if token already exist
window.addEventListener("load", () => {
    const token = localStorage.getItem("userToken")
    console.log(localStorage.getItem("userToken"))
    if (token === undefined || token === null || token === '') {
        localStorage.removeItem("userToken");
        localStorage.removeItem("profileId");
    }
});

const basicAuth = btoa(`bloodbank-api@gmail.com:e2b1b93e3082485a308992c8c30e06c1`)

async function loginForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    document.querySelector(".back").classList.add("backPop");
    document.querySelector(".main").classList.add("spinner3");
    let formData = {
        email: email,
        password: password,
    };
    if (formData.email === "" || formData.email === null) {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("Email is empty", "warning", "exclamation-triangle");
    } else if (formData.password == "") {
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
        showAlert("Password is empty", "warning", "exclamation-triangle");
    } else {
        try {
            const apiURl = `${url}/user/loginUser`
            const headers = {
                "authorization": `Basic ${basicAuth}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
            const body = JSON.stringify(formData)
            const response = await fetch(apiURl, { method: "POST", headers: headers, body: body });
            const data = await response.json()
            if (data) {
                if (data.success == false) {
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                    showAlert(data.message, "warning", "exclamation-triangle");
                } else if (data.success == true) {
                    showAlert(data.message, "success", "check-circle");
                    document.querySelector(".main").classList.remove("spinner3");
                    document.querySelector(".back").classList.remove("backPop");
                    localStorage.setItem("userToken", data.data.token);
                    localStorage.setItem("profileId", data.data.profile_id);
                    window.location.assign("../pages/contactdonor.html");
                }
            } else {
                showAlert('Unable to load data', "warning", "exclamation-triangle");
                document.querySelector(".main").classList.remove("spinner3");
                document.querySelector(".back").classList.remove("backPop");
            }
        } catch (error) {
            showAlert('Something went wrong!', 'warning', "exclamation-triangle");
            document.querySelector(".main").classList.remove("spinner3");
            document.querySelector(".back").classList.remove("backPop");
        }
    }
}