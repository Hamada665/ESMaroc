document.addEventListener("DOMContentLoaded", () => {
    const triggers = document.querySelectorAll('.acc-trigger');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const panel = trigger.nextElementSibling;
            
            // Ferme les autres panneaux (optionnel, pour un look plus propre)
            document.querySelectorAll('.acc-panel').forEach(p => {
                if (p !== panel) p.classList.remove('active');
            });

            // Bascule l'état du panneau cliqué
            panel.classList.toggle('active');
        });
    });
});



const carousel = document.querySelector('.carousel-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateClasses() {
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach((card, index) => {
        card.classList.remove('active', 'side');
        
        // Avec 3 cartes, la deuxième (index 1) est toujours celle du centre
        if (index === 1) {
            card.classList.add('active');
        } else {
            card.classList.add('side');
        }
    });
}

nextBtn.addEventListener('click', () => {
    const cards = document.querySelectorAll('.project-card');
    // On prend la première carte et on la déplace à la toute fin
    carousel.appendChild(cards[0]);
    updateClasses();
});

prevBtn.addEventListener('click', () => {
    const cards = document.querySelectorAll('.project-card');
    // On prend la dernière carte et on la met au tout début
    carousel.insertBefore(cards[cards.length - 1], cards[0]);
    updateClasses();
});

// Lancement au chargement
updateClasses();



const counters = document.querySelectorAll('.num');

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const suffix = counter.getAttribute('data-suffix') || "";
            const speed = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + speed);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + suffix;
            }
        };
        updateCount();
    });
};

// Lance l'animation (tu peux l'améliorer avec un Scroll Observer plus tard)
animateCounters();
