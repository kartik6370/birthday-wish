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
const confettiLayer = document.getElementById('confettiLayer');

function burstConfetti(count = 120, originX = null, originY = 0) {
    for (let i = 0; i < count; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = (originX !== null ? originX : Math.random() * window.innerWidth) + 'px';
        piece.style.top = originY + 'px';
        piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        confettiLayer.appendChild(piece);

        gsap.to(piece, {
            y: window.innerHeight - originY + 50,
            x: (Math.random() - 0.5) * (originX !== null ? 300 : 200),
            rotation: Math.random() * 720 - 360,
            duration: Math.random() * 2 + 2.5,
            ease: "power1.in",
            opacity: 0.9,
            onComplete: () => piece.remove()
        });
    }
}

// ---------- Multi-candle cake ----------
const candleConfigs = [
    { offset: -84, colors: ['#fff5cc', '#ffd966'] },
    { offset: -42, colors: ['#ffe0f0', '#ff9dc4'] },
    { offset: 0, colors: ['#e0f0ff', '#8ecae6'] },
    { offset: 42, colors: ['#f0e8ff', '#c8b6ff'] },
    { offset: 84, colors: ['#e8ffe0', '#a0e7a0'] }
];

const candlesContainer = document.getElementById('candles');
const candleCountEl = document.getElementById('candleCount');
const wishText = document.getElementById('wishText');
let blownCount = 0;

candleConfigs.forEach((cfg) => {
    const candle = document.createElement('div');
    candle.className = 'candle';
    candle.style.setProperty('--offset', cfg.offset + 'px');
    candle.style.setProperty('--candle-color', cfg.colors[0]);
    candle.style.setProperty('--candle-color-2', cfg.colors[1]);

    const flame = document.createElement('div');
    flame.className = 'flame';
    candle.appendChild(flame);

    candle.addEventListener('click', () => {
        if (candle.classList.contains('blown')) return;
        candle.classList.add('blown');
        blownCount++;
        candleCountEl.textContent = blownCount;

        const rect = candle.getBoundingClientRect();
        burstConfetti(18, rect.left + rect.width / 2, rect.top);

        if (blownCount === candleConfigs.length) {
            setTimeout(() => {
                burstConfetti(140);
                wishText.classList.add('show');
            }, 250);
        }
    });

    candlesContainer.appendChild(candle);
});

// ---------- Confetti cannon (repeatable fun) ----------
document.getElementById('confettiCannon').addEventListener('click', (e) => {
    burstConfetti(90, e.clientX, e.clientY);
});

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// ---------- Gallery lightbox with tilt ----------
const galleryItems = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
let currentIndex = 0;

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = galleryItems[index].querySelector('img').src;
    lightbox.classList.add('open');
}

function closeLightbox() {
    lightbox.classList.remove('open');
}

function showRelative(delta) {
    currentIndex = (currentIndex + delta + galleryItems.length) % galleryItems.length;
    lightboxImg.src = galleryItems[currentIndex].querySelector('img').src;
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));

    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;
        item.style.transform = `rotateY(${relX * 14}deg) rotateX(${-relY * 14}deg) scale(1.03)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'rotateY(0) rotateX(0) scale(1)';
    });
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => showRelative(-1));
document.getElementById('lightboxNext').addEventListener('click', () => showRelative(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showRelative(-1);
    if (e.key === 'ArrowRight') showRelative(1);
});

// ---------- Love-tap counter ----------
const loveTap = document.getElementById('loveTap');
const loveCount = document.getElementById('loveCount');
let loveTotal = 0;
const loveMilestones = [
    { at: 10, label: "Aww 🥹 Tap for More Love" },
    { at: 25, label: "Okay you're relentless 😅 Tap for More Love" },
    { at: 50, label: "It's infinite now, you win 💗" }
];

loveTap.addEventListener('click', (e) => {
    loveTotal++;
    loveCount.textContent = loveTotal >= 50 ? '∞' : loveTotal;

    const milestone = loveMilestones.find((m) => m.at === loveTotal);
    if (milestone) {
        loveTap.textContent = milestone.label;
        if (loveTotal === 50) burstConfetti(70, e.clientX, e.clientY);
    }

    const pop = document.createElement('div');
    pop.className = 'love-pop';
    pop.textContent = '💗';
    pop.style.left = e.clientX + 'px';
    pop.style.top = e.clientY + 'px';
    document.body.appendChild(pop);

    gsap.to(pop, {
        y: -60,
        x: (Math.random() - 0.5) * 40,
        opacity: 0,
        duration: 0.9,
        ease: 'power1.out',
        onComplete: () => pop.remove()
    });
});

// A little confetti on load too, because why not
window.addEventListener('load', () => burstConfetti(60));
