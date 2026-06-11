/* ==========================================================================
   HEADER.JS — Script global du header ESMaroc
   À inclure sur TOUTES les pages via : <script src="header.js"></script>
   Gère : barre de recherche live + dropdown mobile
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ================================================================
       BARRE DE RECHERCHE LIVE
       ================================================================ */
    var siteIndex = [
        { title: 'Accueil',                  url: 'index.html',                  kw: 'accueil home esmaroc' },
        { title: 'Qui sommes-nous ?',         url: 'qui-sommes-nous.html',        kw: 'association mission valeurs présentation' },
        { title: 'Notre Histoire & Vision',   url: 'histoire.html',               kw: 'histoire vision fondation origine' },
        { title: 'Notre Équipe',              url: 'equipe.html',                 kw: 'équipe membres directeur' },
        { title: 'Rapports',                  url: 'rapports.html',               kw: 'rapports annuels bilans documents' },
        { title: 'Événements',                url: 'evenements.html',             kw: 'événements salon emploi souk startup café école été experts' },
        { title: 'Projets',                   url: 'projets.html',                kw: 'projets OIM DAPP UPSHIFT NAWAT RESTART JISR FLOWER' },
        { title: 'École E-learning',          url: 'elearning.html',              kw: 'elearning formation en ligne afrique associations' },
        { title: 'Partenaires',               url: 'partenaires.html',            kw: 'partenaires ANAPEC UE OIM CERFA soleterre EFE' },
        { title: 'Contact',                   url: 'contact.html',                kw: 'contact adresse téléphone email rabat tanger formulaire' },
        { title: 'Projet UPSHIFT',            url: 'upshift.html',                kw: 'upshift unicef tanger jeunes entrepreneuriat' },
        { title: 'Projet NAWAT',              url: 'nawat.html',                  kw: 'nawat maroc pme tpe renforcement' },
        { title: 'Projet RESTART',            url: 'restart.html',                kw: 'restart startups durables business plan subventions' },
        { title: 'Projet FLOWER',             url: 'flower.html',                 kw: 'flower femmes maroc tunisie formation revenus' },
        { title: 'Projet OIM / Migration',    url: 'oim.html',                    kw: 'oim migration insertion migrants coopératives' },
        { title: 'Projet JISR',               url: 'jisr.html',                   kw: 'jisr femmes tanger incubateur autonomisation' },
        { title: 'Projet DAR-LIBTIKAR',       url: 'darlibtikar.html',            kw: 'dar libtikar incubation innovation fondation' },
        { title: 'Projet DAPP',               url: 'dapp.html',                   kw: 'dapp danida mena emploi droits humains' },
        { title: 'Projet Work 4 Life',        url: 'w4l.html',                    kw: 'w4l work for life migrants coopératives UE' },
        { title: 'Salon de l\'Emploi',        url: 'evenement-salon-emploi.html', kw: 'salon emploi recrutement entreprises' },
        { title: 'Souk des Startups',         url: 'souk.html',                   kw: 'souk startup innovation maroc afrique' },
        { title: 'École d\'Été ESMaroc',      url: 'ecoledete.html',              kw: 'école été programme immersif porteurs projets' },
        { title: 'Experts Connect',           url: 'experts.html',                kw: 'experts connect webinaire mentorat compétences' },
        { title: 'Portes Ouvertes',           url: 'portesouvertes.html',         kw: 'portes ouvertes CV entretien insertion emploi' },
        { title: 'Coopération Sud-Sud',       url: 'sudsud.html',                 kw: 'sud sud côte ivoire sénégal ouganda malawi' },
    ];

    var searchToggle  = document.getElementById('search-toggle');
    var searchBar     = document.getElementById('search-bar');
    var searchInput   = document.getElementById('search-input');
    var searchClose   = document.getElementById('search-close');
    var searchResults = document.getElementById('search-results');

    if (!searchToggle || !searchBar) return; /* header non présent sur cette page */

    /* Ouvrir / fermer */
    searchToggle.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var isOpen = searchBar.classList.toggle('open');
        if (isOpen && searchInput) searchInput.focus();
    });

    if (searchClose) {
        searchClose.addEventListener('click', function () {
            searchBar.classList.remove('open');
            if (searchInput)   searchInput.value = '';
            if (searchResults) searchResults.innerHTML = '';
        });
    }

    /* Recherche live */
    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function () {
            var q = this.value.trim().toLowerCase();
            searchResults.innerHTML = '';
            if (q.length < 2) return;

            var hits = siteIndex.filter(function (p) {
                return p.title.toLowerCase().indexOf(q) > -1 ||
                       p.kw.toLowerCase().indexOf(q) > -1;
            });

            if (!hits.length) {
                searchResults.innerHTML =
                    '<p class="search-no-result">Aucun résultat pour «\u00a0' + q + '\u00a0»</p>';
                return;
            }

            hits.slice(0, 7).forEach(function (p) {
                var d = document.createElement('div');
                d.className = 'search-result-item';
                d.innerHTML =
                    '<i class="fas fa-arrow-right" style="margin-right:8px;font-size:.7rem;color:var(--yellow)"></i>'
                    + p.title;
                d.addEventListener('click', function () {
                    window.location.href = p.url;
                });
                searchResults.appendChild(d);
            });
        });

        /* Naviguer avec Entrée (premier résultat) */
        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                var first = searchResults.querySelector('.search-result-item');
                if (first) first.click();
            }
            if (e.key === 'Escape') {
                searchBar.classList.remove('open');
            }
        });
    }

    /* Fermer en cliquant en dehors */
    document.addEventListener('click', function (e) {
        if (!searchBar.contains(e.target) && e.target !== searchToggle) {
            searchBar.classList.remove('open');
        }
    });


    /* ================================================================
       DROPDOWN ESMAROC — survol desktop, clic mobile
       (le survol est déjà géré en CSS ; on ajoute le clic mobile)
       ================================================================ */
    var dropdown = document.querySelector('.dropdown');
    var trigger  = document.querySelector('.dropdown-trigger');

    if (dropdown && trigger) {
        trigger.addEventListener('click', function (e) {
            /* Sur mobile seulement */
            if (window.innerWidth <= 900) {
                e.preventDefault();
                e.stopPropagation();
                dropdown.classList.toggle('open');
            }
        });

        document.addEventListener('click', function (e) {
            if (window.innerWidth <= 900 &&
                !dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
            }
        });
    }

}); /* end DOMContentLoaded */
