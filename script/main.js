const menuBtn = document.querySelector(".menu-btn");
const profileImage = document.querySelector(".profile-image");
const menu = document.querySelector(".menu");
const navBarLinks = document.querySelector(".navbar-links");
const profileLinks = document.querySelector(".profile-links");
const menuNav = document.querySelector(".menu-nav");
const table = document.querySelector(".table");
const navItem = document.querySelectorAll(".nav-item");

let showMenu = false;

menuBtn.addEventListener("click", () => {
    if (!showMenu) {
        console.log('!showMenu')
        navBarLinks.classList.add('active')
        menuBtn.classList.add("close");
        showMenu = true
    } else {
        console.log('showMenu')
        navBarLinks.classList.remove('active')
        menuBtn.classList.remove("close");
        showMenu = false
    }
});

// Animate Header
gsap.from(".table", { duration: 3, y: '-300px', ease: "bounce.out" });
gsap.from(".menu-btn", { duration: 1.5, y: '-300px', ease: "bounce.in" });
gsap.from(".profile-image", { duration: 1.6, x: '-400px', ease: "bounce.in" });
gsap.from(".menu", { duration: 1.5, y: '-300px', ease: "bounce.in" });
gsap.from(".responsive", { duration: 1.5, ease: "bounce.out" });

// form container
gsap.from(".requestBlood", { duration: 2.5, x: '-5000px', ease: "power3.out" });
gsap.from(".container-fluid", { duration: 2.5, x: '-5000px', ease: "power3.out" });
gsap.from("#previousBtn", { duration: 2.5, x: '-10000px', ease: "power3.out", stagger: .2 });
gsap.from("#nextBtn", { duration: 3.5, x: '-1300px', ease: "power3.out", stagger: .4 });

// Alert animation
gsap.from(".alertMessage", { duration: 2.5, y: '-5000px', ease: "power3.out" });
// gsap.from("#link", { duration: 300, opcaity: 0, delay: 50, stagger: .2 });