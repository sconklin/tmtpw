var MeasurementsButton = document.getElementById("SMButton");
var PatternButton = document.getElementById("SPButton");
var haveMeasurements = false;
var havePattern = false;

// Turn off caching, or changes to json files, etc
// won't get reloaded
$.ajaxSetup({ cache: false });

// catch the event on the measurements button
MeasurementsButton.addEventListener("click", function(e){
    e.preventDefault();
    console.log("MButton");
    getMeasurement();
});

// catch the event on the patterns button
PatternButton.addEventListener("click", function(e){
    e.preventDefault();
    console.log("PButton");
});

// Triggered when the user selects a measurement file
// from the popup
$("#popupSelectM").change(function(e) {
    console.log("Measurement file CHANGED");
    window.fileSelection = $("#popupSelectM").val();
    mFileName = window.fileSelection;
    console.log(mFileName);
    // Now we have a file selected
    $("#selectMeasurementsDiv").hide();
    $.getJSON(mFileName, function(mdata) {
	// Now we have measurement data
	window.measurementData = mdata
	// If we already have a pattern script loaded, 
	// then call into it
	if(typeof drawPattern == 'function')
	{
	    // The funtion drawPattern exists
	    drawPattern(window.measurementData);
	}
 	
	console.log(mdata);
    });
});

function getMeasurement(){
    // Fetch a list of available Measurements
    // Right now this grabs a list from a json file,
    // but could ultimately query a db
    $.getJSON("measurement_list.json", function(mlist) {

	// Now we have a list of files, let the user select one
	//for (var i=0, len=mlist.length; i < len; i++) {
        //    console.log(mlist[i]);
	//}

	// we'll set up the select list, then display the popup
	// that contains it
	var $el = $("#popupSelectM");
	$el.empty(); // remove old options from the select

	// Add the first prompt. Selecting this one will not trigger
	// a change, since it is selected already
	$el.append($("<option></option>")
		   .attr("value", "select").text("Select Measurements"));

	// Add the choices we read from the json file
	$.each(mlist, function(key, val) {
	    // remove the .json from the end
	    var name = val.slice(0,-5);
	    // Add the option to the list
	    $el.append($("<option></option>")
		       .attr("value", val).text(name));
	});
	$("#selectMeasurementsDiv").show();
	// Now, when user selects one of these the change callback will happen
    });
}
