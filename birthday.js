// ---------- Balloons ----------
const balloonColors = ['#ff8fc0', '#ffd166', '#8ecae6', '#c8b6ff', '#a0e7a0'];
const balloonsLayer = document.querySelector('.balloons');

function createBalloon() {
    const balloon = document.createElement('div');
    balloon.className = 'balloon';
    balloon.style.left = Math.random() * 100 + 'vw';
    balloon.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
    const size = Math.random() * 20 + 36;
    balloon.style.width = size + 'px';
    balloon.style.height = size * 1.25 + 'px';
    balloon.style.animationDuration = (Math.random() * 6 + 9) + 's';
    balloonsLayer.appendChild(balloon);
    setTimeout(() => balloon.remove(), 16000);
}

setInterval(createBalloon, 1200);
for (let i = 0; i < 5; i++) setTimeout(createBalloon, i * 300);

// ---------- Confetti ----------
const confettiColors = ['#ff69b4', '#ffd166', '#8ecae6', '#c8b6ff', '#ff9d3c', '#a0e7a0'];
const confettiLayer = document.querySelector('.confetti-layer');

function burstConfetti(count = 120) {
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        confettiLayer.appendChild(piece);

        gsap.to(piece, {
            y: window.innerHeight + 50,
            x: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 720 - 360,
            duration: Math.random() * 2 + 2.5,
            ease: "power1.in",
            opacity: 0.9,
            onComplete: () => piece.remove()
        });
    }
}

// ---------- Blow out the candle ----------
const blowButton = document.querySelector('.blow-button');
const flame = document.querySelector('.flame');
const wishText = document.querySelector('.wish-text');
let blown = false;

blowButton.addEventListener('click', () => {
    if (blown) return;
    blown = true;

    flame.classList.add('out');
    blowButton.disabled = true;
    blowButton.textContent = '🕯️ Wish Sent';

    burstConfetti(140);
    wishText.classList.add('show');

    document.querySelector('.gallery').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// A little confetti on load too, because why not
window.addEventListener('load', () => burstConfetti(60));
