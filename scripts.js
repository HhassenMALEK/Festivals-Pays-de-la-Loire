// Fonction pour récupérer et traiter les festivals par catégories
function festivalsParCatégories() {
  fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/exports/json")
    .then((response) => {
      return response.json();
    })
    .then((festivals) => {
      // festivals contient 7283 objets festival
      console.log(festivals); 
      let festFilter = festivals.filter(isPaysdeLaLoire); // contient 332 objets festival en Pays de la Loire
      let listbytheme = isDisciplineDominante(festFilter); // liste des festivals par types {[discipline, list],}
      let list = [];
      for ([key, value] of Object.entries(listbytheme)) {
        let obj = {};
        obj[key] = value.length;
        list.push(obj); // liste des disciplines avec le nombre de festivals correspondant
      }
      DoughnutChart(list); // appel du graphique en donut
    });
}

// Fonction pour récupérer et afficher les listes de festivals par catégories
function festivalsListParCategories() {
  fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/exports/json")
    .then((response) => {
      return response.json();
    })
    .then((festivals) => {
      // festivals contient 7283 objets festival
      let festFilter = festivals.filter(isPaysdeLaLoire); // contient 332 objets festival en Pays de la Loire
      let listbytheme = isDisciplineDominante(festFilter); // liste des festivals par types {[discipline, list],}
      let list = [];
      for ([key, value] of Object.entries(festFilter)) {
        let obj = {};
        obj[key] = value;
        list.push(obj); // liste des disciplines avec le nombre de festivals correspondant
      }
      affichageLists(list);
    });
}

// Fonction pour filtrer les festivals se déroulant en Pays de la Loire
function isPaysdeLaLoire(festival) {
  return festival.region_principale_de_deroulement === "Pays de la Loire";
}

// Fonction pour grouper les festivals par discipline dominante
function isDisciplineDominante(list) {
  let listGroupDiscipline = Object.groupBy(list, ({ discipline_dominante }) => discipline_dominante);
  return listGroupDiscipline;
}

// Fonction pour créer et afficher la carte
function createMap() {
  window.onload = function () {
    let map = L.map('map').setView([47.22105206554747, -1.5328920498252216], 8);

    // Ajout des différentes couches de tuiles (cartes)
    let googleStreets = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    let googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    let googleTraffic = L.tileLayer('https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // Ajouter la couche par défaut à la carte
    googleStreets.addTo(map);

    // Ajout du contrôle des couches à la carte
    L.control.layers({
      "Streets": googleStreets,
      "Satellites": googleSat,
      "Terrain": googleTerrain,
      "Traffic": googleTraffic,
    }).addTo(map);

    // Ajout des marqueurs à la carte
    markersData(map);
  };
}

// Fonction pour créer des icônes personnalisées pour les marqueurs
function createIcon(iconUrl) {
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
}

// Fonction pour ajouter des marqueurs à la carte en fonction de la catégorie du festival
function markers(map, festivalLat, festivalLng, festivalNames, festivalCategory, festivalWebSites) {
  // Définir les icônes pour chaque catégorie
  let iconMusic = createIcon("img/music-band.png");
  let iconSpectacle = createIcon("img/theatre.png");
  let iconLiterature = createIcon("img/livre-ouvert.png");
  let iconDigitalArts = createIcon("img/dessin-numerique.png");
  let iconAudioVisual = createIcon("img/television.png");
  let iconPluridisciplinaire = createIcon("img/tente-evenementielle.png");
  let defaultIcon = createIcon("img/espace-reserve.png");
  let iconHellfest = createIcon("img/lemmy1.png");

  // Boucle pour créer les marqueurs en fonction de la catégorie
  for (let i = 0; i < festivalCategory.length; i++) {
    let icon;
    // Sélectionner l'icône en fonction de la catégorie
    switch (festivalCategory[i]) {
      case "Musique":
        if (festivalNames[i] != "Hellfest Open Air") {
          icon = iconMusic;
        } else {
          // Marqueur spécifique pour Hellfest
          L.marker([47.09839244606988, -1.2655209162493293], { icon: iconHellfest }).addTo(map)
            .bindPopup(
              "<b>Nom :</b> " + "Hellfest Open Air" + "<br>" +
              "<b>Catégorie :</b> " + "Rock Metal" + "<br>" +
              "<b>Site Web :</b> <a href='https://www.hellfest.fr' target='_blank'>" + "www.hellfest.fr" + "</a>"
            );
          continue;
        }
        break;
      case "Spectacle vivant":
        icon = iconSpectacle;
        break;
      case "Livre, littérature":
        icon = iconLiterature;
        break;
      case "Arts visuels, arts numériques":
        icon = iconDigitalArts;
        break;
      case "Cinéma, audiovisuel":
        icon = iconAudioVisual;
        break;
      case "Pluridisciplinaire":
        icon = iconPluridisciplinaire;
        break;
      default:
        icon = defaultIcon;
        break;
    }
    // Ajouter le marqueur avec l'icône correspondante
    L.marker([festivalLat[i], festivalLng[i]], { icon: icon }).addTo(map)
      .bindPopup(
        "<b>Nom :</b> " + festivalNames[i] + "<br>" +
        "<b>Catégorie :</b> " + festivalCategory[i] + "<br>" +
        "<b>Site Web :</b> <a href='" + festivalWebSites[i] + "' target='_blank'>" + festivalWebSites[i] + "</a>"
      );
  }
}

// Fonction pour récupérer et ajouter les données des festivals à la carte
function markersData(map) {
  let festivalNames = [];
  let geocodageData = [];
  let festivalLat = [];
  let festivalLng = [];
  let festivalCategory = [];
  let festivalWebSites = [];

  fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/exports/json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // data contient 7283 objets festival
      let festFilter = data.filter(isPaysdeLaLoire); // festFilter contient 332 objets festival dans le Pays de la Loire

      // Boucles pour récupérer les coordonnées et noms des festivals
      for (let i = 0; i < festFilter.length; i++) {
        let result = festFilter[i];
        festivalNames.push(result.nom_du_festival);
      }

      for (let i = 0; i < festFilter.length; i++) {
        let result = festFilter[i];
        geocodageData.push(result.geocodage_xy);
      }

      for (let i = 0; i < festFilter.length; i++) {
        let result = festFilter[i];
        festivalLat.push(result.geocodage_xy.lat);
        festivalLng.push(result.geocodage_xy.lon);
      }

      for (let i = 0; i < festFilter.length; i++) {
        let result = festFilter[i];
        festivalCategory.push(result.discipline_dominante);
      }

      for (let i = 0; i < festFilter.length; i++) {
        let result = festFilter[i];
        festivalWebSites.push(result.site_internet_du_festival);
      }

      // Ajout des marqueurs à la carte
      markers(map, festivalLat, festivalLng, festivalNames, festivalCategory, festivalWebSites);
    });
}

document.addEventListener("DOMContentLoaded", function() {
  festivalsParCatégories();
  createMap();
});