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

function wrapLetters(introText) {
    const text = introText.textContent;
    introText.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
        const span = document.createElement("span");
        span.className = "letter";
        
        if (text[i] === " ") {
            span.innerHTML = "&nbsp;";
        } else {
            span.textContent = text[i];
        }

        introText.appendChild(span);
    }
}

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
        textElement.innerHTML = textElement.innerHTML.slice(0, -1);
        wrapLetters(textElement);

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

// SPACE INVADERS GAME

document.getElementById("start-game").addEventListener("click", function() {
    const startButton = document.getElementById("start-game");
    startButton.style.visibility = "hidden";

    const instructions = document.getElementById("instructions");
    instructions.style.visibility = "visible";

    const ship = document.getElementById("ship");
    ship.style.display = "block";
    ship.style.visibility = "visible";

    let shipPosition = window.innerWidth / 2;
    ship.style.left = shipPosition + "px";

    document.addEventListener("keydown", function(event) {
        if (shipPosition < 0) {
            shipPosition = 0;
            ship.style.left = shipPosition + "px";
        } else if (shipPosition > window.innerWidth - 60) {
            shipPosition = window.innerWidth - 60;
            ship.style.left = shipPosition + "px";
        }

        if (event.key === "a" && shipPosition > 0) {
            shipPosition -= 10;
            ship.style.left = shipPosition + "px";
        } else if (event.key === "d" && shipPosition < window.innerWidth - 60) {
            shipPosition += 10;
            ship.style.left = shipPosition + "px";
        } else if (event.key === "w") {
            shootBullet(shipPosition);
        }
    });
});

function shootBullet(position) {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = position + 23 + "px";
    bullet.style.bottom = "130px";
    document.getElementById("game-container").appendChild(bullet);

    const interval = setInterval(() => {
        let bulletBottom = parseInt(bullet.style.bottom);
        bullet.style.bottom = bulletBottom + 10 + "px";

        if (bulletBottom > window.innerHeight) {
            bullet.remove();
            clearInterval(interval);
        } else {
            checkCollision(bullet);
        }
    }, 50);
}

function checkCollision(bullet) {
    const letters = document.querySelectorAll("#welcome-text .letter");
  
    letters.forEach((letter) => {
        const rect = letter.getBoundingClientRect();
        const bulletRect = bullet.getBoundingClientRect();

        if (
            bulletRect.left < rect.right &&
            bulletRect.right > rect.left &&
            bulletRect.top < rect.bottom &&
            bulletRect.bottom > rect.top
        ) {
            letter.remove();
            bullet.remove();
        }
    });
}

// MAIN FUNCTION CALLS

window.addEventListener('scroll', handleScroll);

document.addEventListener('DOMContentLoaded', () => {
    titlesSlider();
    typeText();
});