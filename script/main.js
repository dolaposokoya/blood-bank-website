// const env = `production`;
// const baseUrl = env === 'development' ? `http://localhost:5000/images/` : `https://api-bloodbank-v1.herokuapp.com/images/`
const table = document.querySelector(".table");
const scrollUp = document.querySelector('.scrollUp')
// const image = localStorage.getItem('image')
// const profileImage = document.querySelector('.profileImage');
// profileImage.src = image ? `${baseUrl}${image}` : '../images/image.png'

document.querySelector('.icon').addEventListener('click', () => {
    document.querySelector('.mainMenu').classList.toggle('show')
})


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

function topButton() {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0;
}


// Animate Header
gsap.from(".navContainer", { duration: 2.5, y: '-5000px', ease: "power3.out" });
gsap.from(".userProfile", { duration: 3.5, x: '-5000px', ease: "power3.out" });
gsap.from(".responsive", { duration: 1.5, ease: "bounce.out" });

// form container
gsap.from(".requestBlood", { duration: 2.5, x: '-5000px', ease: "power3.out" });
gsap.from(".container-fluid", { duration: 2.5, x: '-5000px', ease: "power3.out" });

// Alert animation
gsap.from(".alertMessage", { duration: 2.5, y: '-5000px', ease: "power3.out" });
