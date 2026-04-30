// 1. Carousel Hero Simple (Logique de slide)
let slideIndex = 0;
function showSlides() {
    // Logique pour faire défiler les images (Placeholder)
    console.log("Carousel actif");
}

// 2. Animation "Woosh" au scroll
window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const plane = document.getElementById('plane-transition');
    
    // Si on scrolle, l'avion "balaye" l'écran
    if (scrollPos > 100) {
        plane.style.transform = "translateX(0)";
    } else {
        plane.style.transform = "translateX(-100%)";
    }
});

// 3. Animation des avions en papier (Pluie d'avions)
function createPaperPlane() {
    const plane = document.createElement('div');
    plane.innerHTML = "✈️"; // Tu pourras remplacer par une image SVG plus tard
    plane.className = 'floating-plane';
    plane.style.left = Math.random() * 100 + "vw";
    plane.style.animationDuration = Math.random() * 5 + 5 + "s";
    document.body.appendChild(plane);
    
    setTimeout(() => plane.remove(), 8000);
}

// Créer un avion toutes les 3 secondes
setInterval(createPaperPlane, 3000);
