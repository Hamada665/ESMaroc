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

const cards = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 1; // On commence sur la carte du milieu (Dapp)

function updateCarousel() {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'side');
        
        if (index === currentIndex) {
            card.classList.add('active');
        } else {
            card.classList.add('side');
        }
    });
}

nextBtn.addEventListener('click', () => {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Initialisation
updateCarousel();
