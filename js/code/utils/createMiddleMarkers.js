function createSingleMiddleMarker(feature) {
    const geometry = feature.geometry;
    if (geometry.type === "MultiLineString") {
      const lines = geometry.coordinates; // Get all the lines
      const totalPoints = lines.reduce(
        (acc, line) => acc + line.length,
        0
      );
      const middleIndex = Math.floor(totalPoints / 2);

      let count = 0;
      for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length - 1; j++) {
          if (count === middleIndex) {
            const left = lines[i][j];
            const right = lines[i][j + 1];

            const newLatLng = {
              lat: (left[1] + right[1]) / 2,
              lng: (left[0] + right[0]) / 2,
            };

            const redMarkerIcon = L.divIcon({
              className: "red-marker",
              iconAnchor: [12, 35],
              html: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="41" viewBox="0 0 18 55"> \
                  <path fill="#ffffff" stroke="#ff0000" stroke-width="2" d="M12 0C5.375 0 0 5.373 0 12c0 11.214 12 29 12 29s12-17.786 12-29c0-6.627-5.373-12-12-12zm0 17.5c-2.481 0-4.5-2.019-4.5-4.5s2.019-4.5 4.5-4.5 4.5 2.019 4.5 4.5-2.019 4.5-4.5 4.5z"/>\
                  </svg>',
            });

            const marker = L.marker(newLatLng, {
                icon: redMarkerIcon,
            }).addTo(map);
            pop_Projekt_aktuell_linie_3(feature, marker);
            middleMarkersGroup.addLayer(marker);
            return; // Stop after placing the middle marker
          }
          count++;
        }
      }
      console.error(
        "Could not find middle point for feature:",
        feature.properties.id
      );
  } else {
    console.error("Unsupported geometry type:", geometry.type);
  }
}

function createMiddleMarkers(layer) {
    layer.features.forEach((feature) => {
      createSingleMiddleMarker(feature)
});
}
