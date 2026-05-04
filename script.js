// Fonction pour animer les compteurs
function animateCounters() {
    const counters = document.querySelectorAll('.num');
    
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target'); // Le chiffre final
            const count = +counter.innerText;
            
            // Vitesse de l'animation (plus le chiffre est grand, plus on divise par un petit nombre)
            const increment = target / 100; 

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20); // Vitesse de la boucle
            } else {
                counter.innerText = target + (counter.getAttribute('data-suffix') || "");
            }
        };
        updateCount();
    });
}

// Lancer l'animation au scroll
window.addEventListener('scroll', () => {
    const impactSection = document.querySelector('.impact');
    const position = impactSection.getBoundingClientRect().top;
    
    if (position < window.innerHeight) {
        animateCounters();
        // On retire l'écouteur pour ne pas relancer l'animation en boucle
        window.removeEventListener('scroll', animateCounters);
    }
});

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
