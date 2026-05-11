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

    // 2. ANIMATION DES CHIFFRES (AVEC OBSERVER)
    const counters = document.querySelectorAll('.num');
    
    const animate = (counter) => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix') || "";
        let count = 0;
        const speed = target / 50; // Vitesse de l'animation

        const updateCount = () => {
            if (count < target) {
                count += speed;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + suffix;
            }
        };
        updateCount();
    };

    // On ne lance l'animation que quand on voit la section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animate(entry.target);
                observer.unobserve(entry.target); // Animé une seule fois
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));

    // 3. ACCORDEON (Si tu en as dans ESMaroc)
    const triggers = document.querySelectorAll('.acc-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const panel = trigger.nextElementSibling;
            panel.classList.toggle('active');
        });
    });
});
