const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const navBarLinks = document.querySelector(".navbar-links");
const menuNav = document.querySelector(".menu-nav");
const table = document.querySelector(".table");
const navItem = document.querySelectorAll(".nav-item");

let showMenu = false;
menuBtn.addEventListener("click", () => {
    if (!showMenu) {
        navBarLinks.classList.add('active')
        menuBtn.classList.add("close");
        showMenu = true
    } else {
        navBarLinks.classList.remove('active')
        menuBtn.classList.remove("close");
        showMenu = false
    }
});
//Set initial state of menu
// let showMenu = false;

// menuBtn.addEventListener("click", toggleMenu);

// previous function for navigation
// function toggleMenu() {
//     console.log('Button clicked')
//     if (!showMenu) {
//         menuBtn.classList.add("close");
//         menu.classList.add("show");
//         navBarLinks.classList.add("show");
//         menuNav.classList.add("show");
//         navItem.forEach((item) => item.classList.add("show"));

//         showMenu = true;
//     } else {
//         menuBtn.classList.remove("close");
//         menu.classList.remove("show");
//         navBarLinks.classList.remove("show");
//         menuNav.classList.add("show");
//         navItem.forEach((item) => item.classList.remove("show"));

//         showMenu = false;
//     }
// }

// Animate Header
gsap.from(".table", { duration: 3, y: '-300px', ease: "bounce.out" });
gsap.from(".menu-btn", { duration: 1.5, y: '-300px', ease: "bounce.in" });
gsap.from(".menu", { duration: 1.5, y: '-300px', ease: "bounce.in" });
gsap.from(".responsive", { duration: 1.5, ease: "bounce.out" });

// form container
gsap.from(".requestBlood", { duration: 2.5, x: '-5000px', ease: "power3.out" });
gsap.from("#previousBtn", { duration: 2.5, x: '-10000px', ease: "power3.out", stagger: .2 });
gsap.from("#nextBtn", { duration: 3.5, x: '-1300px', ease: "power3.out", stagger: .4 });
// gsap.from("#link", { duration: 300, opcaity: 0, delay: 50, stagger: .2 });