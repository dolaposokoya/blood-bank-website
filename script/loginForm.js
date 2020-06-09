// const url = "http://localhost:5000/user/login-user";
const url = "https://api-bloodbank.herokuapp.com/user/login-user";

function submitForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let formData = {
    email: email,
    password: password,
  };
  let data = JSON.stringify(formData);
  if (formData.email == "") {
    alert("Email is empty");
  } else if (formData.password == "") {
    alert("Password is empty");
  } else {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: data,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.success == false) {
          alert(data.message);
        } else if (data.success == true) {
          alert(data.message);
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("profileId", data.profile_id);
          window.location.assign("../views/pages/about.html");
        }
      });
  }
}
