function pop_vg2500_bld_2(feature, layer) {
  var highlightLayer;
  var autolinker = new Autolinker({
    truncate: { length: 30, location: "smart" },
  });
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
  layer.on({
    mouseout: function (e) {
      for (i in e.target._eventParents) {
        e.target._eventParents[i].resetStyle(e.target);
      }
    },
    mouseover: highlightFeature,
  });
  var popupContent =
    '<table>\
                      <tr>\
                          <td colspan="2">' +
    (feature.properties["USE"] !== null
      ? autolinker.link(feature.properties["USE"].toLocaleString())
      : "") +
    '</td>\
                      </tr>\
                      <tr>\
                          <th scope="row">RS</th>\
                          <td>' +
    (feature.properties["RS"] !== null
      ? autolinker.link(feature.properties["RS"].toLocaleString())
      : "") +
    '</td>\
                      </tr>\
                      <tr>\
                          <td colspan="2">' +
    (feature.properties["RS_ALT"] !== null
      ? autolinker.link(feature.properties["RS_ALT"].toLocaleString())
      : "") +
    '</td>\
                      </tr>\
                      <tr>\
                          <td colspan="2">' +
    (feature.properties["GEN"] !== null
      ? autolinker.link(feature.properties["GEN"].toLocaleString())
      : "") +
    '</td>\
                      </tr>\
                      <tr>\
                          <td colspan="2">' +
    (feature.properties["SHAPE_LENG"] !== null
      ? autolinker.link(feature.properties["SHAPE_LENG"].toLocaleString())
      : "") +
    '</td>\
                      </tr>\
                      <tr>\
                          <td colspan="2">' +
    (feature.properties["SHAPE_AREA"] !== null
      ? autolinker.link(feature.properties["SHAPE_AREA"].toLocaleString())
      : "") +
    "</td>\
                      </tr>\
                  </table>";
  layer.bindPopup(popupContent, { maxHeight: 400 });
}
