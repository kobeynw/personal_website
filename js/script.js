// TITLES SLIDER

const titles = ["Software Engineer", "Mountain Biker", "Tinkerer", "Game Developer", "Husband and Father"]

async function titlesSlider() {
    const titlesContainer = document.getElementById('titles-container');
    const title = document.createElement('h3');
    title.className = "titles-slider";
    titlesContainer.appendChild(title);
    while (true) {
        for (i=0; i<titles.length; i++) {
            title.style.opacity = 1;
            title.textContent = titles[i];
            await new Promise(resolve => setTimeout(resolve, 2500));
            title.style.opacity = 0;
            await new Promise(resolve => setTimeout(resolve, 750));
        }
    }
}

// TYPING EFFECT

const textElement = document.getElementById('welcome-text');
const text = "Hello, I'm Kobey";
const typingSpeed = 65;
const flickerSpeed = 100;

let charIndex = 0;

async function typeText() {
    if (charIndex === 0) {
        await new Promise(resolve => setTimeout(resolve, 750));
        textElement.textContent = "|";
    }

    if (charIndex < text.length) {
        textElement.innerHTML = textElement.innerHTML.slice(0, -1);
        textElement.innerHTML += text.charAt(charIndex) + "|";
        charIndex++;
        setTimeout(typeText, typingSpeed);
    }
    else {
        while (true) {
            textElement.innerHTML = textElement.innerHTML.slice(0, -1);
            textElement.innerHTML += "&nbsp";
            await new Promise(resolve => setTimeout(resolve, 750));
            textElement.innerHTML = textElement.innerHTML.slice(0, -6);
            textElement.innerHTML += "|";
            await new Promise(resolve => setTimeout(resolve, 750));
        }
    }
}

// FADE IN EFFECT

const fadeInElements = document.getElementsByClassName('fade-in');

async function fadeIn() {
    await new Promise(resolve => setTimeout(resolve, 500));
    fadeInElements[0].style.opacity = 1;
    await new Promise(resolve => setTimeout(resolve, 500));
    fadeInElements[1].style.opacity = 1;
    await new Promise(resolve => setTimeout(resolve, 500));
    fadeInElements[2].style.opacity = 1;
}

function onScrollTrigger() {
    fadeIn();
    window.removeEventListener('scroll', handleScroll);
}

function handleScroll() {
    const targetElement = document.getElementById('trigger-element');
    const offset = 680;
    const triggerPoint = targetElement.getBoundingClientRect().top + window.scrollY - offset;

    console.log(triggerPoint);
    console.log(window.scrollY);
    if (window.scrollY >= triggerPoint) {
        onScrollTrigger();
    }
}

// MAIN FUNCTION CALLS

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', () => {
    titlesSlider();
    typeText();
});