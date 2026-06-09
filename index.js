/* ==========================================================================
   INDEX.JS — Page d'accueil ESMaroc
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ================================================================
       0. BURGER MENU — solution définitive
       On supprime TOUS les anciens listeners en clonant le bouton,
       puis on rebranche proprement.
       ================================================================ */
    var oldBtn = document.getElementById('burger-btn');
    var mainNav = document.getElementById('main-nav');

    if (oldBtn && mainNav) {
        /* Cloner = détruire tous les listeners existants (script.js inclus) */
        var burgerBtn = oldBtn.cloneNode(true);
        oldBtn.parentNode.replaceChild(burgerBtn, oldBtn);

        function openNav() {
            mainNav.classList.add('active');
            var i = burgerBtn.querySelector('i');
            if (i) { i.className = 'fas fa-times'; }
        }
        function closeNav() {
            mainNav.classList.remove('active');
            var i = burgerBtn.querySelector('i');
            if (i) { i.className = 'fas fa-bars'; }
        }

        burgerBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            mainNav.classList.contains('active') ? closeNav() : openNav();
        });

        /* Fermer en cliquant en dehors */
        document.addEventListener('click', function (e) {
            if (mainNav.classList.contains('active') &&
                !mainNav.contains(e.target) &&
                !burgerBtn.contains(e.target)) {
                closeNav();
            }
        });

        /* Dropdown ESMaroc sur mobile */
        var ddTrigger = mainNav.querySelector('.dropdown-trigger');
        var ddWrap    = mainNav.querySelector('.dropdown');
        if (ddTrigger && ddWrap) {
            ddTrigger.addEventListener('click', function (e) {
                if (window.innerWidth <= 900) {
                    e.preventDefault();
                    e.stopPropagation();
                    ddWrap.classList.toggle('open');
                }
            });
        }
    }


    /* ================================================================
       1. BARRE DE RECHERCHE LIVE
       ================================================================ */
    var siteIndex = [
        { title: 'Accueil',                  url: 'index.html',                  kw: 'accueil home' },
        { title: 'Qui sommes-nous ?',         url: 'qui-sommes-nous.html',        kw: 'association mission valeurs présentation' },
        { title: 'Notre Histoire & Vision',   url: 'histoire.html',               kw: 'histoire vision fondation' },
        { title: 'Notre Équipe',              url: 'equipe.html',                 kw: 'équipe membres directeur' },
        { title: 'Rapports',                  url: 'rapports.html',               kw: 'rapports annuels bilans' },
        { title: 'Événements',                url: 'evenements.html',             kw: 'événements salon emploi souk startup café école' },
        { title: 'Projets',                   url: 'projets.html',                kw: 'projets OIM DAPP UPSHIFT NAWAT RESTART' },
        { title: 'École E-learning',          url: 'elearning.html',              kw: 'elearning formation ligne afrique' },
        { title: 'Partenaires',               url: 'partenaires.html',            kw: 'partenaires ANAPEC UE OIM soleterre EFE' },
        { title: 'Contact',                   url: 'contact.html',                kw: 'contact adresse téléphone email rabat tanger formulaire' },
        { title: 'Projet UPSHIFT',            url: 'upshift.html',                kw: 'upshift unicef tanger jeunes' },
        { title: 'Projet NAWAT',              url: 'nawat.html',                  kw: 'nawat maroc pme tpe' },
        { title: 'Projet RESTART',            url: 'restart.html',                kw: 'restart startups durables business plan' },
        { title: 'Projet FLOWER',             url: 'flower.html',                 kw: 'flower femmes maroc tunisie' },
        { title: 'Projet OIM',                url: 'oim.html',                    kw: 'oim migration insertion migrants' },
        { title: 'Projet JISR',               url: 'jisr.html',                   kw: 'jisr femmes tanger incubateur' },
        { title: 'Projet DAPP',               url: 'dapp.html',                   kw: 'dapp danida mena emploi' },
        { title: 'Salon de l\'Emploi',        url: 'evenement-salon-emploi.html', kw: 'salon emploi recrutement' },
        { title: 'Souk des Startups',         url: 'souk.html',                   kw: 'souk startup innovation' },
        { title: 'École d\'Été ESMaroc',      url: 'ecoledete.html',              kw: 'école été programme porteurs projets' },
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
                if (searchInput)   searchInput.value = '';
                if (searchResults) searchResults.innerHTML = '';
            });
        }
        if (searchInput && searchResults) {
            searchInput.addEventListener('input', function () {
                var q = this.value.trim().toLowerCase();
                searchResults.innerHTML = '';
                if (q.length < 2) return;
                var hits = siteIndex.filter(function (p) {
                    return p.title.toLowerCase().indexOf(q) > -1 || p.kw.toLowerCase().indexOf(q) > -1;
                });
                if (!hits.length) {
                    searchResults.innerHTML = '<p class="search-no-result">Aucun résultat pour « ' + q + ' »</p>';
                    return;
                }
                hits.slice(0, 6).forEach(function (p) {
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

        var cards   = Array.from(track.children);
        var visible = cfg.visible || 3;
        var idx     = 0;

        function maxIdx() {
            return Math.max(0, cards.length - visible);
        }

        /* Créer les dots */
        if (dotsEl) {
            for (var i = 0; i <= maxIdx(); i++) {
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
            dotsEl.querySelectorAll('.carousel-dot').forEach(function (d, i) {
                d.classList.toggle('active', i === idx);
            });
        }

        function updateArrows() {
            prevBtn.disabled = idx <= 0;
            nextBtn.disabled = idx >= maxIdx();
        }

        function goTo(i) {
            idx = Math.max(0, Math.min(i, maxIdx()));
            /* Recalcule à chaque goTo pour responsive */
            var cardW = cards[0].getBoundingClientRect().width;
            var gap   = parseInt(getComputedStyle(track).gap) || 30;
            track.style.transform = 'translateX(-' + (idx * (cardW + gap)) + 'px)';
            updateDots();
            updateArrows();
        }

        prevBtn.addEventListener('click', function () { goTo(idx - 1); });
        nextBtn.addEventListener('click', function () { goTo(idx + 1); });
        window.addEventListener('resize', function () { idx = 0; goTo(0); });
        updateArrows();
    }


    /* ================================================================
       3. LANCER LES CARROUSELS
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
        var ptIdx   = 0;
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

}); /* end DOMContentLoaded */
