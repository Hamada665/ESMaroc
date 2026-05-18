document.addEventListener("DOMContentLoaded", () => {
    
    // 1. HEADER SCROLL EFFECT
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // 2. ANIMATION DES CHIFFRES (AVEC OBSERVER) (Style Index + Support des préfixes/suffixes)
document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.num');
    const speed = 200; // Plus le chiffre est bas, plus l'animation est rapide

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        
        const updateCount = () => {
            const count = +counter.innerText.replace(/[^0-9]/g, ''); // Nettoie le texte pour n'avoir que le nombre
            const inc = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = prefix + (count + inc) + suffix;
                setTimeout(updateCount, 1);
            } else {
                // Formatage final propre une fois la cible atteinte
                if (target >= 10000) {
                    // Ajoute un espace pour les grands nombres (ex: 13 100)
                    const formattedTarget = target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
                    counter.innerText = prefix + formattedTarget + suffix;
                } else {
                    counter.innerText = prefix + target + suffix;
                }
            }
        };

        updateCount();
    };

    // Intersection Observer pour ne lancer l'animation que lorsque l'utilisateur scroll jusqu'aux chiffres
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target); // Annule l'observation pour ne le faire qu'une seule fois
            }
        });
    }, { threshold: 0.5 }); // Déclenche quand 50% de la section est visible

    counters.forEach(counter => observer.observe(counter));
});

    // 3. ACCORDEON (Si tu en as dans ESMaroc)
    const triggers = document.querySelectorAll('.acc-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const panel = trigger.nextElementSibling;
            panel.classList.toggle('active');
        });
    });
});
