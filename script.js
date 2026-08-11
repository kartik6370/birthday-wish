// Cursor following effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Heart burst wherever the page is clicked
function spawnHeartBurst(x, y) {
    const hearts = ['💖', '💕', '✨', '🌸'];
    for (let i = 0; i < 4; i++) {
        const el = document.createElement('div');
        el.className = 'floating';
        el.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        el.style.left = x + 'px';
        el.style.top = y + 'px';
        el.style.fontSize = (Math.random() * 10 + 16) + 'px';
        document.body.appendChild(el);

        gsap.fromTo(el,
            { opacity: 0, scale: 0.4, x: 0, y: 0 },
            {
                opacity: 1, scale: 1, duration: 0.25,
                onComplete: () => {
                    gsap.to(el, {
                        y: -(Math.random() * 90 + 60),
                        x: (Math.random() - 0.5) * 90,
                        rotation: (Math.random() - 0.5) * 40,
                        opacity: 0,
                        duration: 0.9,
                        ease: 'power1.out',
                        onComplete: () => el.remove()
                    });
                }
            }
        );
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.envelope')) return;
    spawnHeartBurst(e.clientX, e.clientY);
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

// Ambient floating elements
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

function revealMainContent() {
    gsap.to('.pre-title', { opacity: 1, duration: 1 });
    gsap.to('h1', { opacity: 1, duration: 1, y: 20, ease: "bounce.out", delay: 0.2 });
    gsap.to('.cta-button', { opacity: 1, duration: 1, y: -20, ease: "back.out", delay: 0.9 });
    typeGreeting();
    setInterval(createFloating, 900);
}

// ---------- Envelope open interaction ----------
const envelope = document.getElementById('envelope');
const envelopeScene = document.getElementById('envelopeScene');
const mainContent = document.getElementById('mainContent');

envelope.addEventListener('click', () => {
    if (envelope.classList.contains('open')) return;
    envelope.classList.add('open');

    const rect = envelope.getBoundingClientRect();
    spawnHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

    setTimeout(() => {
        envelopeScene.classList.add('hidden-away');
        gsap.to(envelopeScene, {
            opacity: 0,
            y: -20,
            duration: 0.6,
            onComplete: () => {
                envelopeScene.style.display = 'none';
                mainContent.style.display = 'block';
                revealMainContent();
            }
        });
    }, 1000);
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
