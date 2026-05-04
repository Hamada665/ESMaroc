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
