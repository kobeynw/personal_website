// FUNCTION FOR SWITCHING FONT AND COLOR OF 'Kobey' TEXT IN NAVBAR
function newStyle() {
    let newColor = '';
    let newFont = '';
    let randNum = Math.floor(Math.random()*7);
    // font examples: 'Papyrus', 'Bradley Hand, cursive', 

    switch (randNum) {
        case 0:
            newColor = 'red';
            newFont = 'Chalkduster, fantasy';
            break;
        case 1: 
            newColor = 'blue';
            newFont = 'Florence, cursive'; 
            break;
        case 2:
            newColor = 'yellow';
            newFont = 'Trattatello, fantasy';
            break; 
        case 3:
            newColor= 'purple';
            newFont = 'Brush Script MT';
            break;
        case 4:
            newColor = 'cyan';
            newFont = 'Papyrus'; 
            break;
        case 5:
            newColor = 'maroon';
            newFont = 'Bradley Hand, cursive';
            break;
        case 6: 
            newColor = 'lime';
            newFont = 'Impact';
            break;
        }
        var elem = document.getElementById('name_logo');
        elem.style.color = newColor;
        elem.style.fontFamily = newFont;
}


// FUNCTION FOR FADE-IN EFFECT FOR PICTURES
const fadingImage1 = document.getElementById('coup_pic');
const fadingImage2 = document.getElementById('biking_pic');

// Function to trigger the fade-in effect
async function fadeIn() {
    fadingImage1.style.opacity = 1;
    await new Promise(resolve => setTimeout(resolve, 500));
    fadingImage2.style.opacity = 1;
}


//FUNCTION FOR SLIDE ANIMATION FOR CONNECT PAGE ITEMS
const slideInElement = document.getElementsByClassName('slide-element');

async function slideIn() {
    slideInElement[0].style.transform = 'translateX(0)'; // Slide it in from the left
    await new Promise(resolve => setTimeout(resolve, 500));
    slideInElement[1].style.transform = 'translateX(0)';
    await new Promise(resolve => setTimeout(resolve, 500));
    slideInElement[2].style.transform = 'translateX(0)';
}


//FUNCTION FOR TYPING EFFECT FOR MAIN PAGE WELCOME
const textElement = document.getElementById('welcome_text');
const text = "Hello everyone! Welcome to my website!";
const typingSpeed = 35; // Typing speed (in milliseconds)

let charIndex = 0;

function typeText() {
  if (charIndex < text.length) {
    textElement.innerHTML += text.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingSpeed);
  }
}


//EVENT TO TRIGGER PREVIOUS FUNCTIONS ON LOAD
window.addEventListener('load', () => {
    slideIn();
    fadeIn();
    typeText();
});


// document.getElementById('feedback').addEventListener('submit', function(event) {
//     event.preventDefault();
//     alert('Feedback submitted; thank you!')
//     document.getElementById('feedback').reset();
// });