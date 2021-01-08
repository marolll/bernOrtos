// ***** CHANGE ORTOPHOTOS *************

// Change Full View Orto
buttonSelectorAll = $(".full > button");
buttonSelectorAll.on("click", function () {
  // Same value like name of layers in bernOrtos
  let btnVal = this.value;
  // Loop through WMS
  for (let val of Object.values(bernOrtos)) {
    let objOrtVal = val.options.layers;
    if (btnVal === objOrtVal) {
      console.log(`btnVal: ${btnVal} === lyrOrtVal: ${objOrtVal}`);
      console.log("Changing lyrOrtophotoFullView");
      lyrOrtophotoFullView.remove();
      lyrOrtophotoFullView = val.addTo(map);
    }
  }
});

// Change Right Orto
buttonSelectorRight = $(".right > button");
buttonSelectorRight.on("click", function () {
  // CONTINUE
  $(`.right > button`).attr("disabled", false);
  let btnVal = this.value;
  for (let val of Object.values(bernOrtos)) {
    let objOrtVal = val.options.layers;
    if (btnVal === objOrtVal) {
      lyrOrtophotoRight.remove();
      lyrOrtophotoRight = val.addTo(map);
      ctlSideBySide.setLeftLayers(lyrOrtophotoLeft);
      ctlSideBySide.setRightLayers(lyrOrtophotoRight);
      disableButtons(
        lyrOrtophotoLeft.options.layers,
        lyrOrtophotoRight.options.layers
      );
    }
  }
});
//

buttonSelectorLeft = $(".left > button");
buttonSelectorLeft.on("click", function () {
  let btnVal = this.value;
  for (let val of Object.values(bernOrtos)) {
    let objOrtVal = val.options.layers;
    if (btnVal === objOrtVal) {
      lyrOrtophotoLeft.remove();
      lyrOrtophotoLeft = val.addTo(map);
      ctlSideBySide.setLeftLayers(lyrOrtophotoLeft);
      ctlSideBySide.setRightLayers(lyrOrtophotoRight);
      disableButtons(
        lyrOrtophotoLeft.options.layers,
        lyrOrtophotoRight.options.layers
      );
    }
  }
});

// Change Sidebar depending what i need to use
$("#changeContent").on("click", function () {
  if (this.value === "compareOrtos") {
    console.log("changing Sidebar to one Orto");
    $(this).val("oneOrto");
    $(this).html("Click To Compare ortophotos");
    $("#compareOrtos").addClass("hide");
    $("#fullViewSelectOrto").removeClass("hide");
    remSideBySide();
    lyrOrtophotoFullView = ort2020.addTo(map);
    $("#leftOrtoInfo, #rightOrtoInfo").addClass("hide");
    $("#fullOrtoInfo").removeClass("hide");
  } else {
    console.log("changing Sidebar to Side By side");
    $(this).val("compareOrtos");
    $(this).html("Click To Select One Ortophoto");
    $("#fullViewSelectOrto").addClass("hide");
    $("#compareOrtos").removeClass("hide");
    lyrOrtophotoFullView.remove();
    lyrOrtophotoLeft.addTo(map);
    lyrOrtophotoRight.addTo(map);
    ctlSideBySide = L.control
      .sideBySide(lyrOrtophotoLeft, lyrOrtophotoRight)
      .addTo(map);

    // Disable
    disableButtons(
      lyrOrtophotoLeft.options.layers,
      lyrOrtophotoRight.options.layers
    );
    $("#leftOrtoInfo, #rightOrtoInfo").removeClass("hide");
    $("#fullOrtoInfo").addClass("hide");
  }
});

// Clo se Sidebar On Click
$("#closeSidebar").on("click", () => {
  controlSidebar.hide();
});

// Remove Side By Side
const remSideBySide = () => {
  lyrOrtophotoRight.remove();
  lyrOrtophotoLeft.remove();
  ctlSideBySide.remove();
};

const disableButtons = (lBtnVal, rBtnVal) => {
  $(".left > button").attr("disabled", false);
  $(".right > button").attr("disabled", false);
  $(`.left > button[value='${rBtnVal}']`).attr("disabled", true);
  $(`.right > button[value='${lBtnVal}']`).attr("disabled", true);
};

$(".left > button").on("click", function () {
  $(".left > button").removeClass("active");
  $(this).addClass("active");
});

$(".right > button").on("click", function () {
  $(".right > button").removeClass("active");
  $(this).addClass("active");
});

$(".full > button").on("click", function () {
  $(".full > button").removeClass("active");
  $(this).addClass("active");
});

$(".right > button").on("click", function () {
  let val = $(this).html();
  let rightInfo = $("#rightOrtoInfo");

  rightInfo.html(val);
});

$(".left > button").on("click", function () {
  let val = $(this).html();
  let leftInfo = $("#leftOrtoInfo");

  leftInfo.html(val);
});

$(".full > button").on("click", function () {
  let val = $(this).html();
  let fullInfo = $("#fullOrtoInfo");

  fullInfo.html(val);
});

$(".leaflet-sidebar").on("change", () => {
  console.log("change");
});

$("#closeIcon").on("click", () => {
  let yearOrtos = $(".infoOrtoStyle");
  yearOrtos.removeClass("hideByIndex");
});

function isMobile() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    return true;
  } else {
    return false;
  }
}
