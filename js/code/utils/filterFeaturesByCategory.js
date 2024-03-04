
function removeMiddleMarkers() {
    // Remove all markers from the middleMarkersGroup
        middleMarkersGroup.eachLayer(function(layer) {
        map.removeLayer(layer);
      });
    }
    
function filterFeaturesByCategory(category) {
    console.log("Filtering features by category:", category);

    map.eachLayer(function(layer) {
        if (layer === layer_OpenRailwayMap_1 && layer === layer_OpenStreetMap_0 && layer === layer_vg2500_bld_2) {
            map.removeLayer(layer);
        }
    });

     if (category === "alle") {
        map.addLayer(layer_Projekt_linie);
        map.addLayer(cluster_Projekt_punkt);
        createMiddleMarkers();
        map.fitBounds(bounds_group.getBounds());
        return;
    }
    map.fitBounds(bounds_group.getBounds()); 
    
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
            console.log(layer)
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
            console.log(layer)
        } else {
            layer.setStyle({ opacity: 0, fillOpacity: 0 });
            map.removeLayer(layer); // Remove layers that don't match the selected category
        }
    });

    if (category !== "alle") {
        map.removeLayer(cluster_Projekt_punkt);
        map.removeLayer(layer_Projekt_punkt);
        map.removeLayer(layer_Projekt_linie);
        removeMiddleMarkers();
    }
}

   