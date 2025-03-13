window.addEventListener("scroll", function () {
    let navbar = document.querySelector("nav");
    if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

window.addEventListener("scroll", function () {
    let arrow = document.querySelector(".arrow");
    if (window.scrollY > 150) {
        arrow.style.display = "block";
    } else {
        arrow.style.display = "none";
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let links = document.querySelectorAll(".nav-link"); 
    let currentPage = window.location.pathname.split("/").pop(); 

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active-link"); 
        }
    });
});


import data from './data.js'; 
const sliderTrack = document.querySelector(".slider-track");
function renderOffers() {
    data.offers.forEach(offer => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        slide.innerHTML = `<img src="${offer.image}" alt="${offer.title}">`;
        sliderTrack.appendChild(slide);
    });
}
renderOffers();



