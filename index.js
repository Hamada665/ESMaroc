/* ==========================================================================
   INDEX.JS — Page d'accueil ESMaroc
   Charge après script.js. Gère :
   0. Burger menu (fix complet)
   1. Barre de recherche live
   2. Carrousel Événements
   3. Carrousel Projets
   4. Carrousel Partenaires
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ================================================================
       0. BURGER MENU
       Cible explicitement #burger-btn et #main-nav pour ne pas
       entrer en conflit avec le script.js global.
       ================================================================ */
    var burgerBtn = document.getElementById('burger-btn');
    var mainNav   = document.getElementById('main-nav');

    if (burgerBtn && mainNav) {

        burgerBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = mainNav.classList.toggle('active');
            var icon = burgerBtn.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        });

        // Fermer en cliquant en dehors
        document.addEventListener('click', function (e) {
            if (!mainNav.contains(e.target) && !burgerBtn.contains(e.target)) {
                if (mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    var icon = burgerBtn.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
            }
        });

        // Dropdown ESMaroc au clic sur mobile
        var ddTrigger = mainNav.querySelector('.dropdown-trigger');
        var ddMenu    = mainNav.querySelector('.dropdown');
        if (ddTrigger && ddMenu) {
            ddTrigger.addEventListener('click', function (e) {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    e.stopPropagation();
                    ddMenu.classList.toggle('open');
                }
            });
        }
    }


    /* ================================================================
       1. BARRE DE RECHERCHE LIVE
       ================================================================ */
    var siteIndex = [
        { title: 'Accueil',                    url: 'index.html',                    kw: 'accueil home esmaroc' },
        { title: 'Qui sommes-nous ?',           url: 'qui-sommes-nous.html',          kw: 'association mission valeurs présentation' },
        { title: 'Notre Histoire & Vision',     url: 'histoire.html',                 kw: 'histoire vision fondation origine' },
        { title: 'Notre Équipe',                url: 'equipe.html',                   kw: 'équipe membres directeur' },
        { title: 'Rapports',                    url: 'rapports.html',                 kw: 'rapports annuels bilans documents' },
        { title: 'Événements',                  url: 'evenements.html',               kw: 'événements salon emploi souk startup café école été experts' },
        { title: 'Projets',                     url: 'projets.html',                  kw: 'projets OIM DAPP CorpAfrica UPSHIFT NAWAT RESTART' },
        { title: 'École E-learning',            url: 'elearning.html',                kw: 'elearning formation en ligne afrique associations' },
        { title: 'Partenaires',                 url: 'partenaires.html',              kw: 'partenaires ANAPEC UE OIM CERFA soleterre EFE' },
        { title: 'Contact',                     url: 'contact.html',                  kw: 'contact adresse téléphone email rabat tanger formulaire' },
        { title: 'Projet UPSHIFT',              url: 'upshift.html',                  kw: 'upshift unicef tanger jeunes entrepreneuriat' },
        { title: 'Projet NAWAT',                url: 'nawat.html',                    kw: 'nawat maroc pme tpe renforcement' },
        { title: 'Projet RESTART',              url: 'restart.html',                  kw: 'restart startups durables business plan' },
        { title: 'Projet FLOWER',               url: 'flower.html',                   kw: 'flower femmes maroc tunisie formation' },
        { title: 'Projet OIM',                  url: 'oim.html',                      kw: 'oim migration insertion migrants' },
        { title: 'Projet JISR',                 url: 'jisr.html',                     kw: 'jisr femmes tanger incubateur' },
        { title: 'Projet DAR-LIBTIKAR',         url: 'darlibtikar.html',              kw: 'dar libtikar incubation innovation fondation' },
        { title: 'Projet DAPP',                 url: 'dapp.html',                     kw: 'dapp danida mena emploi droits humains' },
        { title: 'Salon de l\'Emploi',          url: 'evenement-salon-emploi.html',   kw: 'salon emploi recrutement entreprises' },
        { title: 'Souk des Startups',           url: 'souk.html',                     kw: 'souk startup innovation maroc afrique' },
        { title: 'École d\'Été ESMaroc',        url: 'ecoledete.html',                kw: 'école été programme immersif porteurs projets' },
    ];

    var searchToggle  = document.getElementById('search-toggle');
    var searchBar     = document.getElementById('search-bar');
    var searchInput   = document.getElementById('search-input');
    var searchClose   = document.getElementById('search-close');
    var searchResults = document.getElementById('search-results');

    if (searchToggle && searchBar) {

        searchToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            searchBar.classList.toggle('open');
            if (searchBar.classList.contains('open') && searchInput) searchInput.focus();
        });

        if (searchClose) {
            searchClose.addEventListener('click', function () {
                searchBar.classList.remove('open');
                if (searchInput) searchInput.value = '';
                if (searchResults) searchResults.innerHTML = '';
            });
        }

        if (searchInput && searchResults) {
            searchInput.addEventListener('input', function () {
                var q = this.value.trim().toLowerCase();
                searchResults.innerHTML = '';
                if (q.length < 2) return;
                var matches = siteIndex.filter(function (p) {
                    return p.title.toLowerCase().indexOf(q) > -1 || p.kw.toLowerCase().indexOf(q) > -1;
                });
                if (!matches.length) {
                    searchResults.innerHTML = '<p class="search-no-result">Aucun résultat pour « ' + q + ' »</p>';
                    return;
                }
                matches.slice(0, 6).forEach(function (p) {
                    var d = document.createElement('div');
                    d.className = 'search-result-item';
                    d.innerHTML = '<i class="fas fa-arrow-right" style="margin-right:8px;font-size:.7rem;color:var(--yellow)"></i>' + p.title;
                    d.addEventListener('click', function () { window.location.href = p.url; });
                    searchResults.appendChild(d);
                });
            });
        }

        document.addEventListener('click', function (e) {
            if (searchBar && !searchBar.contains(e.target) && e.target !== searchToggle) {
                searchBar.classList.remove('open');
            }
        });
    }


    /* ================================================================
       2. FABRIQUE CARROUSEL GÉNÉRIQUE
       ================================================================ */
    function makeCarousel(cfg) {
        var track   = document.getElementById(cfg.trackId);
        var prevBtn = document.getElementById(cfg.prevId);
        var nextBtn = document.getElementById(cfg.nextId);
        var dotsEl  = cfg.dotsId ? document.getElementById(cfg.dotsId) : null;
        if (!track || !prevBtn || !nextBtn) return;

        var cards       = Array.from(track.children);
        var visible     = cfg.visible || 3;
        var idx         = 0;
        var maxIdx      = Math.max(0, cards.length - visible);

        // Créer les dots
        if (dotsEl) {
            for (var i = 0; i <= maxIdx; i++) {
                var dot = document.createElement('button');
                dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', 'Slide ' + (i + 1));
                (function(ii) {
                    dot.addEventListener('click', function () { goTo(ii); });
                })(i);
                dotsEl.appendChild(dot);
            }
        }

        function updateDots() {
            if (!dotsEl) return;
            var dots = dotsEl.querySelectorAll('.carousel-dot');
            dots.forEach(function (d, i) { d.classList.toggle('active', i === idx); });
        }

        function updateArrows() {
            prevBtn.disabled = idx <= 0;
            nextBtn.disabled = idx >= maxIdx;
        }

        function goTo(i) {
            idx = Math.max(0, Math.min(i, maxIdx));
            var cardW = cards[0].getBoundingClientRect().width;
            var gap   = parseInt(getComputedStyle(track).gap) || 30;
            track.style.transform = 'translateX(-' + (idx * (cardW + gap)) + 'px)';
            updateDots();
            updateArrows();
        }

        prevBtn.addEventListener('click', function () { goTo(idx - 1); });
        nextBtn.addEventListener('click', function () { goTo(idx + 1); });
        window.addEventListener('resize', function () { goTo(0); });
        updateArrows();
    }


    /* ================================================================
       3. CARROUSELS
       ================================================================ */
    makeCarousel({ trackId: 'ev-track', prevId: 'ev-prev', nextId: 'ev-next', dotsId: 'ev-dots', visible: 3 });
    makeCarousel({ trackId: 'pr-track', prevId: 'pr-prev', nextId: 'pr-next', dotsId: 'pr-dots', visible: 3 });


    /* ================================================================
       4. CARROUSEL PARTENAIRES
       ================================================================ */
    var ptTrack = document.getElementById('partners-track');
    var ptPrev  = document.getElementById('pt-prev');
    var ptNext  = document.getElementById('pt-next');

    if (ptTrack && ptPrev && ptNext) {
        var ptIdx = 0;
        var ptCards = Array.from(ptTrack.children);

        function ptVisible() {
            return window.innerWidth < 600 ? 2 : window.innerWidth < 900 ? 3 : 5;
        }
        function ptMax() { return Math.max(0, ptCards.length - ptVisible()); }

        function ptGoTo(i) {
            ptIdx = Math.max(0, Math.min(i, ptMax()));
            var cw  = ptCards[0].getBoundingClientRect().width;
            var gap = parseInt(getComputedStyle(ptTrack).gap) || 25;
            ptTrack.style.transform = 'translateX(-' + (ptIdx * (cw + gap)) + 'px)';
            ptPrev.disabled = ptIdx <= 0;
            ptNext.disabled = ptIdx >= ptMax();
        }

        ptPrev.addEventListener('click', function () { ptGoTo(ptIdx - 1); });
        ptNext.addEventListener('click', function () { ptGoTo(ptIdx + 1); });
        window.addEventListener('resize', function () { ptGoTo(0); });
        ptGoTo(0);
    }

}); // end DOMContentLoaded
