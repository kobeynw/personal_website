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

// MAIN FUNCTION CALLS

document.addEventListener('DOMContentLoaded', () => {
    titlesSlider();
    typeText();
});