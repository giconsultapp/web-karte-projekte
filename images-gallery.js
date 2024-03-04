const images = [
  {
    src: "images/gi-consult-Gleiserfassung-DSD-Halle-Saale2.jpg",
    alt: "Streckennetz",
    overlay: "Bestandserfassung für die Digitale Schiene - ein Pilotprojekt",
  },
  {
    src: "images/21G0957100.jpg",
    alt: "Streckennetz",
    overlay: "Reaktivierung der Siemensbahn in Berlin",
  },
  {
    src: "images/25G0381100.jpg",
    alt: "Streckennetz",
    overlay:
      "Neubaustrecke (NBS) Frankfurt Mannheim, Abschnitt Mannheim Lorsch",
  },
  {
    src: "images/30G0163100.jpg",
    alt: "",
    overlay: "Strecke 6107/6399 ABS Hannover-Berlin",
  },
  {
    src: "images/Weiseritzlok-im-Bahnhof.jpg",
    alt: "Streckennetz",
    overlay: "Wiedererichtung Weißeritztalbahn",
  },
  {
    src: "images/gi-consult_WestspangePA3-8-scaled.jpg",
    alt: "Streckennetz",
    overlay:
      "Ausbau Knoten Köln-Westspange PA3&Eifelstrecke (Hürth-Karlscheuren-Euskirchen)",
  },
];

document.addEventListener("DOMContentLoaded", function () {
  const imageGallery = document.getElementById("image-gallery");

  // Loop through the images array and create image items
  images.forEach(function (image, index) {
    const imageItem = document.createElement("div");
    imageItem.classList.add("image-item");
    imageItem.dataset.markerId = `marker${index + 1}`;

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = image.alt;

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.textContent = image.overlay;

    imageItem.appendChild(img);
    imageItem.appendChild(overlay);

    imageGallery.querySelector(".image-grid").appendChild(imageItem);
  });

  // Add event listeners to image items
  document.querySelectorAll(".image-item").forEach(function (item) {
    item.addEventListener("click", function () {
      var imageName = item.querySelector("img").src.split("/").pop(); // Extract the image name from the src URL
      var feature = findFeatureById(imageName);
      console.log("Clicked Feature:", feature);
      if (feature) {
        if (feature.geometry.type === "Point") {
          console.log("Point Coordinates:", feature.geometry.coordinates);
          map.setView(
            [feature.geometry.coordinates[1], feature.geometry.coordinates[0]],
            12
          );
        } else {
          var bounds = L.geoJSON(feature).getBounds();
          map.fitBounds(bounds, { maxZoom: 13 });
        }
        hideOtherFeatures(feature);
      }
    });
  });
});

// Define findFeatureById function
function findFeatureById(id) {
  // For layer_Projekt_linie
  var linieFeatures = layer_Projekt_linie.getLayers();
  for (var i = 0; i < linieFeatures.length; i++) {
    var feature = linieFeatures[i];
    if (
      feature &&
      feature.feature &&
      feature.feature.properties &&
      feature.feature.properties.Projektnummer &&
      feature.feature.properties.Projektnummer === imageNameToProjektnr(id)
    ) {
      return feature.feature;
    }
  }

  // For layer_Projekt_punkt
  var punktFeatures = layer_Projekt_punkt.getLayers();
  for (var j = 0; j < punktFeatures.length; j++) {
    var feature = punktFeatures[j];
    if (
      feature &&
      feature.feature &&
      feature.feature.properties &&
      feature.feature.properties.Projektnummer &&
      feature.feature.properties.Projektnummer === imageNameToProjektnr(id)
    ) {
      return feature.feature;
    }
  }
  console.log("not found");
  return null;
}

function imageNameToProjektnr(imageName) {
  // Extract the Projektnr from the image name
  // Modify this logic based on your image naming convention
  var imageNameParts = imageName.split("/").pop().split(".");
  var projektnr = imageNameParts[0]; // Assuming Projektnr is the first part of the image name
  return projektnr;
}

function hideOtherFeatures(feature) {
  const allFeatures = [
    ...layer_Projekt_linie.getLayers(),
    ...layer_Projekt_punkt.getLayers(),
  ];

  allFeatures.forEach(function (layer) {
    if (feature && layer.feature === feature) {
      console.log(feature);
      console.log(layer.feature);
      // Show the desired feature
      layer.setStyle({ color: "red", opacity: 1, fillOpacity: 1 });
    } else {
      // Hide other features
      layer.setStyle({ opacity: 0, fillOpacity: 0 });
    }
  });
}

document.querySelectorAll(".category-button").forEach(function (button) {
  button.addEventListener("click", function () {
    const category = button.dataset.category;
    filterImagesByCategory(category);
  });
});

function filterImagesByCategory(category) {
  console.log("Filtering images by category:", category);

  const imageItems = document.querySelectorAll(".image-item");

  imageItems.forEach(function (item) {
    const imgAlt = item.querySelector("img").alt;
    if (category === "alle" || imgAlt === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
