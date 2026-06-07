/* ==========================================================================
   A. FONCTIONS GLOBALES (Accessibles via les attributs HTML onclick)
   ========================================================================== */

// 1. Ouvrir une modale de projet
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "flex"; // Centre la modale proprement
        document.body.style.overflow = "hidden"; // Bloque le scroll en arrière-plan
    }
}

// 2. Fermer une modale de projet
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Réactive le scroll
    }
}


/* ==========================================================================
   B. FONCTIONNALITÉS INTERNES (Une fois la page chargée)
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    
    // ------------------------------------------------------------
    // 1. HEADER : EFFET SCROLL (STICKY) & MENU MOBILE
    // ------------------------------------------------------------
    const header = document.querySelector('header');
    const burgerMenu = document.querySelector(".burger-menu");
    const nav = document.querySelector("nav");
    const dropdownTrigger = document.querySelector(".dropdown-trigger");
    const dropdown = document.querySelector(".dropdown");

    // Effet Sticky au scroll
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('sticky');
            } else {
                header.classList.remove('sticky');
            }
        });
    }

    // Menu Mobile (Burger Toggle)
    if (burgerMenu && nav) {
        burgerMenu.addEventListener("click", (e) => {
            e.stopPropagation(); // Évite la fermeture immédiate via le clic global
            nav.classList.toggle("active");
            const icon = burgerMenu.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times"); // Transforme le burger en "X"
            }
        });
    }

    // Dropdown ESMaroc sur Mobile (au clic)
    if (dropdownTrigger && dropdown) {
        dropdownTrigger.addEventListener("click", (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Évite de suivre le lien '#'
                e.stopPropagation(); // Évite la fermeture immédiate via le clic global
                dropdown.classList.toggle("open");
            }
        });
    }

    // ------------------------------------------------------------
    // 2. SÉCURITÉ ET FERMETURES GLOBALES (Clic à l'extérieur)
    // ------------------------------------------------------------
    window.addEventListener("click", (event) => {
        // A. Fermeture des modales au clic sur l'overlay
        const modals = document.querySelectorAll(".project-modal");
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });

        // B. Fermeture du menu mobile si on clique en dehors
        if (nav && nav.classList.contains("active") && !nav.contains(event.target) && !burgerMenu.contains(event.target)) {
            nav.classList.remove("active");
            const icon = burgerMenu.querySelector("i");
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-times");
            }
        }

        // C. Fermeture du dropdown si on clique en dehors
        if (dropdown && dropdown.classList.contains("open") && !dropdown.contains(event.target)) {
            dropdown.classList.remove("open");
        }
    });

    // ------------------------------------------------------------
    // 3. ANIMATION DES CHIFFRES AU SCROLL (INDEX & À PROPOS)
    // ------------------------------------------------------------
    const counters = document.querySelectorAll('.num');
    const speed = 200; 

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    };

    const startCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const prefix = counter.getAttribute('data-prefix') || '';
        const suffix = counter.getAttribute('data-suffix') || '';
        
        if (isNaN(target)) return; 

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

        updateCount();
    };

    // Intersection Observer pour les compteurs
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1 });

    counters.forEach(counter => observer.observe(counter));

    // ------------------------------------------------------------
    // 4. ACCORDÉONS CLASSIQUES 
    // ------------------------------------------------------------
    const triggers = document.querySelectorAll('.acc-trigger');
    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const panel = trigger.nextElementSibling;
            if (panel) {
                panel.classList.toggle('active');
            }
        });
    });

    // ------------------------------------------------------------
    // 5. ACCORDÉON SPECIFIQUE "QUESTIONS CLÉS" (FUSION)
    // ------------------------------------------------------------
    document.addEventListener('click', function (e) {
        const accordeonHeader = e.target.closest('.fusion-header');
        
        if (accordeonHeader) {
            e.preventDefault();
            const currentItem = accordeonHeader.parentElement;
            const content = currentItem.querySelector('.fusion-content');
            
            currentItem.classList.toggle('active');

            if (currentItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        }
    });

});

/* ==========================================================================
   CONFIGURATION DE LA LIGHTBOX (GALERIE DÉTAIL ÉVÉNEMENT)
   ========================================================================== */
if (typeof lightbox !== 'undefined') {
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true, 
        'albumLabel': "Image %1 sur %2",
        'fadeDuration': 300,
        'imageFadeDuration': 300
    });
}

/* ==========================================================================
   CARROUSEL TÉMOIGNAGES — PAGE E-LEARNING
   ========================================================================== */
(function() {
    const track = document.getElementById('elCarouselTrack');
    if (!track) return; // Ne s'exécute que sur la page e-learning

    const dotsContainer = document.getElementById('elCarouselDots');
    const cards = track.querySelectorAll('.el-testimonial-card');
    const totalCards = cards.length;
    const visibleCards = window.innerWidth <= 768 ? 1 : 3;
    const maxIndex = Math.max(0, totalCards - visibleCards);
    let currentIndex = 0;

    // Créer les dots
    for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('span');
        dot.classList.add('el-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    }

    function goTo(index) {
        currentIndex = Math.max(0, Math.min(index, maxIndex));
        const cardWidth = cards[0].offsetWidth + 25; // largeur + gap
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        // Mettre à jour les dots
        document.querySelectorAll('.el-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    window.elCarouselNext = function() {
        goTo(currentIndex < maxIndex ? currentIndex + 1 : 0);
    };

    window.elCarouselPrev = function() {
        goTo(currentIndex > 0 ? currentIndex - 1 : maxIndex);
    };

    // Recalcul au resize
    window.addEventListener('resize', () => goTo(0));
})();
