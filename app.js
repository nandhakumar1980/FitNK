document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        startBtn: document.getElementById('start-journey'),
        hero: document.getElementById('hero'),
        analyze: document.getElementById('analyze'),
        results: document.getElementById('results'),
        form: document.getElementById('coach-form'),
        steps: document.querySelectorAll('.form-step'),
        display: document.getElementById('program-display')
    };

    let currentStep = 1;

    // Navigation
    elements.startBtn?.addEventListener('click', () => {
        elements.hero.classList.add('hidden');
        elements.analyze.classList.remove('hidden');
        window.scrollTo({ top: elements.analyze.offsetTop - 50, behavior: 'smooth' });
    });

    document.querySelectorAll('.btn-next').forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                elements.steps[currentStep - 1].classList.remove('active');
                currentStep++;
                elements.steps[currentStep - 1].classList.add('active');
            }
        });
    });

    document.querySelectorAll('.btn-prev').forEach(btn => {
        btn.addEventListener('click', () => {
            elements.steps[currentStep - 1].classList.remove('active');
            currentStep--;
            elements.steps[currentStep - 1].classList.add('active');
        });
    });

    function validateStep(index) {
        const step = elements.steps[index - 1];
        const inputs = step.querySelectorAll('input[required], select[required]');
        let valid = true;
        inputs.forEach(i => {
            if (!i.value.trim()) {
                i.style.borderColor = "#00FF00"; // Green flash for error focus in this theme
                valid = false;
            } else {
                i.style.borderColor = "#555";
            }
        });
        return valid;
    }

    elements.form?.addEventListener('submit', (e) => {
        e.preventDefault();
        elements.analyze.classList.add('hidden');
        elements.results.classList.remove('hidden');

        const data = Object.fromEntries(new FormData(elements.form).entries());

        setTimeout(() => {
            const program = generateProtocol(data);
            renderProgram(program);
        }, 3000);
    });

    function generateProtocol(user) {
        const goal = user.primary_goal;
        const level = user.fitness_level;
        const weight = parseFloat(user.weight) || 70;

        const heroes = {
            'heatblast': { name: 'HEATBLAST (METABOLIC)', cardio: '15m High Intensity', reps: '15-20' },
            'four_arms': { name: 'FOUR ARMS (POWER)', cardio: '10m Heavy Sled', reps: '6-8' },
            'xlr8': { name: 'XLR8 (SPEED)', cardio: '20m Sprints', reps: '10-12' },
            'diamondhead': { name: 'DIAMONDHEAD (STRENGTH)', cardio: '15m Steady State', reps: '8-10' },
            'ghostfreak': { name: 'GHOSTFREAK (MOBILITY)', cardio: '15m Flow', reps: '12-15' }
        };

        const hero = heroes[goal] || { name: 'HERO FORM', cardio: '15m Cardio', reps: '10-12' };

        return {
            heroName: hero.name,
            level: level.toUpperCase(),
            split: level === 'beginner' ? 'Full Body DNA' : 'Split Mission Protocol',
            nutrition: {
                calories: Math.round(weight * 28 + (goal === 'four_arms' ? 400 : -300)),
                protein: Math.round(weight * 2.2),
                water: "4-5 Gallons (Plumber Standard)"
            },
            workouts: [
                {
                    name: "MISSION ALPHA: PRIMARY STRIKE",
                    exercises: [
                        { name: "Omni-Squats", sets: 4, reps: hero.reps, rest: "90s" },
                        { name: "Plumber Press", sets: 4, reps: hero.reps, rest: "90s" },
                        { name: "Rustbucket Rows", sets: 3, reps: "12", rest: "60s" },
                        { name: "Null-Void Lunges", sets: 3, reps: "10/leg", rest: "60s" }
                    ]
                }
            ],
            progression: level === 'beginner' ? 'Linear: Add 2kg every solar cycle.' : 'Wave: Alternate intensity blocks.',
            cardio: hero.cardio,
            recovery: {
                sleep: "8 Hours Stasis",
                stress: "10m Deep Breathing",
                mobility: "Daily 15m Flow"
            }
        };
    }

    function renderProgram(p) {
        elements.display.innerHTML = `
            <div class="result-header">
                <h1 style="font-family: 'Bangers', cursive; font-size: 5rem;">${p.heroName}</h1>
                <p>TRANSFORMATION COMPLETE. LEVEL: ${p.level}</p>
            </div>

            <div class="mission-grid">
                <div class="mission-card">
                    <h3>MISSION SPLIT</h3>
                    <p style="color: #00FF00; font-weight: 900;">${p.split}</p>
                </div>
                <div class="mission-card">
                    <h3>DNA FUELING</h3>
                    <p>${p.nutrition.calories} kcal | ${p.nutrition.protein}g Protein</p>
                    <small style="color: #777;">Hydration: ${p.nutrition.water}</small>
                </div>
            </div>

            <div class="workouts">
                ${p.workouts.map(w => `
                    <div class="mission-card">
                        <h2 style="font-family: 'Bangers', cursive; color: #00FF00; margin-bottom: 1rem;">${w.name}</h2>
                        <div class="exercise-classic head">
                            <span>Trial</span>
                            <span>Sets</span>
                            <span>Reps</span>
                            <span>Rest</span>
                        </div>
                        ${w.exercises.map(e => `
                            <div class="exercise-classic">
                                <span style="font-weight: 900;">${e.name}</span>
                                <span>${e.sets}</span>
                                <span>${e.reps}</span>
                                <span>${e.rest}</span>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>

            <div class="plumber-section">
                <h2>CONDITIONING MODE</h2>
                <div class="progression-box">
                    <p><strong>Primary Cardio:</strong> ${p.cardio}</p>
                    <p style="margin-top: 10px;">Maintain heart rate in <strong>Zone 3</strong> for maximum DNA stabilization.</p>
                </div>
            </div>

            <div class="plumber-section">
                <h2>PROGRESSION PATH</h2>
                <p>${p.progression}</p>
                <p style="margin-top: 10px; font-size: 0.9rem; color: #888;">If plateau occurs, decrease volume by 20% for 1 week (Deload Protocol).</p>
            </div>

            <div class="plumber-section">
                <h2>PLUMBER RECOVERY</h2>
                <div class="recovery-grid">
                    <div class="recovery-item"><strong>STATIS SLEEP</strong><p>${p.recovery.sleep}</p></div>
                    <div class="recovery-item"><strong>NEURAL RESET</strong><p>${p.recovery.stress}</p></div>
                    <div class="recovery-item"><strong>FLEX PHASE</strong><p>${p.recovery.mobility}</p></div>
                </div>
            </div>

            <div class="safety-note">
                <strong>!! ATTENTION !!</strong>
                <p>Consult a Plumber Medical Officer before starting high-intensity protocols. If system pain occurs, abort mission immediately.</p>
            </div>

            <div style="text-align: center; margin-top: 4rem;">
                <p style="font-family: 'Bangers', cursive; font-size: 2rem; color: #00FF00; margin-bottom: 1.5rem;">"GO FORTH AND SAVE THE UNIVERSE!"</p>
                <button class="btn-classic" onclick="window.print()">PRINT PROTOCOL</button>
            </div>
        `;
    }
});
