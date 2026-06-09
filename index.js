/* ==========================================================================
   INDEX.JS — JavaScript spécifique à la page d'accueil
   À coller à la fin de script.js OU charger séparément via <script src="index.js">
   Contient :
   1. Barre de recherche live
   2. Carrousel Événements
   3. Carrousel Projets
   4. Carrousel Partenaires
   ========================================================================== */

(function () {

    /* ================================================================
       1. BARRE DE RECHERCHE LIVE
       ================================================================ */
    const searchToggle  = document.getElementById('search-toggle');
    const searchBar     = document.getElementById('search-bar');
    const searchInput   = document.getElementById('search-input');
    const searchClose   = document.getElementById('search-close');
    const searchResults = document.getElementById('search-results');

    // Index des pages du site
    const siteIndex = [
        { title: 'Accueil',                     url: 'index.html',           keywords: 'accueil home esmaroc' },
        { title: 'Qui sommes-nous ?',            url: 'qui-sommes-nous.html', keywords: 'association mission valeurs esmaroc présentation' },
        { title: 'Notre Histoire & Vision',      url: 'histoire.html',        keywords: 'histoire vision fondation origine' },
        { title: 'Notre Équipe',                 url: 'equipe.html',          keywords: 'équipe membres directeur' },
        { title: 'Rapports',                     url: 'rapports.html',        keywords: 'rapports annuels bilans documents' },
        { title: 'Événements',                   url: 'evenements.html',      keywords: 'événements salon emploi souk startup café école été experts' },
        { title: 'Projets',                      url: 'projets.html',         keywords: 'projets OIM DAPP CorpAfrica RSE international' },
        { title: 'École E-learning',             url: 'elearning.html',       keywords: 'elearning formation en ligne afrique associations' },
        { title: 'Partenaires',                  url: 'partenaires.html',     keywords: 'partenaires ANAPEC UE OIM CERFA soleterre EFE' },
        { title: 'Contact',                      url: 'contact.html',         keywords: 'contact adresse téléphone email rabat tanger formulaire' },
        { title: 'Salon de l\'Emploi ESMaroc',   url: 'evenement-salon-emploi.html', keywords: 'salon emploi recrutement entreprises' },
        { title: 'Souk des Startups',            url: 'souk.html',            keywords: 'souk startup innovation maroc afrique' },
        { title: 'École d\'Été ESMaroc',         url: 'ecoledete.html',       keywords: 'école été programme immersif porteurs projets' },
    ];

    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            searchBar.classList.toggle('open');
            if (searchBar.classList.contains('open')) {
                searchInput.focus();
            }
        });

        searchClose.addEventListener('click', function () {
            searchBar.classList.remove('open');
            searchInput.value = '';
            searchResults.innerHTML = '';
        });

        searchInput.addEventListener('input', function () {
            const query = this.value.trim().toLowerCase();
            searchResults.innerHTML = '';

            if (query.length < 2) return;

            const matches = siteIndex.filter(page =>
                page.title.toLowerCase().includes(query) ||
                page.keywords.toLowerCase().includes(query)
            );

            if (matches.length === 0) {
                searchResults.innerHTML = '<p class="search-no-result">Aucun résultat pour « ' + query + ' »</p>';
                return;
            }

            matches.slice(0, 6).forEach(page => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = '<i class="fas fa-arrow-right" style="margin-right:8px;font-size:.7rem;color:var(--yellow)"></i>' + page.title;
                div.addEventListener('click', () => { window.location.href = page.url; });
                searchResults.appendChild(div);
            });
        });

        // Fermer en cliquant ailleurs
        document.addEventListener('click', function (e) {
            if (!searchBar.contains(e.target) && e.target !== searchToggle) {
                searchBar.classList.remove('open');
            }
        });
    }


    /* ================================================================
       2. FABRIQUE DE CARROUSEL GÉNÉRIQUE
       Crée un carrousel à partir d'un trackId, des boutons prev/next,
       d'un conteneur de dots, et de la largeur visible des cartes.
       ================================================================ */
    function makeCarousel(config) {
        const track    = document.getElementById(config.trackId);
        const prevBtn  = document.getElementById(config.prevId);
        const nextBtn  = document.getElementById(config.nextId);
        const dotsWrap = document.getElementById(config.dotsId);

        if (!track || !prevBtn || !nextBtn) return;

        const cards        = Array.from(track.children);
        const visibleCount = config.visible || 3;
        let currentIndex   = 0;

        // Nombre total de "positions" qu'on peut atteindre
        const maxIndex = Math.max(0, cards.length - visibleCount);

        // ── Créer les dots ──
        if (dotsWrap) {
            for (let i = 0; i <= maxIndex; i++) {
                const dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Aller à la slide ' + (i + 1));
                dot.addEventListener('click', () => goTo(i));
                dotsWrap.appendChild(dot);
            }
        }

        function updateDots() {
            if (!dotsWrap) return;
            dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
                d.classList.toggle('active', i === currentIndex);
            });
        }

        function updateArrows() {
            prevBtn.disabled = currentIndex <= 0;
            nextBtn.disabled = currentIndex >= maxIndex;
        }

        function goTo(index) {
            currentIndex = Math.max(0, Math.min(index, maxIndex));

            // Calcul du décalage en pixels
            const cardEl    = cards[0];
            const cardWidth = cardEl.getBoundingClientRect().width;
            const gap       = parseInt(getComputedStyle(track).gap) || 30;
            const offset    = currentIndex * (cardWidth + gap);

            track.style.transform = 'translateX(-' + offset + 'px)';
            updateDots();
            updateArrows();
        }

        prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
        nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

        // Recalcul au resize
        window.addEventListener('resize', () => goTo(0));

        // Init
        updateArrows();
    }


    /* ================================================================
       3. CARROUSEL ÉVÉNEMENTS
       ================================================================ */
    makeCarousel({
        trackId:  'ev-track',
        prevId:   'ev-prev',
        nextId:   'ev-next',
        dotsId:   'ev-dots',
        visible:  3
    });


    /* ================================================================
       4. CARROUSEL PROJETS
       ================================================================ */
    makeCarousel({
        trackId:  'pr-track',
        prevId:   'pr-prev',
        nextId:   'pr-next',
        dotsId:   'pr-dots',
        visible:  3
    });


    /* ================================================================
       5. CARROUSEL PARTENAIRES (scroll continu, pas de dots)
       ================================================================ */
    const ptTrack = document.getElementById('partners-track');
    const ptPrev  = document.getElementById('pt-prev');
    const ptNext  = document.getElementById('pt-next');

    if (ptTrack && ptPrev && ptNext) {
        let ptIndex   = 0;
        const ptCards = Array.from(ptTrack.children);
        const ptVisible = () => window.innerWidth < 600 ? 2 : window.innerWidth < 900 ? 3 : 5;
        const ptMax   = () => Math.max(0, ptCards.length - ptVisible());

        function ptGoTo(idx) {
            ptIndex = Math.max(0, Math.min(idx, ptMax()));
            const cardW = ptCards[0].getBoundingClientRect().width;
            const gap   = parseInt(getComputedStyle(ptTrack).gap) || 25;
            ptTrack.style.transform = 'translateX(-' + ptIndex * (cardW + gap) + 'px)';
            ptPrev.disabled = ptIndex <= 0;
            ptNext.disabled = ptIndex >= ptMax();
        }

        ptPrev.addEventListener('click', () => ptGoTo(ptIndex - 1));
        ptNext.addEventListener('click', () => ptGoTo(ptIndex + 1));
        window.addEventListener('resize', () => ptGoTo(0));
        ptGoTo(0);
    }

})();
