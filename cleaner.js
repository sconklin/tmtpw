var MeasurementsButton = document.getElementById("SMButton");
var PatternButton = document.getElementById("SPButton");
var haveMeasurements = false;
var havePattern = false;

MeasurementsButton.addEventListener("click", function(e){
    e.preventDefault();
    console.log("MButton");
    getMeasurement();
});

PatternButton.addEventListener("click", function(e){
    e.preventDefault();
    console.log("PButton");
});

// Triggered when the user selects a measurement file
$("#popupSelectM").change(function(e) {
    console.log("Measurement file CHANGED");
    window.fileSelection = $("#popupSelectM").val();
    console.log(window.fileSelection);
    // Now we have a file selected
    $("#selectMeasurementsDiv").hide();
    $.getJSON(window.fileSelection, function(mdata) {
	for (var i=0, len=mdata.length; i < len; i++) {
            console.log(mdata[i]);
	}
    });
});

function getMeasurement(){
    // Fetch a list of available Measurements
    // Right now this grabs a list from a json file,
    // but could ultimately query a db
    $.getJSON("measurement_list.json", function(mdata) {
	// Now we have a list of files, let the user select one
	//for (var i=0, len=mdata.length; i < len; i++) {
        //    console.log(mdata[i]);
	//}
	var $el = $("#popupSelectM");
	$el.empty(); // remove old options from the select
	// Add the new ones
	$.each(mdata, function(key, value) {
	    var name = value.slice(0,-5);
	    $el.append($("<option></option>")
		       .attr("value", value).text(name));
	});
	$("#selectMeasurementsDiv").show();
	// Now, when user selects one of these the change callback will happen
    });
}
