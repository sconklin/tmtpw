// -------define the canvas
var canvas = new fabric.Canvas('c');
var styles = {
    "patternpoint_style": {
        "fill": "red",
        "stroke": "red",
        "stroke-width": "1"
    },
    "controlpoint_style": {
        "fill": "none",
        "stroke": "gray",
        "stroke-width": "1"
    },
    "cuttingline_style": {
        "fill": "none",
        "stroke": "green",
        "stroke-linejoin": "miter",
        "stroke-miterlimit": "4",
        "stroke-width": "4"
    },
    "seamline_style": {
        "fill": "none",
        "stroke": "green",
        "stroke-dasharray": "24,6",
        "stroke-dashoffset": "0",
        "stroke-linejoin": "miter",
        "stroke-miterlimit": "4",
        "stroke-width": "4"
    }
};

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

function newPoint(name, pnt, style) {
    return newPointXY(name, pnt.x, pnt.y, style);
} // newPoint()

function newPointXY(name, x, y, style) {
    //var p = new fabric.Circle([x, y], style);
    if (style === 'patternpoint') {
        var p = newPatternCircle(name, x, y);
    } else if (style === 'controlpoint') {
        var p = newControlCircle(name, x, y);
    }
    p.text = new fabric.Text(name, {
        left: x,
        top: y,
        name: name + '_text',
        fontSize: 10,
        hasBorders: false,
        hasControls: false,
        lockUniScaling: true,
        selectable: false,
        reference: true
    });
    canvas.add(p.text);
    canvas.add(p);
    canvas.sendToBack(p.text);
    return p;
} // newPointXY()

function newPatternCircle(name, x, y) {
    var pc = new fabric.Circle({
        name: name,
        left: x,
        top: y,
        strokeWidth: 1,
        radius: 5,
        fill: '',
        stroke: 'red',
        hasBorders: false,
        hasControls: false,
        lockUniScaling: true,
        selectable: true,
        coords: x + ', ' + y,
        reference: true,
        ptype: 'pattern'
    });
    return pc;
} // newPatternCircle()

function newControlCircle(name, x, y) {
    var cc = new fabric.Circle({
        name: name,
        left: x,
        top: y,
        strokeWidth: 1,
        radius: 5,
        fill: '',
        stroke: 'gray',
        hasBorders: false,
        hasControls: false,
        lockUniScaling: true,
        selectable: true,
        coords: x + ', ' + y,
        reference: true,
        ptype: 'control'
    });

    return cc;
} // newControlCircle()


function newLine(p0, p1, style) {
    if (style === 'seamline') {
        console.log('seamline');
        var new_line = new fabric.Line([p0.left, p0.top, p1.left, p1.top], {
            fill: 'green',
            stroke: 'green',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 4,
            strokeWidth: 3,
            hasBorders: false,
            hasControls: false,
            selectable: false,
            reference: false,
            name: 'Line_' + p0.name + p1.name
        });
    } else if (style === 'cuttingline') {
        console.log('cuttingline');
        var new_line = new fabric.Line([p0.left, p0.top, p1.left, p1.top], {
            "fill": "green",
            "stroke": "green",
            "stroke-dasharray": "24,6",
            "stroke-dashoffset": "0",
            "stroke-linejoin": "miter",
            "stroke-miterlimit": "4",
            "stroke-width": "3",
            "selectable": false,
            "name": 'Line_' + p0.name + p1.name
        });
    }

    if (p0.hasOwnProperty('outPath') === false) {
        p0.outPath = [];
    }
    p0.outPath.push(new_line);
    if (p1.hasOwnProperty('inPath') === false) {
        p1.inPath = [];
    }
    p1.inPath.push(new_line);
    canvas.add(new_line);
    return new_line;
}

function newCurve(p0, c0, c1, p1, style) {
    //path_arr = [['M', p0.left, p0.top], ['C', c1.left, c1.top, p1.left, p1.top]]; //array of arrays
    console.log('p0, c0, c1, p1' + p0 + ' '+ c0 + ' ' + c1 + ' ' + p1);
    path_str = formatPath('M', p0, 'C', c0, c1, p1);
    if (style === 'seamline') {
        var new_path = new fabric.Path(path_str, {
            fill: '',
            stroke: 'green',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 4,
            strokeWidth: 3,
            hasBorders: false,
            hasControls: false,
            selectable: false,
            reference: false,
            name: 'Curve_' + p0.name + p1.name
        });
    } else if (style === 'cuttingline') {
        var new_path = new fabric.Path(path_arr, {
            "fill": "green",
            "stroke": "green",
            "stroke-dasharray": "24,6",
            "stroke-dashoffset": "0",
            "stroke-linejoin": "miter",
            "stroke-miterlimit": "4",
            "stroke-width": "3",
            "selectable": false,
            "name": 'Curve_' + p0.name + p1.name
        });
    }

    //new_path is an outPath for p0 & c0
    if (p0.hasOwnProperty('outPath') === false) {
        p0.outPath = [];
    }
    p0.outPath.push(new_path);
    if (c0.hasOwnProperty('outPath') === false) {
        c0.outPath = [];
    }
    c0.outPath.push(new_path);

    //new_path is an inPath for c1 & p1
    if (c1.hasOwnProperty('inPath') === false) {
        c1.inPath = [];
    }
    c1.inPath.push(new_path);

    if (p1.hasOwnProperty('inPath') === false) {
        p1.inPath = [];
    }
    p1.inPath.push(new_path);

    //draw new_path on canvas
    canvas.add(new_path);
    return new_path;
}


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
        fontSize: 11
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
        console.log('arg = ' + arg);
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
