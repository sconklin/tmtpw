// -------define the canvas
var canvas = new fabric.Canvas('c');

// ------- angle and slope -------
function angleOfDegree(degree) {
    //Accepts degrees, returns radians
    return degree * Math.PI / 180.0;
} //angleOfDegree()

function angleOfLine(p1, p2) {
    // Accepts points p1 & p2. Returns the angle of the vector between them. Uses atan2.
    return Math.atan2(p2.top - p1.top, p2.left - p1.left);
}

function slopeOfLine(p1, p2) {
    //Accepts two point objects and returns the slope
    if ((p2.left - p1.left) != 0) {
        var m = (p2.top - p1.top) / (p2.left - p1.left);
    } else {
        //TODO: better error handling here
        console.log('Vertical Line in slopeOfLine');
        var m = None;
    }
    return m;
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

function midPoint(p1, p2) {
    //Accepts points p1 & p2. Returns point as midpoint b/w p1 & p2
    return point((p1.left + p2.left) / 2.0, (p1.top + p2.top) / 2.0);
}

function polarPoint(p1, length, angle) {
    //Adapted from http://www.teacherschoice.com.au/maths_library/coordinates/polar_-_rectangular_conversion.htm
    //Accepts p1 as type Point,length as float,angle as float. angle is in radians
    //Returns p2 as type Point, calculated at length and angle from p1,
    //Angles start at position 3:00 and move clockwise
    var r = length;
    var pleft = p1.left + (r * Math.cos(angle));
    var ptop = p1.top + (r * Math.sin(angle));
    return point(pleft, ptop);
}

// ------- text & labels -------


// ------- drawn canvas points -------
function newPoint(name, pnt) {
    var p = new fabric.Point(pnt.x, pnt.y);
    p.name = name;
    p.coords = pnt.x + ', ' + pnt.y;
    return p;
} // newPoint()

function newPointXY(name, x, y) {
    var p = new fabric.Point(x, y);
    p.coords = x + ', ' + y;
    p.name = name;
    return p;
} // newPointXY()

function newPatternPoint(pnt, in_lines, out_lines) {
    var p = new fabric.Circle({
        name: pnt.name,
        left: pnt.x,
        top: pnt.y,
        strokeWidth: 1,
        radius: 5,
        fill: 'none',
        stroke: 'red',
        hasBorders: false,
        hasControls: false,
        lockUniScaling: true,
        selectable: true,
        reference: true
    });
    p.inline = [];
    i = 0;
    for (item in in_lines) {
        p.inline[i] = in_lines[i];
        i += 1;
    }
    p.outline = [];
    i = 0;
    for (item in out_lines) {
        p.outline[i] = out_lines[i];
        i += 1;
    }
    canvas.add(p);
    return p;
} // patternPoint()

function newPatternPointXY(group, pname, left, top, previous_pnt, svg_cmd, start) {
    return newPatternPoint(group, pname, point(left, top), previous_pnt, svg_cmd, start);
} //patternPointXY()

function newControlPoint(group, cname, pnt, parent_pnt) {
    var c = new fabric.Circle({
        name: cname,
        strokeWidth: 1,
        radius: 5,
        fill: 'none',
        stroke: 'gray',
        hasBorders: false,
        hasControls: false,
        lockUniScaling: true,
        reference: 'true',
        coords: pnt.left + ', ' + pnt.top,
        parent: parent_pnt
    });
    var ctext = new fabric.Text(cname, {
        name: cname + '_text',
        fontSize: 9
    });
    var cgroup = new fabric.Group([ctext, c], {
        name: cname + "_group",
        left: pnt.left,
        top: pnt.top,
        hasBorders: false,
        hasControls: false,
        lockUniScaling: true,
        coords: pnt.left  + ', ' +  pnt.top,
    });
    group.points.push(c);
    console.log(group);
    canvas.add(cgroup);
    return cgroup;
} // controlPoint()

function newControlPointXY(pname, left, top, parent_pnt) {
    return newControlPointXY(pname, point(left, top), parent_pnt);
} //controlPoint()

function patternPoint(group, pname, pnt, svg_cmd) {
    var p = new fabric.Circle({
        name: pname + '_point',
        strokeWidth: 1,
        radius: 5,
        fill: 'none',
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
            if (path_str === "") {
                //1st item in the path string
                path_str = arg;
            } else {
                path_str += " " + arg;
            }
        } else {
            path_str += " " + arg.coords;
        }
        i += 1;
    }
    console.log(path_str);
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

function intersectLines(p1, p2, p3, p4) {
    //Find intersection between two lines. Accepts p1,p2,p3,p4 as class Point. Returns p5 as class Point
    //Intersection does not have to be within the supplied line segments
    console.log('   intersectLines:     p3 = '+p3.left+', '+p3.top);
    console.log('                       p4 = '+p4.left+', '+p4.top);
    var x = 0.0;
    var y = 0.0;
    if (p1.left === p2.left) {
        //if 1st line vertical,use slope of 2nd line
        x = p1.left;
        m2 = slopeOfLine(p3, p4);
        b2 = p3.top - m2 * p3.left;
        y = m2 * x + b2;
    } else if (p3.left === p4.left) {
        //if 2nd line vertical, use slope of 1st line
        x = p3.left;
        m1 = slopeOfLine(p1, p2);
        b1 = p1.top - m1 * p1.left;
        y = m1 * x + b1;
    } else {
        //otherwise use ratio of difference between points
        m1 = (p2.top - p1.top) / (p2.left - p1.left);
        m2 = (p4.top - p3.top) / (p4.left - p3.left);
        b1 = p1.top - m1 * p1.left;
        b2 = p3.top - m2 * p3.left;
        //if (abs(b1 - b2) < 0.01) && (m1 === m2) {
        //    x = p1.left;
        //} else {
        //    x=(b2-b1)/(m1-m2);
        //}
        if (m1 === m2) {
            //TODO: better error handling here
            console.log('***** Parallel lines in intersectLines *****');
        } else {
            x = (b2 - b1) / (m1 - m2);
            y = (m1 * x) + b1; // arbitrary choice,could have used m2 & b2
        }
    }
    return point(x, y);
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
