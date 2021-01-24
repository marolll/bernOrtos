// Wait Until The DOM is ready
$(document).ready(() => {
  // **** INITIALIZE THE MAP AND **************
  mapOption = {
    center: [46.9485872, 7.4531983], // Bern
    zoom: 15,
    minZoom: 13,
    zoomControl: false,
    attributionControl: false,
    //crs: L.CRS.EPSG4326 ´> default
  };

  map = L.map("mapView", mapOption);

  // ********* INITIALIZE CONTROLS **************
  // Sidebar
  controlSidebar = L.control.sidebar("sideBar", {
    position: "left",
  });
  map.addControl(controlSidebar);

  L.control
    .zoom({
      position: "topright",
    })
    .addTo(map);

  // Show Sidebar
  controlEasybutton = L.easyButton("fa-bars", function () {
    controlSidebar.toggle();
    let sidebar = $("#sideBar");
    sidebar.css({'display': 'unset', 'transition': 'ease'});
 

    // Hide years on mobile when sidebar is open
    if (isMobile()) {
      let yearOrtos = document.querySelectorAll(".infoOrtoStyle");
      yearOrtos.forEach((item) => {
        item.classList.add("hideByIndex");
      });
    }
  }).addTo(map);

  // Hide sidebar
  map.on("click", () => {
    controlSidebar.hide();

    // Show years on mobile when sidebar is close
    if (isMobile()) {
      let yearOrtos = $(".infoOrtoStyle");
      yearOrtos.removeClass("hideByIndex");
    }
  });

  // **** INITIALIZE LAYERS **************

  // Define initial Ortos
  lyrOrtophotoLeft = ort1999;
  lyrOrtophotoRight = ort2020;

  // Initialy disable = avoid have same maps on both sides
  disableButtons(
    lyrOrtophotoLeft.options.layers,
    lyrOrtophotoRight.options.layers
  );

  // Add Ortos
  lyrOrtophotoLeft.addTo(map);
  lyrOrtophotoRight.addTo(map);

  // Add Side By Side
  ctlSideBySide = L.control
    .sideBySide(lyrOrtophotoLeft, lyrOrtophotoRight)
    .addTo(map);



    lyrOrtophotoRight.on("loading", () => {
      console.log("right loading")
      $("#loading").addClass("show");
    })

    lyrOrtophotoRight.on("load", () => {
      console.log("Right load")
      $("#loading").addClass("hide");
    })

});
