const images = [
  {
    src: "images/gi-consult-Gleiserfassung-DSD-Halle-Saale2.jpg",
    alt: "Image 1",
    overlay: "Bestandserfassung für die Digitale Schiene - ein Pilotprojekt",
  },
  {
    src: "images/21G0957100.jpg",
    alt: "Image 2",
    overlay: "Reaktivierung der Siemensbahn in Berlin",
  },
  {
    src: "images/25G0381100.jpg",
    alt: "Image 3",
    overlay:
      "Neubaustrecke (NBS) Frankfurt Mannheim, Abschnitt Mannheim Lorsch",
  },
  {
    src: "images/30G0163100.jpg",
    alt: "Image 4",
    overlay: "Strecke 6107/6399 ABS Hannover-Berlin",
  },
  {
    src: "images/Weiseritzlok-im-Bahnhof.jpg",
    alt: "Image 5",
    overlay: "Wiedererichtung Weißeritztalbahn",
  },
  {
    src: "images/gi-consult_WestspangePA3-8-scaled.jpg",
    alt: "Image 6",
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
  var featureToShow = feature;
  // Assuming layer_Projekt_linie is your GeoJSON layer
  layer_Projekt_linie.eachLayer(function (layer) {
    // Check if the layer is not equal to the featureToShow
    if (layer.feature !== featureToShow) {
      // Hide the layer
      layer.setStyle({ opacity: 0, fillOpacity: 0 });
    } else {
      // Show the desired feature
      layer.setStyle({ color: "red", opacity: 1, fillOpacity: 1 });
    }
  });
}
