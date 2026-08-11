// Reasons database — feel free to edit any of these lines to make them even more "you"
const reasons = [
    {
        text: "You have this way of making even the most ordinary moment feel like a little celebration, just by being in it.",
        emoji: "🌟"
    },
    {
        text: "Your smile is honestly one of my favorite things in the world — it shows up, and everything feels a little lighter.",
        emoji: "💗"
    },
    {
        text: "You're kind in a way that doesn't try to be — it just is. That's rare, and I notice it every single time.",
        emoji: "🌸"
    },
    {
        text: "Even on your busiest, most tiring days, you still find a way to show up for the people you love. Today, I hope the world shows up for you.",
        emoji: "🎂"
    },
    {
        text: "I love how fiercely you care about the things — and people — that matter to you. It's one of the most beautiful things about you.",
        emoji: "✨"
    },
    {
        text: "Being around you feels like home. I don't say that enough, so I'm saying it here, in pixels and hearts, for the whole internet to see: Happy Birthday, Sandeepta. I'm so lucky to know you.",
        emoji: "💫"
    }
];

let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    card.innerHTML = `${reason.emoji} ${reason.text}`;

    gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 0.5,
        ease: "back.out"
    });

    return card;
}

function displayNewReason() {
    if (isTransitioning || currentReasonIndex >= reasons.length) return;
    isTransitioning = true;

    const card = createReasonCard(reasons[currentReasonIndex]);
    reasonsContainer.appendChild(card);
    reasonCounter.textContent = `${currentReasonIndex + 1} of ${reasons.length}`;
    currentReasonIndex++;

    if (currentReasonIndex === reasons.length) {
        gsap.to(shuffleButton, {
            scale: 1.1,
            duration: 0.5,
            ease: "elastic.out",
            onComplete: () => {
                shuffleButton.textContent = "One Last Thing... 💫";
                shuffleButton.classList.add('story-mode');
                shuffleButton.addEventListener('click', () => {
                    gsap.to('body', {
                        opacity: 0,
                        duration: 0.8,
                        onComplete: () => {
                            window.location.href = 'birthday.html';
                        }
                    });
                });
            }
        });
    }

    createFloatingElement();
    setTimeout(() => { isTransitioning = false; }, 500);
}

shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
    displayNewReason();
});

function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -window.innerHeight - 100,
        duration: Math.random() * 6 + 6,
        opacity: 0.9,
        onComplete: () => element.remove()
    });
}

const cursor = document.querySelector('.custom-cursor');
document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX - 13, y: e.clientY - 13, duration: 0.2 });
});

// Show the first reason automatically so the page doesn't feel empty
window.addEventListener('load', () => displayNewReason());
