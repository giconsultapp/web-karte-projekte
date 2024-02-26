// Popup for point features
const pop_Projekt_punkt = (feature, layer) => {
  layer.on({
    mouseout: function (e) {
      for (i in e.target._eventParents) {
        if (e.target._eventParents[i].resetStyle) {
          e.target._eventParents[i].resetStyle(e.target);
        }
      }
    },
    mouseover: highlightFeature,
  });
  const popupContent =
    '<table>\
                    <tr>\
                        <th scope="row">Streckennummer</th>\
                        <td>' +
    (feature.properties["Streckennummer"] !== null
      ? autolinker.link(`${feature.properties["Streckennummer"]}`)
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Kilometer</th>\
                        <td>' +
    (feature.properties["Kilometer"] !== null
      ? autolinker.link(feature.properties["Kilometer"].toLocaleString())
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Projektnummer</th>\
                        <td>' +
    (feature.properties["Projektnummer"] !== null
      ? autolinker.link(feature.properties["Projektnummer"].toLocaleString())
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Auftraggeber</th>\
                        <td>' +
    (feature.properties["Auftraggeber"] !== null
      ? autolinker.link(feature.properties["Auftraggeber"].toLocaleString())
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Auftragswert (netto)</th>\
                        <td>' +
    (feature.properties["Auftragswert (netto)"] !== null
      ? autolinker.link(
          feature.properties["Auftragswert (netto)"].toLocaleString()
        )
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Datum</th>\
                        <td>' +
    (feature.properties["Datum"] !== null
      ? autolinker.link(feature.properties["Datum"].toLocaleString())
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Projektbezeichnung</th>\
                        <td>' +
    (feature.properties["Projektbezeichnung"] !== null
      ? autolinker.link(
          feature.properties["Projektbezeichnung"].toLocaleString()
        )
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Bahnhof</th>\
                        <td>' +
    (feature.properties["Bahnhof"] !== null
      ? autolinker.link(feature.properties["Bahnhof"].toLocaleString())
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Kategorie</th>\
                        <td>' +
    (feature.properties["Kategorie"] !== null
      ? autolinker.link(feature.properties["Kategorie"].toLocaleString())
      : "") +
    "</td>\
                    </tr>\
                </table>";
  layer.bindPopup(popupContent, { maxHeight: 400 });
};

// Popup for line features
const pop_Projekt_aktuell_linie_3 = (feature, layer) => {
  layer.on({
    mouseout: function (e) {
      for (i in e.target._eventParents) {
        if (e.target._eventParents[i].resetStyle) {
          e.target._eventParents[i].resetStyle(e.target);
        }
      }
    },
    mouseover: highlightFeature,
  });

  var popupContent =
    '<table>\
                    <tr>\
                        <th scope="row">Streckennummer</th>\
                        <td>' +
    (feature.properties["Streckennummer"] !== null
      ? autolinker.link(`${feature.properties["Streckennummer"]}`)
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Projektnummer</th>\
                        <td>' +
    (feature.properties["Projektnummer"] !== null
      ? autolinker.link(feature.properties["Projektnummer"].toLocaleString())
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Auftraggeber</th>\
                        <td>' +
    (feature.properties["Auftraggeber"] !== null
      ? autolinker.link(feature.properties["Auftraggeber"].toLocaleString())
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Auftragswert (netto)</th>\
                        <td>' +
    (feature.properties["Auftragswert (netto)"] !== null
      ? autolinker.link(
          feature.properties["Auftragswert (netto)"].toLocaleString()
        )
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Datum</th>\
                        <td>' +
    (feature.properties["Datum"] !== null
      ? autolinker.link(feature.properties["Datum"].toLocaleString())
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Kilometer (von - bis)</th>\
                        <td>' +
    (feature.properties["Kilometer (von - bis)"] !== null
      ? autolinker.link(
          feature.properties["Kilometer (von - bis)"].toLocaleString()
        )
      : "") +
    '</td>\
                    </tr>\
                    <tr>\
                        <th scope="row">Projektbezeichnung</th>\
                        <td>' +
    (feature.properties["Projektbezeichnung"] !== null
      ? autolinker.link(
          feature.properties["Projektbezeichnung"].toLocaleString()
        )
      : "") +
    '</td>\
      </tr>\
      <tr>\
          <th scope="row">Kategorie</th>\
          <td>' +
    (feature.properties["Kategorie"] !== null
      ? autolinker.link(feature.properties["Kategorie"].toLocaleString())
      : "") +
    "</td>\
      </tr>\
  </table>";
  layer.bindPopup(popupContent, { maxHeight: 400 });
};
