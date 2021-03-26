/* ---------------------- Toggle Style Switcher ---------------------- */ 
const styleSwitcherToggler = document.querySelector(".style-switcher-toggler");
styleSwitcherToggler.addEventListener("click",() => {
    //console.log("hi");
    document.querySelector(".style-switcher").classList.toggle("open");
})

// Hide style - switcher on scroll
window.addEventListener("scroll", () => {
    if(document.querySelector(".style-switcher").classList.contains("open")) {
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

/* ---------------------- Theme Colors ---------------------- */ 
const alternateStyles = document.querySelectorAll(".alternate-style");
//console.log(alternateStyles);
function setActiveStyle(color) {
    localStorage.setItem("color",color);
    //console.log(localStorage.getItem("color"));
    changeColor();
}

function changeColor() {
    alternateStyles.forEach((style) => {
        if(localStorage.getItem("color") === style.getAttribute("title")) {
            style.removeAttribute("disabled");
        }
        else {
            style.setAttribute("disabled","true");
        }
    })
}

// checking if 'color' key exists
if(localStorage.getItem("color") != null) {
    changeColor();
}

/* ---------------------- Theme Light and Dark Mode ---------------------- */ 
const dayNight = document.querySelector(".day-night");

dayNight.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark")) {
        localStorage.setItem("theme","dark");
    }
    else {
        localStorage.setItem("theme","light");
    }
    updateIcon();
})

function themeMode() {
    if(localStorage.getItem("theme") !== null) {
        if(localStorage.getItem("theme") === "light") {
            document.body.classList.remove("dark");
        }
        else {
            document.body.classList.add("light");
        }
    }
    updateIcon();
}

themeMode();

function updateIcon() {
    if(document.body.classList.contains("dark")) {
        dayNight.querySelector("i").classList.remove("fa-moon");
        dayNight.querySelector("i").classList.add("fa-sun");
    }
    else {
        dayNight.querySelector("i").classList.remove("fa-sun");
        dayNight.querySelector("i").classList.add("fa-moon");
    }
}
