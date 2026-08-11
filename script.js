// Cursor following effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Typing effect for greeting
const greetingText = "Somewhere out there, today just got a little brighter... because it's your day. 🎂";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 45);
    }
}

// Create floating elements
const floatingElements = ['💖', '✨', '🌸', '💫', '🎈', '🎉'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

window.addEventListener('load', () => {
    gsap.to('.pre-title', { opacity: 1, duration: 1, delay: 0.2 });

    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out",
        delay: 0.4
    });

    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out",
        delay: 1
    });

    typeGreeting();
    setInterval(createFloating, 900);
});

document.querySelector('.cta-button').addEventListener('mouseenter', function () {
    gsap.to(this, { scale: 1.08, duration: 0.3 });
});

document.querySelector('.cta-button').addEventListener('mouseleave', function () {
    gsap.to(this, { scale: 1, duration: 0.3 });
});

document.querySelector('.cta-button').addEventListener('click', () => {
    gsap.to('body', {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            window.location.href = 'reasons.html';
        }
    });
});
