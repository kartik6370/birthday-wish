// Reasons database — feel free to edit any of these lines to make them even more "you"
const reasons = [
    {
        text: "You have this way of making even the most ordinary moment feel like a little celebration, just by being in it.",
        emoji: "🌟",
        color: "#ff8fc0"
    },
    {
        text: "Your smile is honestly one of my favorite things in the world — it shows up, and everything feels a little lighter.",
        emoji: "💗",
        color: "#8ecae6"
    },
    {
        text: "You're kind in a way that doesn't try to be — it just is. That's rare, and I notice it every single time.",
        emoji: "🌸",
        color: "#ffd166"
    },
    {
        text: "Even on your busiest, most tiring days, you still find a way to show up for the people you love. Today, I hope the world shows up for you.",
        emoji: "🎂",
        color: "#c8b6ff"
    },
    {
        text: "I love how fiercely you care about the things — and people — that matter to you. It's one of the most beautiful things about you.",
        emoji: "✨",
        color: "#a0e7a0"
    },
    {
        text: "Being around you feels like home. I don't say that enough, so I'm saying it here, in pixels and hearts, for the whole internet to see: Happy Birthday, Sandeepta. I'm so lucky to know you.",
        emoji: "💫",
        color: "#ff9d3c"
    }
];

const balloonField = document.getElementById('balloonField');
const progressCount = document.getElementById('progressCount');
const continueButton = document.getElementById('continueButton');
const confettiLayer = document.getElementById('confettiLayer');
let poppedCount = 0;

function lighten(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = Math.min(255, (n >> 16) + 60);
    const g = Math.min(255, ((n >> 8) & 0xff) + 60);
    const b = Math.min(255, (n & 0xff) + 60);
    return `rgb(${r}, ${g}, ${b})`;
}

function burstConfettiAt(x, y, count = 26) {
    const colors = ['#ff69b4', '#ffd166', '#8ecae6', '#c8b6ff', '#ff9d3c', '#a0e7a0'];
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = x + 'px';
        piece.style.top = y + 'px';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        confettiLayer.appendChild(piece);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 140 + 60;

        gsap.to(piece, {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance + 80,
            rotation: Math.random() * 360,
            opacity: 0,
            duration: Math.random() * 0.8 + 0.8,
            ease: "power1.out",
            onComplete: () => piece.remove()
        });
    }
}

function buildBalloons() {
    reasons.forEach((reason, index) => {
        const item = document.createElement('div');
        item.className = 'balloon-item';

        const balloon = document.createElement('button');
        balloon.className = 'balloon';
        balloon.style.setProperty('--balloon-color', reason.color);
        balloon.style.setProperty('--balloon-light', lighten(reason.color));
        balloon.style.setProperty('--bob-delay', (index * 0.3) + 's');
        balloon.textContent = reason.emoji;
        balloon.setAttribute('aria-label', 'Pop this balloon');

        const card = document.createElement('div');
        card.className = 'reason-card';
        card.innerHTML = `<div><span class="reason-emoji">${reason.emoji}</span>${reason.text}</div>`;

        balloon.addEventListener('click', () => {
            if (item.classList.contains('popped')) return;
            item.classList.add('popped');

            const rect = balloon.getBoundingClientRect();
            burstConfettiAt(rect.left + rect.width / 2, rect.top + rect.height / 2);

            poppedCount++;
            progressCount.textContent = poppedCount;

            if (poppedCount === reasons.length) {
                setTimeout(() => continueButton.classList.add('show'), 400);
            }
        });

        item.appendChild(balloon);
        item.appendChild(card);
        balloonField.appendChild(item);
    });
}

buildBalloons();

continueButton.addEventListener('click', () => {
    gsap.to('body', {
        opacity: 0,
        duration: 0.8,
        onComplete: () => {
            window.location.href = 'birthday.html';
        }
    });
});

const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX - 13, y: e.clientY - 13, duration: 0.2 });
});
