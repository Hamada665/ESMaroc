/* ============================================================
   RAPPORTS.JS — Interactions spécifiques à la page rapports.html
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Apparition progressive des cartes au scroll ── */
    const cards = document.querySelectorAll('.rapport-card');

    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, idx) => {
            if (entry.isIntersecting) {
                // Délai progressif selon l'index visible
                const delay = Array.from(cards).indexOf(entry.target) * 80;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(28px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        cardObserver.observe(card);
    });


    /* ── Appliquer la transition "visible" ── */
    // On injecte dynamiquement la règle CSS pour .rapport-card.visible
    const style = document.createElement('style');
    style.textContent = `
        .rapport-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .rapport-card.visible:hover {
            transform: translateY(-6px) !important;
        }
    `;
    document.head.appendChild(style);


    /* ── Hover : légère animation sur la bande jaune ── */
    cards.forEach(card => {
        const stripe = card.querySelector('.cover-stripe');
        if (!stripe) return;

        card.addEventListener('mouseenter', () => {
            stripe.style.transition = 'width 0.3s ease';
            stripe.style.width = '34px';
        });

        card.addEventListener('mouseleave', () => {
            stripe.style.width = '28px';
        });
    });


    /* ── Boutons de téléchargement : feedback visuel si href="#" ── */
    const downloadBtns = document.querySelectorAll('.btn-download');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Si le lien est encore un placeholder (#), on affiche un retour visuel
            if (btn.getAttribute('href') === '#') {
                e.preventDefault();

                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-clock"></i> Bientôt disponible';
                btn.style.background = 'var(--text-light)';
                btn.style.pointerEvents = 'none';

                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.style.pointerEvents = '';
                }, 2200);
            }
        });
    });

});
