// --- TEXT TRANSFORMATION ENGINE ---
const scrambleText = (element) => {
    const originalText = element.innerText;
    const chars = "ABCDEFGHIJКLМNOPQRSTUVWXYZ0123456789$#!@";
    let iterations = 0;

    const interval = setInterval(() => {
        element.innerText = originalText
            .split("")
            .map((letter, index) => {
                if (index < iterations) return originalText[index];
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

        if (iterations >= originalText.length) {
            clearInterval(interval);
        }
        iterations += 1 / 3;
    }, 30);
};

document.querySelectorAll('.scramble-hover').forEach(el => {
    el.addEventListener('mouseenter', () => scrambleText(el));
});

// --- CINEMATIC FLASH & POWER MODE ---
const activateBtn = document.getElementById('activate-mode');
const flashOverlay = document.getElementById('flash-overlay');

if (activateBtn) {
    activateBtn.addEventListener('click', () => {
        // Trigger Flash
        flashOverlay.classList.remove('flash-white');
        void flashOverlay.offsetWidth; // Trigger reflow
        flashOverlay.classList.add('flash-white');

        // Boost Energy Effects
        document.body.style.filter = 'contrast(1.2) brightness(1.2)';
        activateBtn.innerText = "POWER MODE ACTIVE";
        activateBtn.style.background = "var(--primary)";
        activateBtn.style.color = "#000";

        // Update all progress bars to max
        document.querySelectorAll('.engine-progress').forEach(p => {
            p.style.borderColor = "var(--white)";
            p.style.filter = "drop-shadow(0 0 30px var(--primary))";
        });

        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 1000);
    });
}

// --- PARTICLE DYNAMICS ---
const createCinematicParticles = () => {
    const canvas = document.getElementById('energy-canvas');
    for (let i = 0; i < 50; i++) {
        const p = document.createElement('div');
        p.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3}px;
            height: ${Math.random() * 3}px;
            background: var(--primary);
            box-shadow: 0 0 10px var(--primary);
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5};
        `;

        // Floating Animation
        const duration = 10 + Math.random() * 20;
        p.animate([
            { transform: 'translateY(0) scale(1)', opacity: 0 },
            { transform: `translateY(-${Math.random() * 500}px) scale(1.5)`, opacity: 0.5 },
            { transform: `translateY(-${Math.random() * 1000}px) scale(0)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            iterations: Infinity,
            easing: 'linear'
        });

        canvas.appendChild(p);
    }
};

// --- SCROLL REVEAL (CINEMATIC ENTRY) ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Glitch effect on entry for 0.3s
            entry.target.style.filter = 'hue-rotate(90deg) brightness(2)';
            setTimeout(() => {
                entry.target.style.filter = 'none';
            }, 300);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.alien-panel, .hologram-card, .stat-box, .hero-title, .hero-subtext').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.95)';
    el.style.transition = 'all 1s cubic-bezier(0.19, 1, 0.22, 1)';
    revealObserver.observe(el);
});

// CSS for visible state injected via JS
const revealStyle = document.createElement('style');
revealStyle.textContent = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
    }
    .flash-white {
        background: white !important;
        animation: flash-anim 0.8s ease-out forwards;
    }
    @keyframes flash-anim {
        0% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(revealStyle);

// --- MOUSE ENERGY GLOW ---
const mouseGlow = document.createElement('div');
mouseGlow.style.cssText = `
    position: fixed;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(57, 255, 20, 0.05) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 100;
    transform: translate(-50%, -50%);
    mix-blend-mode: screen;
`;
document.body.appendChild(mouseGlow);

window.addEventListener('mousemove', (e) => {
    mouseGlow.animate({
        left: `${e.clientX}px`,
        top: `${e.clientY}px`
    }, { duration: 500, fill: "forwards" });
});

// Initialize on Load
window.addEventListener('DOMContentLoaded', () => {
    createCinematicParticles();

    // Animate Nutrition Engine
    const fuelProgress = document.getElementById('fuel-progress');
    if (fuelProgress) {
        fuelProgress.animate([
            { transform: 'rotate(0deg)' },
            { transform: 'rotate(360deg)' }
        ], { duration: 10000, iterations: Infinity });
    }
});
