let map,
  mapOption,
  controlLayers,
  controlEasyButton, // Plugin
  controlSidebar, // Plugin
  ctlSideBySide, // Plugin
  lyrOrtophotoLeft,
  lyrOrtophotoRight,
  lyrOrtophotoFullView,
  buttonSelectorAll,
  buttonSelectorLeft,
  buttonSelectorRight;

// Bern Open Free Ortophotos WMS => https://www.europeandataportal.eu/data/datasets/45b8d5a1-60e9-4c71-b7ab-848ad8796d9d-geoinformation-der-stadt-bern?locale=cs
const bernOrtosUrl =
  "https://map.bern.ch/wms/OpenData/proxy.php?request=GetCapabilities";
const bernAtributtion = "map.bern.ch - WMS (Open Data)";
const bernOrtos = {
  ort1999: L.tileLayer.wms(bernOrtosUrl, {
    layers: "luftbild_1999",
    attribution: bernAtributtion,
  }),
  ort2004: L.tileLayer.wms(bernOrtosUrl, {
    layers: "luftbild_2004",
    attribution: bernAtributtion,
  }),
  ort2008: L.tileLayer.wms(bernOrtosUrl, {
    layers: "luftbild_2008",
    attribution: bernAtributtion,
  }),
  ort2012: L.tileLayer.wms(bernOrtosUrl, {
    layers: "luftbild_2012",
    attribution: bernAtributtion,
  }),
  ort2016: L.tileLayer.wms(bernOrtosUrl, {
    layers: "luftbild_2016",
    attribution: bernAtributtion,
  }),
  ort2020: L.tileLayer.wms(bernOrtosUrl, {
    layers: "luftbild_2020",
    attribution: bernAtributtion,
  }),
};

// destructure Ortos => not bernOrtos.ort1999, but only ort1999
const { ort1999, ort2004, ort2008, ort2012, ort2016, ort2020 } = bernOrtos;
