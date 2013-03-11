// -------define the canvas
var canvas = new fabric.Canvas('c');

// ------- angles
function angleOfDegree(degree) {
    //Accepts degrees, returns radians
    return degree * Math.PI / 180.0;
} //angleOfDegree()

function angleOfLine(p1, p2) {
    // Accepts points p1 & p2. Returns the angle of the vector between them. Uses atan2.
    return Math.atan2(p2.top - p1.top, p2.left - p1.left);
}

// ------- debug utils -------

function displayPoints(string) {
    //write point values to console for debuggin
    var args = arguments;
    var i = 0;
    while (i < args.length) {
        //do something by accessing valueArray[i];
        console.log(args[i].name + ' ' + args[i].left + ' ' + args[i].top);
        i += 1;
    }
} //displayPoints()

// ------- undrawn locations -------

function point(left, top) {
    var c = new fabric.Object({
        left: left,
        top: top,
        coords: left + ', ' + top
    });
    console.log('new point ' + c.left + ' ' + c.top);
    return c;
} // point()

function upPoint(pnt, length) {
    return point(pnt.left, pnt.top - length);
} // downPoint()

function downPoint(pnt, length) {
    return point(pnt.left, pnt.top + length);
} // downPoint()

function leftPoint(pnt, length) {
    return point(pnt.left - length, pnt.top);
} // downPoint()

function rightPoint(pnt, length) {
    return point(pnt.left + length, pnt.top);
} // downPoint()


// ------- text & labels -------


// ------- drawn canvas points -------

function patternPoint(group, pname, pnt, svg_cmd) {
    var p = new fabric.Circle({
        name: pname + '_point',
        strokeWidth: 1,
        radius: 5,
        fill: 'red',
        stroke: 'red',
        hasBorders: false,
        hasControls: false,
        lockUniScaling: true,
        name: pname,
        selectable: true,
        reference: true
    });
    var ptext = new fabric.Text(pname, {
        name: pname + '_text',
        fontSize: 9
    });
    var pgroup = new fabric.Group([ptext, p], {
        name: pname,
        left: pnt.left,
        top: pnt.top,
        hasBorders: false,
        hasControls: false,
        lockUniScaling: true,
        coords: pnt.left  + ', ' +  pnt.top,
        cmd: svg_cmd
    });
    canvas.add(pgroup);
    return pgroup;
} // patternPoint()

function patternPointXY(group, pname, left, top, svg_cmd) {
    return patternPoint(group, pname, point(left, top), svg_cmd);
} //patternPointXY()


function controlPoint(pname, pnt) {
    var c = new fabric.Circle({
        left: pnt.left,
        top: pnt.top,
        strokeWidth: 1,
        radius: 5,
        fill: 'none',
        stroke: 'gray',
        hasBorders: false,
        hasControls: false,
        lockUniScaling: true,
        name: pname,
        reference: 'true',
        coords: pnt.left + ', ' + pnt.top
    });
    return c;
} // controlPoint()

function controlPointXY(pname, left, top) {
    return controlPointXY(pname, point(left, top));
} //controlPoint()

// ------- paths -------
function formatPath(string) {
     //write cmd, left & right for each point in arguments[]
    var args = arguments;
    var path_str = "";
    var i = 0;
    var arg = "";
    while (i < args.length) {
        arg = args[i];
        if (typeof arg === "string") {
            path_str += " " + arg;
        } else {
            path_str += ' ' + arg.left + ', ' + arg.top;
        }
        i += 1;
    }
    console.log('path_str = ' + path_str);
    return path_str.trim(); //return path_str with leading & trailing whitespace removed
} //formatPath()



// ------- math -------

function distance(p1, p2) {
    //Accepts two points p1 & p2. Returns the distance between p1 & p2
    //Accepts two points p1 & p2. Returns the distance between p1 & p2
    return Math.sqrt(((p2.left - p1.left) * (p2.left - p1.left)) + ((p2.top - p1.top) * (p2.top - p1.top)));
} // distance()

// ------- intersections -------

function pointOnLineAtLength(p1, p2, length) {
    //Accepts points p1 and p2, length
    //Returns point on the line at length measured from p1 towards p2
    //If length is negative, will return p3 at length measured from p1 in opposite direction from p2
    var lineangle = angleOfLine(p1, p2);
    var pleft = (length * Math.cos(lineangle)) + p1.left;
    var ptop  = (length * Math.sin(lineangle)) + p1.top;
    return point(pleft, ptop);
}

// ------- measurement data load -------

function convertMeasurementData(mdata){

    if (mdata.measureunit.value === 'cm') {
        var munit = CM;
    } else {
        var munit = IN;
    }

    var md = {};
    // convert measurement data and return it in a more handy array
    $.each(mdata, function(key, val) {
    if (val.type == "float"){
        md[key] = (parseFloat(val.value) * munit);
        //console.log("set " + key + " to " + parseFloat(val.value) * munit);
    } else {
        md[key] = val.value;
        //console.log("set " + key + " to " + val.value);
    }
    });
    return md
}

// ------- global constants -------

//TODO:  replace with zoom button on canvas
var zoom = 1 / 4.0; // temporary - show at 1/4 size to fit canvas in window

var ANGLE45 = angleOfDegree(45);
var ANGLE90 = angleOfDegree(90);
var ANGLE180 = angleOfDegree(180);

var INCH_to_PX = 90.0; //inkscape uses 90 pixels per 1 inch
var CM_to_INCH = 1 / 2.54;
var CM_to_PX = CM_to_INCH * INCH_to_PX;
var CM = CM_to_PX * zoom; // CM - shorthand when using centimeters - zoom is temporary
var IN = INCH_to_PX * zoom; // IN - shorthand when using inches - zoom is temporary

var BORDER = IN;
var SEAM_ALLOWANCE = (5 / 8.0) * IN;
var PLOTTER_WIDTH = (36.0 * IN);