// Multiple_connected_lines_and_curves_Zoom.js
// this fabric.js demo was based upon the Quadratic Curve demo and the Stickman demo
// added Zoom buttons

// ------- points & circles -------

function distance(p1, p2) {
    //Accepts two objects p1 & p2. Returns the distance between p1 & p2
    return Math.sqrt(((p2.left - p1.left) * (p2.left - p1.left)) + ((p2.top - p1.top) * (p2.top - p1.top)));
} // distance()

function addCircle(name, x, y, style) {

    if (style === 'knot') {
        cfill = 'FireBrick';
        cstroke = 'FireBrick';
        ctype = 'knot';
    } else {
        cfill = '';
        cstroke = 'gray';
        ctype = 'control';
    }
    var c = new fabric.Circle({
        name: name,
        left: x,
        top: y,
        strokeWidth: 2,
        radius: 4,
        fill: cfill,
        stroke: cstroke,
        hasBorders: false,
        hasControls: false,
        lockUniScaling: true,
        selectable: true,
        coords: x + ', ' + y,
        reference: true,
        ptype: ctype
    });
    return c;
} // addCircle()


function addPoint(name, x, y, style) {

    var p = addCircle(name, x, y, style);;
    p.point = new fabric.Point(x, y);
    p.text = new fabric.Text(name, {
        left: x,
        top: y - 10,
        name: name + '_text',
        fontSize: 14,
        hasBorders: false,
        hasControls: false,
        lockUniScaling: true,
        selectable: false,
        reference: true
    });
    canvas.add(p.text);
    canvas.add(p);
    canvas.bringToFront(p);
    return p;
} // addPoint()


// ------- paths -------

function addLine(p0, p1) {
    var new_line = new fabric.Object();
    new_line = new fabric.Line([p0.left, p0.top, p1.left, p1.top], {
        fill: "green",
        stroke: "green",
        strokeLinejoin: "miter",
        strokeMiterlimit: 3,
        strokeWidth: 3,
        selectable: false,
        hasBorders: false,
        hasControls: false,
        reference: false,
        name: "Line_" + p0.name + p1.name
    });
    if (p0.hasOwnProperty('outPath') === false) {
        p0.outPath = [];
    }
    p0.outPath.push(new_line);
    if (p1.hasOwnProperty('inPath') === false) {
        p1.inPath = [];
    }
    p1.inPath.push(new_line);
    canvas.add(new_line);
    canvas.sendBackwards(new_line);
    canvas.bringToFront(p0);
    canvas.bringToFront(p1);
    return new_line;
} //addLine()

function addCurve(p0, c0, c1, p1) {
    // path are stored as an array of two arrays
    // [['M', p0.left, p0.top], ['C', c0.left, c0.top, c1.left, c1.top, p1.left, p1.top]]
    // [0][0], [0][1], [0][2], [1][0], [1][1], [1][2], [1][3], [1][4], [1][5], [1][6]
    // [0][0] = 'M',   [1][0] = 'C'
    var path_str = 'M ' + p0.left + ' ' + p0.top + ' C ' + c0.left + ' ' + c0.top + ' ' + c1. left + ' ' + c1.top + ' ' + p1.left + ' ' + p1.top;
    var new_path = new fabric.Path(path_str, {
        fill: "",
        stroke: "green",
        strokeLinejoin: "miter",
        strokeMiterlimit: 3,
        strokeWidth: 3,
        hasBorders: false,
        hasControls: false,
        selectable: false,
        reference: false,
        name: 'Curve_' + p0.name + p1.name
    });
    //new_path is an outPath for p0 & c0
    if (p0.hasOwnProperty('outPath') === false) {
        // create p0.outPath array if it doesn't exist
        p0.outPath = [];
    }
    p0.outPath.push(new_path);
    if (c0.hasOwnProperty('outPath') === false) {
        // create c0.outPath array if it doesn't exist
        c0.outPath = [];
    }
    c0.outPath.push(new_path);

    //new_path is an inPath for c1 & p1
    if (c1.hasOwnProperty('inPath') === false) {
        // create c1.inPath array if not exist
        c1.inPath = [];
    }
    c1.inPath.push(new_path);

    if (p1.hasOwnProperty('inPath') === false) {
        // create p1.inPath array if not exist
        p1.inPath = [];
    }
    p1.inPath.push(new_path);

    //draw new_path on canvas
    canvas.add(new_path);
    canvas.bringToFront(p0);
    canvas.bringToFront(p1);
    canvas.bringToFront(c0);
    canvas.bringToFront(c1);
    return new_path;
} //addCurve()


