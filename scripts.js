function festivalsPaysLoire() {
  let ulElement = document.querySelector("dd")
  fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/exports/json").then((response) => {
    return response.json()
  }).then((festivals) => {
    //console.log(festivals)
    for (let festival of festivals.results) {
      let liElement = document.createElement("li")
      liElement.innerText = festival.nom_du_festival
      liElement.innerText += " || " + festival.discipline_dominante
      ulElement.appendChild(liElement)
    }
  })
}

function festivalsLoireAtlantique() {
  const trElement = document.querySelector("tr")
  fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/exports/json").then((response) => {
    return response.json()
  }).then((festivals) => {
    console.log(festivals)
    for (const festival of festivals.results) {
      const thElement = document.createElement("li")

      thElement.innerText = festival.nom_du_festival
      liElement2.innerText = festival.
        trElement.appendChild(liElement)
      trElement.appendChild(liElement2)
    }
  })
}
function festivalsParCatégories() {
  fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/exports/json").then((response) => {
    return response.json()
  }).then((festivals) => { //festivals contient 7283 objets festival
    festFilter = festivals.filter(isPaysdeLaLoire) // contient 332 objets festival en pays de la loire
    let listbytheme = isDisciplineDominante(festFilter) // liste des festivals par types {[discipline, list],}
    let list=[]
    for([key, value] of Object.entries(listbytheme)){
      let obj={}
      obj[key]= value.length
      list.push( obj) // liste des disciplines avec le nombre de festivals correspondant 
  }
DoughnutChart(list)// appel du piechart
  })
}
function festivalsListParCategories() {
  fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/exports/json").then((response) => {
    return response.json()
  }).then((festivals) => { //festivals contient 7283 objets festival
    festFilter = festivals.filter(isPaysdeLaLoire) // contient 332 objets festival en pays de la loire
    let listbytheme = isDisciplineDominante(festFilter) // liste des festivals par types {[discipline, list],}
    //console.log(listbytheme)
  //console.log(listbytheme)
  let list=[]
    for([key, value] of Object.entries(festFilter)){
      let obj={}
      obj[key]= value
      list.push( obj) // liste des disciplines avec le nombre de festivals correspondant 
  }
  //console.log(list)
  affichageLists(list) 
  })
}
/* function affichageLists(list) {
  let listvalue=[]
  let ulElement = document.querySelector("dd")
  for(value of list){
    listvalue.push(Object.values(value).join()) // liste 
    //liElement.innerText += " || " + festival.discipline_dominante
  }
  console.log(`${listvalue}`)
  let liElement = document.createElement("li")
    liElement.innerText = listvalue.nom_du_festival
    ulElement.appendChild(liElement)
  //console.log(listvalue)
      
  } */

/* list = [163, 73, 44, 25, 16, 11]
function anglesCamembert(total, valeurs) {
  valeurs.forEach(element => {
    pourcentage = (100 * element) / total
    angle = (360 * pourcentage) / 100
    console.log(pourcentage, angle)
  });
} */

function isPaysdeLaLoire(list) {

  return list.region_principale_de_deroulement === "Pays de la Loire"
}

/* function isMusic(list) {
  return list.discipline_dominante === "Musique"
}
function isLivres(list) {
  return list.discipline_dominante === "Livre, littérature"
}
 */
function isDisciplineDominante(list) {
  let listGroupDiscipline = Object.groupBy(list, ({ discipline_dominante }) => discipline_dominante);
  //console.log(listGroupDiscipline)
  return listGroupDiscipline

}

/* function festivals() {
  tailleList = []
  let ulElement = document.querySelector("dd")
  fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/exports/json").then((response) => {
    return response.json()
  }).then((festivals) => { //festivals contient 7283 objets festival
    festFilter = festivals.filter(isPaysdeLaLoire) // contient 332 objets festival en pays de la loire
    musicFilter = festFilter.filter(isMusic) // 163 festival de musique du pays de la loire
    let listbytheme = isDisciplineDominante(festFilter)

    //console.log(listbytheme)
    tailleList = musicFilter.length //taille de la liste des festival de musique du pays de la loire
    for (let festival of musicFilter) {

      //affiche chacun d'eux avec 
      let liElement = document.createElement("li")
      liElement.innerText = festival.nom_du_festival //leur nom
      liElement.innerText += " || " + festival.discipline_dominante // leur thème
      ulElement.appendChild(liElement) //affiche chaque ligne entre les balises ul de la page index
    }
    return tailleList // nombre de festival de musique du pays de la loire
    //console.log(tailleList)
  });

} */

function createMap() {
  window.onload = function () {

    let map = L.map('map').setView([47.22105206554747, -1.5328920498252216], 8);

    //carte streets
    let googleStreets = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 20,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    //carte sattelite
    let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    //carte Terrain
    let googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    //carte de traffic
    let googleTraffic = L.tileLayer('https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}', {
      maxZoom: 20,

      subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    // Ajouter les couches de tuiles à la carte
    googleStreets.addTo(map);
    L.control.layers({
      "Streets": googleStreets,
      "Satellites": googleSat,
      "Terrain": googleTerrain,
      "Traffic": googleTraffic,
    }).addTo(map);
    markersData(map)
  }
}
function createIcon(iconUrl) {
  return L.icon({
    iconUrl: iconUrl,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });
}

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
        if (festivalNames[i] != "Hellfest Open Air"){
          icon = iconMusic         
        } else{
             //Hellfest marcker
          L.marker([47.09839244606988, -1.2655209162493293], { icon: iconHellfest }).addTo(map)
          .bindPopup(
          "<b>Nom :</b> " + "Hellfest Open Air" + "<br>" +
          "<b>Catégorie :</b> " + "Rock MEtal" + "<br>" +
          "<b>Site Web :</b> <a href='" + "www.Hellfest.fr"+ "' target='_blank'>" + "www.Hellfest.fr" + "</a>"
        );
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
        icon = iconPluridisciplinaire ;
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
function markersData(map) {

  let festivalNames = [];
  let geocodageData = [];
  let festivalLat = [];
  let festivalLng = [];
  let festivalCategory = [];
  let festivalWebSites = [];

  fetch("https://data.culture.gouv.fr/api/explore/v2.1/catalog/datasets/festivals-global-festivals-_-pl/exports/json").then((response) => {
    return response.json()
  }).then((data)=> { //festivals contient 7283 objets festival
    let festFilter = data.filter(isPaysdeLaLoire) //festFilter contient 332 objets festival dans le pays de la loire
   
    // boucles pour récupérer les coordonnées et noms des festivals + push des données dans les tableaux festivalsNames geocodageData  festivalLng festivalLat
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
        festivalCategory.push(result.discipline_dominante)

      }
      for (let i = 0; i < festFilter.length; i++) {
        let result = festFilter[i];
      }
      markers(map, festivalLat, festivalLng, festivalNames, festivalCategory, festivalWebSites)
    });
}


