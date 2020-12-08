const env = `production`;
const profileLinks = document.querySelector(".profile-links");
const baseUrl = env === 'development' ? `http://localhost:5000/images/` : `https://api-bloodbank-v1.herokuapp.com/images/`
const table = document.querySelector(".table");
const scrollUp = document.querySelector('.scrollUp')
const image = localStorage.getItem('image')
const profileImage = document.querySelector('.profileImage');
profileImage.src = image ? `${baseUrl}${image}` : '../images/image.png'
document.querySelector('.icon').addEventListener('click', () => {
    document.querySelector('.mainMenu').classList.toggle('show')
})

function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function userProfile() {
    window.location.assign('../user/profile.html')
}
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        scrollUp.style.display = "block";
    } else {
        scrollUp.style.display = "none";
    }
}

/**
 * Get user from database
 */
function getUserData() {
    try {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', `${apiEndpoint}/user/getUserById`, true)
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
        xhr.setRequestHeader('token', `Bearer ${token}`)
        xhr.setRequestHeader('authorization', `Basic ${basicAuth}`)
        xhr.onload = function () {
            const users = JSON.parse(this.responseText)
            if (users.success === false && users.message === 'Unauthorized Access') {
                showAlert(users.message, 'warning', "exclamation-triangle")
                logOut()
            } else {
                if (users.success === false) {
                    showAlert(users.message, 'warning', "exclamation-triangle")
                } else {
                    const userData = users.data
                    const profileImage = userData.profileImage.fileName
                    profileImage ? userImage.src = `${baseUrl}${profileImage}` : '../images/image.png'
                    console.log('userImage.src', userImage.src)
                }
            }
        }

        xhr.send()
    } catch (error) {
        showAlert('Something went wrongdssss', 'warning', "exclamation-triangle")
        document.querySelector(".main").classList.remove("spinner3");
        document.querySelector(".back").classList.remove("backPop");
    }
}


function topButton() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0;
}



// Animate Header
gsap.from(".table", { duration: 3, y: '-300px', ease: "bounce.out" });
gsap.from(".navContainer", { duration: 2.5, y: '-5000px', ease: "power3.out" });
gsap.from(".userProfile", { duration: 3.5, x: '-5000px', ease: "power3.out" });
// gsap.from(".footer", { duration: 2.5, y: '5000px', ease: "power3.out" });
gsap.from(".responsive", { duration: 1.5, ease: "bounce.out" });

// form container
gsap.from(".requestBlood", { duration: 2.5, x: '-5000px', ease: "power3.out" });
gsap.from(".container-fluid", { duration: 2.5, x: '-5000px', ease: "power3.out" });

// Alert animation
gsap.from(".alertMessage", { duration: 2.5, y: '-5000px', ease: "power3.out" });