// ------- main -------

function main() {

    // constants
    var IN = 90; // 90px per inch
    // resize canvas
    canvas.setWidth(7 * IN);
    canvas.setHeight(7 * IN);
    // corner points
    var a1 = addPoint('a1', 1 * IN, 3 * IN, 'knot');
    var a2 = addPoint('a2', 3 * IN, 1 * IN, 'knot');
    var a3 = addPoint('a3', 3 * IN, 3 * IN, 'knot');
    var a4 = addPoint('a4', 1 * IN, 1 * IN, 'knot');
    // control points
    a1.c1 = addPoint('a1.c1', 2 * IN, 1 * IN, 'control');
    a1.c2 = addPoint('a1.c2', 1 * IN, 2 * IN, 'control');
    a2.c1 = addPoint('a2.c1', 2 * IN, 3 * IN, 'control');
    a2.c2 = addPoint('a2.c2', 3 * IN, 2 * IN, 'control');
    // draw curves & lines
    addCurve(a1, a2.c1, a2.c2, a2);
    addCurve(a2, a1.c1, a1.c2, a1);
    addLine(a1, a4);
    addLine(a4, a2);
    addLine(a1, a3);
    addLine(a3, a2);

    // ------- all objects have been drawn; define observers -------

    canvas.observe('object:modified', function (e) {
        //update curves, lines & text when circles are moved
        // lines are accessed using .x1, .y1, .x2, .y2 attributes
        // curves are accessed through its 2 arrays:
        // [0][0] = 'M', [0][1] = po.x, [0][2] = po.y
        // [1][0]='C', [1][1]=c0.x, [1][2]=c0.y, [1][3]=c1.x, [1][4]=c1.y, [1][5]=p1.x, [1][6]=p1.y

        var p = e.target;
        console.log('Moving ' + p.name);

        if (p.hasOwnProperty("text") === true) {
            //move text label to new circle location
            p.text.set({ 'left': p.left, 'top': p.top - 10});
        }

        if (p.hasOwnProperty("inPath") === true) {
            //inpaths - paths end at circle
            for (var i=0; i<p.inPath.length; i++) {
                ppath = p.inPath[i];
                if (p.ptype === 'control') {
                    ppath.path[1][3] = p.left; // p is 2nd control circle in curve, update c1.x
                    ppath.path[1][4] = p.top; // p is 2nd control circle in curve, update c1.y
                } else if (ppath.type === 'path') {
                    ppath.path[1][5] = p.left; // p is end circle in curve, update p1.x
                    ppath.path[1][6] = p.top; // p is end circle in curve update p1.y
                } else if (ppath.type === 'line') {
                    ppath.set({ 'x2': p.left, 'y2': p.top }); //p is begin circle in line, update left & top
                }
            }
        }
        if (p.hasOwnProperty("outPath") === true) {
            //outpaths - paths begin at circle
            for (var i=0; i<p.outPath.length; i++) {
                ppath = p.outPath[i];
                if (p.ptype === 'control') {
                    ppath.path[1][1] = p.left; //p is 1st control circle in curve, update c0.x
                    ppath.path[1][2] = p.top; //p is 1st control circle in curve, update c0.y
                } else
                if (ppath.type === 'path') {
                    ppath.path[0][1] = p.left;  // p is begin circle in curve, update p0.x
                    ppath.path[0][2] = p.top;   // p is begin circle in curve, update p0.y
                } else if (ppath.type === 'line') {
                    ppath.set({ 'x1': p.left, 'y1': p.top }); //p is end circle in line, update left & top
                }
            }
        }
        console.log(p.name + ' moved!');
        canvas.renderAll();
        canvas.bringToFront(p);
    }); //canvas.observe()

} //main()
