document.addEventListener("DOMContentLoaded", () => {
    
    // ============================================================
    // 1. HEADER SCROLL EFFECT
    // ============================================================
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // ============================================================
    // 2. ANIMATION DES CHIFFRES AU SCROLL (INDEX & À PROPOS)
    // ============================================================
    const counters = document.querySelectorAll('.num');
    const speed = 200; // Vitesse globale de l'animation

    const startCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        
        if (isNaN(target)) return; // Sécurité

        const updateCount = () => {
            const currentText = counter.innerText;
            let count = 0;
            if (currentText !== "0") {
                count = parseInt(currentText.replace(/[^0-9]/g, ''), 10) || 0;
            }

            const inc = Math.ceil(target / speed);

            if (count < target) {
                const nextValue = count + inc;
                if (nextValue >= target) {
                    counter.innerText = prefix + formatNumber(target) + suffix;
                } else {
                    counter.innerText = prefix + formatNumber(nextValue) + suffix;
                    setTimeout(updateCount, 10);
                }
            } else {
                counter.innerText = prefix + formatNumber(target) + suffix;
            }
        };

        // Fonction pour séparer les milliers (ex: 13 100 ou 7 000)
        const formatNumber = (num) => {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        };

        updateCount();
    };

    // L'Intersection Observer pour déclencher l'effet au scroll
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target); // Lance l'animation une seule fois
            }
        });
    }, { threshold: 0.1 }); // Sensibilité du scroll

    counters.forEach(counter => observer.observe(counter));

    // ============================================================
    // 3. ACCORDEON
    // ============================================================
    const triggers = document.querySelectorAll('.acc-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const panel = trigger.nextElementSibling;
            if (panel) {
                panel.classList.toggle('active');
            }
        });
    });

});


    // ============================================================
    // 4. ACCORDEON (FAQ)
    // ============================================================
<script>
    document.querySelectorAll('.fusion-header').forEach(button => {
        button.addEventListener('click', () => {
            const currentItem = button.parentElement;
            const content = currentItem.querySelector('.fusion-content');
            
            // Toggle l'état de la carte cliquée
            currentItem.classList.toggle('active');

            if (currentItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });
</script>
