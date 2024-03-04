    // Highlight the layer
    var highlightLayer;
    function highlightFeature(e) {
      highlightLayer = e.target;
      if (e.target.feature.geometry.type === "LineString") {
        highlightLayer.setStyle({
          color: "#ffff00",
          opacity: 1,
          fillOpacity: 0.8,
          weight: 5,
        });
      } else {
        highlightLayer.setStyle({
          weight: 10,
          color: "#ff7a7a",
          dashArray: "",
          opacity: 0.5,
          //fillOpacity: 0.1
        });
      }
    }