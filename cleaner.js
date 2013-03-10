// Turn off caching, or changes to json files, etc
// won't get reloaded
$.ajaxSetup({ cache: false });

function drawPatternIfReady(){
    // See whether everything is ready to draw a pattern.
    // If it is, call drawPattern

    // Are the styles loaded?
    // Are measurements loaded?
    // Is a pattern Script Loaded?
    if ((window.styleData != 'undefined') &&
	(typeof window.measurementData != 'undefined') &&
	(typeof drawPattern == 'function')){
	// do any setup work here for the canvas (none yet)

	// Draw the pattern
	var mmap = convertMeasurementData(window.measurementData);
	drawPattern(window.measurementData, window.styleData, mmap);
    }
}

function loadStyles(styleFileName){
    $.getJSON(styleFileName, function(sdata) {
	// Now we have measurement data
	window.styleData = sdata

	// See whether we're ready to draw
	drawPatternIfReady();
    });
}

loadStyles("tmtp_styles.json");

// catch the click on the measurements button
$("#SMButton").click(function(e){
    e.preventDefault();
    console.log("MButton");
    getMeasurement();
});

// catch the click on the patterns button
$("#SPButton").click(function(e){
    e.preventDefault();
    console.log("PButton");
    getPattern();
});

// Triggered when the user selects a measurement file
// from the popup
$("#popupSelectM").change(function(e) {
    console.log("Measurement file CHANGED");
    mFileName = $("#popupSelectM").val();
    // Now we have a file selected
    $("#selectMeasurementsDiv").hide();
    $.getJSON(mFileName, function(mdata) {
	// Now we have measurement data
	window.measurementData = mdata

	// See whether we're ready to draw
	drawPatternIfReady();
    });
});

function getMeasurement(){
    // Fetch a list of available Measurements
    // Right now this grabs a list from a json file,
    // but could ultimately query a db
    $.getJSON("measurement_list.json", function(mlist) {

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

function createJsFile(filename){
    var fileref=document.createElement('script')
    fileref.setAttribute("type","text/javascript")
    fileref.setAttribute("src", filename)
    return fileref
}

function replaceJsFile(oldfilename, newfilename){
    var allsuspects=document.getElementsByTagName("script")
    for (var i=allsuspects.length; i>=0; i--){ //search backwards within nodelist for matching elements to remove
	if (allsuspects[i] && allsuspects[i].getAttribute("src")!=null && allsuspects[i].getAttribute("src").indexOf(oldfilename)!=-1){
	    var newelement=createJsFile(newfilename)
	    allsuspects[i].parentNode.replaceChild(newelement, allsuspects[i])
	}
    }
}

// Triggered when the user selects a pattern file
// from the popup
$("#popupSelectP").change(function(e) {
    console.log("Pattern file CHANGED");
    pFileName = $("#popupSelectP").val();
    // Now we have a file selected, so hide the selection popup
    $("#selectPatternDiv").hide();

    if(typeof drawPattern == 'function')
    {
	// The funtion drawPattern exists, indicating that we previously loaded a pattern script
	// So we replace the old one with the new one
	replaceJsFile(window.scriptSelection, pFileName);
    } else {
	el = createJsFile(pFileName);
	$('body').append(el);
    }
    // Save the file name that we loaded
    window.scriptSelection = pFileName;

    // See whether we're ready to draw
    drawPatternIfReady();
});

function getPattern(){
    // Fetch a list of available pattern files
    // Right now this grabs a list from a json file,
    // but could ultimately query a db
    $.getJSON("pattern_list.json", function(plist) {

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
