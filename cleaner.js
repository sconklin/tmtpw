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
    getPattern();
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

// Triggered when the user selects a pattern file
// from the popup
$("#popupSelectP").change(function(e) {
    console.log("Pattern file CHANGED");
    window.scriptSelection = $("#popupSelectP").val();
    pFileName = window.scriptSelection;
    console.log(pFileName);
    // Now we have a file selected
    $("#selectPatternDiv").hide();
    // Now, load the script, and call it if we have measurements
    console.log("about to get script");


    var jqxhr = $.get(pFileName, function(scriptText) {
	console.log("Got Script");
	console.log(scriptText);
	var $scriptEl = $("#patternScript");
	//$scriptEl.empty(); // First, empty the pattern script element
	$scriptEl.replaceWith(scriptText); // First, empty the pattern script element
	// Now, see if we have measurements loaded, and if we do, call the pattern function
	if (typeof window.measurementData != 'undefined') {
	    drawPattern(window.measurementData);
	}
    }, "script")
	.fail(function(data, status, xhf) {
	    console.log(status);
	    // TODO add test for parsetest vs other errors
	    alert("Failed to load file");
	});

/*
    $.get(pFileName, "script")
	.done(function(scriptText, status, xhr) {
	    console.log("Got Script");
	    console.log(scriptText);
	    var $scriptEl = $("#patternScript");
	    //$scriptEl.empty(); // First, empty the pattern script element
	    $scriptEl.replaceWith(scriptText); // First, empty the pattern script element
	    // Now, see if we have measurements loaded, and if we do, call the pattern function
	    console.log("about to call script");
	    if (typeof window.measurementData != 'undefined') {
		drawPattern(window.measurementData);
	    });
	 .fail(function(scriptText, status, xhr) {
	 });
	  .always(function(scriptText, status, xhr) {
	  });
*/
});

function getPattern(){
    // Fetch a list of available pattern files
    // Right now this grabs a list from a json file,
    // but could ultimately query a db
    $.getJSON("pattern_list.json", function(plist) {

	// Now we have a list of patterns, let the user select one
	//for (var i=0, len=plist.length; i < len; i++) {
        //    console.log(plist[i]);
	//}

	// we'll set up the select list, then display the popup
	// that contains it
	var $el = $("#popupSelectP");
	$el.empty(); // remove old options from the select

	// Add the first prompt. Selecting this one will not trigger
	// a change, since it is selected already
	$el.append($("<option></option>")
		   .attr("value", "select").text("Select Pattern"));

	// Add the choices we read from the json file
	$.each(plist, function(key, val) {
	    // remove the .js from the end
	    var name = val.slice(0,-3);
	    // Add the option to the list
	    $el.append($("<option></option>")
		       .attr("value", val).text(name));
	});
	$("#selectPatternDiv").show();
	// Now, when user selects one of these the change callback will happen
    });
}
