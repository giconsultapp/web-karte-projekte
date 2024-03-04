function removeMiddleMarkers() {
  // Remove all markers from the middleMarkersGroup
  middleMarkersGroup.eachLayer(function (layer) {
    map.removeLayer(layer);
  });
}

function filterFeaturesByCategory(category) {
  console.log("Filtering features by category:", category);

  map.eachLayer(function (layer) {
    if (
      !(layer instanceof L.TileLayer) &&
      layer.options.pane !== "pane_vg2500_bld_2"
    ) {
      map.removeLayer(layer);
    }
  });
  /*     map.fitBounds(bounds_group.getBounds());  */
  if (category === "alle") {
    map.addLayer(layer_Projekt_linie);
    map.addLayer(cluster_Projekt_punkt);
    createMiddleMarkers(json_Projekt_linie);
  } else {
    layer_Projekt_linie.eachLayer(function (layer) {
      if (layer.feature && layer.feature.properties["Kategorie"] === category) {
        layer.addTo(map);
        createSingleMiddleMarker(layer.feature);
      }
    });
    layer_Projekt_punkt.eachLayer(function (layer) {
      if (layer.feature && layer.feature.properties["Kategorie"] === category) {
        layer.addTo(map);
      }
    });
  } 

  /* else {
        map.removeLayer(cluster_Projekt_punkt);
        map.removeLayer(layer_Projekt_punkt);
        map.removeLayer(layer_Projekt_linie);
        removeMiddleMarkers();
    } */

  /*     
    // Filter features from layer_Projekt_linie
    layer_Projekt_linie.eachLayer(function(layer) {
        const featureCategory = layer.feature.properties["Kategorie"];
        if (featureCategory === category) {
            const style = {
                color: 'red', 
                weight: 6,
                opacity: 1,
            };
            layer.setStyle(style);
            map.addLayer(layer);
        } else {
            map.removeLayer(layer); // Remove layers that don't match the selected category
            layer.setStyle({ opacity: 0, fillOpacity: 0 });
        }
    });

    // Filter features from layer_Projekt_punkt
    layer_Projekt_punkt.eachLayer(function(layer) {
        const featureCategory = layer.feature.properties["Kategorie"];
        if (featureCategory === category) {
            const style = {
                color: 'red', 
                weight: 10,
                opacity: 1,
            };
            layer.setStyle(style);
            map.addLayer(layer);
        } else {
            layer.setStyle({ opacity: 0, fillOpacity: 0 });
            map.removeLayer(layer); // Remove layers that don't match the selected category
        }
    }); */
}
