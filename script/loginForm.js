const url = "http://localhost:5000/user/login-user";
// const url = "https://api-bloodbank.herokuapp.com/user/login-user";
let token = localStorage.getItem("userToken");

function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector("main");
  container.insertBefore(div, main);

  // Vanish in 3 seconds
  setTimeout(() => document.querySelector(".alert").remove(), 2500);
}

// Check if token already exist
window.addEventListener("load", () => {
  let token = localStorage.getItem("userToken")
  if (token) {
    console.log("Token", token);
    window.location.assign("../pages/requestblood.html");
  }
});


function loginForm() {
  setTimeout(() => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    document.querySelector(".back").classList.add("backPop");
    document.querySelector(".main").classList.add("spinner3");
    let formData = {
      email: email,
      password: password,
    };
    let data = JSON.stringify(formData);
    if (formData.email == "") {
      document.querySelector(".main").classList.remove("spinner3");
      document.querySelector(".back").classList.remove("backPop");
      showAlert("Email is empty", "warning");
    } else if (formData.password == "") {
      document.querySelector(".main").classList.remove("spinner3");
      document.querySelector(".back").classList.remove("backPop");
      showAlert("Password is empty", "warning");
    } else {
      fetch(url, {
        method: "POST",
        headers: {
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
              // alert(data.message);
            } else if (data.success == true) {
              showAlert(data.message, "success");
              document.querySelector(".main").classList.remove("spinner3");
              document.querySelector(".back").classList.remove("backPop");
              localStorage.setItem("userToken", data.token);
              localStorage.setItem("profileId", data.profile_id);
              window.location.assign("../pages/contactdonor.html");
            }
          }
        });
    }
  }, 2000)
}
