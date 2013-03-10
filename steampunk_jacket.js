// -------calculate points, draw pattern paths, link points & paths for animation
function drawPattern(mydata) {

    //define global constants
    //TODO: replace zoom var with zoom button on canvas
    var zoom = 1/4.0; // temporary - show at 1/4 size to fit canvas in window 
    var ANGLE45 = angleOfDegree(45);
    var ANGLE90 = angleOfDegree(90);
    var ANGLE180 = angleOfDegree(180);

    var INCH_to_PX = 90.0; //inkscape uses 90 pixels per 1 inch
    var CM_to_INCH = 1/2.54;
    var CM_to_PX = CM_to_INCH * INCH_to_PX;
    var CM = CM_to_PX * zoom; // CM - shorthand when using centimeters - zoom is temporary
    var IN = INCH_to_PX * zoom; // IN - shorthand when using inches - zoom is temporary

    var BORDER = 1.0 * IN;
    var SEAM_ALLOWANCE = (5/8.0) * IN;
    var PLOTTER_WIDTH = 36.0 * IN;

    //styles
    styles = {
	"default": {
	    "fill": "none",
	    "stroke": "red",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "4"
	},
	"buttonhole_style": {
	    "fill": "none",
	    "stroke": "green",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "3"
	},
	"cuttingline_style": {
	    "fill": "none",
	    "stroke": "green",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "4"
	},
	"dartline_style": {
	    "fill": "none",
	    "stroke": "green",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "3",
	    "stroke-dasharray": "6,6",
	    "stroke-dashoffset": "0"
	},
	"default_textblock_text_style": {
	    "fill": "#000000",
	    "fill-opacity": "1.0",
	    "font-size": "12",
	    "font-style": "normal",
	    "font-weight": "normal",
	    "stroke": "none",
	    "text-align": "right",
	    "text-anchor": "start",
	    "vertical-align": "top"
	},
	"default_letter_text_style": {
	    "fill": "#000000",
	    "fill-opacity": "1.0",
	    "font-size": "24",
	    "font-style": "normal",
	    "font-weight": "normal",
	    "stroke": "none",
	    "text-align": "right",
	    "text-anchor": "start",
	    "vertical-align": "top"
	},
	"foldline_style": {
	    "fill": "none",
	    "stroke": "darkgreen",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "6"
	},
	"grainline_style": {
	    "fill": "none",
	    "stroke": "green",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "4"
	},
	"gridline_style": {
	    "fill": "none",
	    "stroke": "gray",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "2",
	    "stroke-dasharray": "6,6",
	    "stroke-dashoffset": "0"
	},
	"hemline_style": {
	    "fill": "none",
	    "stroke": "green",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "3",
	    "stroke-dasharray": "6,6",
	    "stroke-dashoffset": "0"
	},
	"line_style": {
	    "fill": "none",
	    "stroke": "pink",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "4"
	},
	"markingline_style": {
	    "fill": "none",
	    "stroke": "lightgreen",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "5"
	},
	"placement_style": {
	    "fill": "none",
	    "stroke": "gray",
	    "stroke-dasharray": "6,18",
	    "stroke-dashoffset": "0",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "4"
	},
	"point_style": {
	    "fill": "red",
	    "stroke": "red",
	    "stroke-width": "1"
	},
	"controlpoint_style": {
	    "fill": "none",
	    "stroke": "gray",
	    "stroke-width": "1"
	},
	"circle_style": {
	    "fill": "none",
	    "stroke": "green",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "4"
	},
	"point_text_style": {
	    "fill": "darkblue",
	    "fill-opacity": "1.0",
	    "font-size": "30",
	    "font-style": "italic",
	    "font-weight": "normal",
	    "stroke": "none",
	    "text-align": "right",
	    "text-anchor": "right",
	    "vertical-align": "top"
	},
	"control_point_text_style": {
	    "fill": "gray",
	    "fill-opacity": "1.0",
	    "font-size": "25",
	    "font-style": "italic",
	    "font-weight": "normal",
	    "stroke": "none",
	    "text-align": "right",
	    "text-anchor": "right",
	    "vertical-align": "top"
	},
	"reference_path_style": {
	    "fill": "none",
	    "stroke": "gray",
	    "stroke-dasharray": "6,18",
	    "stroke-dashoffset": "0",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "2"
	},
	"seamline_style": {
	    "fill": "none",
	    "stroke": "green",
	    "stroke-dasharray": "24,6",
	    "stroke-dashoffset": "0",
	    "stroke-linejoin": "miter",
	    "stroke-miterlimit": "4",
	    "stroke-width": "4"
	},
	"textblock_box_style": {
	    "fill": "none",
	    "rx": "5",
	    "ry": "5",
	    "stroke": "blue",
	    "stroke-width": "6"
	},
	"titleblock_text_style": {
	    "fill": "#000000",
	    "fill-opacity": "1.0",
	    "font-size": "40",
	    "font-style": "normal",
	    "font-weight": "normal",
	    "stroke": "none",
	    "text-align": "right",
	    "text-anchor": "right",
	    "vertical-align": "top"
	},
	"letter_text_style": {
	    "fill": "#000000",
	    "fill-opacity": "1.0",
	    "font-size": "24",
	    "font-style": "normal",
	    "font-weight": "normal",
	    "stroke": "none",
	    "text-align": "right",
	    "text-anchor": "start",
	    "vertical-align": "top"
	},
	"tooltip_text_style": {
	    "fill": "blue",
	    "fill-opacity": "1.0",
	    "font-size": "50",
	    "font-style": "normal",
	    "font-weight": "normal",
	    "stroke": "black",
	    "text-align": "right",
	    "text-anchor": "right",
	    "vertical-align": "top"
	}
    } //styles



    //read the measurement data    

    if (mydata.measureunit.value == 'cm') {
	var munit = CM;
    }
    else {
	var munit = IN;
    }

    customername = mydata.customername.value

    neck_circumference = mydata.neck_circumference.value * munit
    neck_width = mydata.neck_width.value * munit

    underarm_circumference = mydata.underarm_circumference.value * munit
    front_underarm_width = mydata.front_underarm_width.value * munit
    front_underarm_height = mydata.front_underarm_height.value * munit
    back_underarm_width = mydata.back_underarm_width.value * munit
    back_underarm_height = mydata.back_underarm_height.value * munit

    across_chest = mydata.across_chest.value * munit
    across_chest_height = mydata.across_chest_height.value * munit
    across_chest_balance = mydata.across_chest_balance.value * munit
    across_back = mydata.across_back.value * munit
    across_back_height = mydata.across_back_height.value * munit
    across_back_balance = mydata.across_back_balance.value * munit

    bust_circumference = mydata.bust_circumference.value * munit
    front_bust_width = mydata.front_bust_width.value * munit
    front_bust_height = mydata.front_bust_height.value * munit
    bust_point_distance = mydata.bust_point_distance.value * munit
    bust_underarm_height = mydata.bust_underarm_height.value * munit
    back_bust_width = mydata.back_bust_width.value * munit
    back_bust_height = mydata.back_bust_height.value * munit

    underbust_circumference = mydata.underbust_circumference.value * munit
    front_underbust_width = mydata.front_underbust_width.value * munit
    front_underbust_height = mydata.front_underbust_height.value * munit
    front_underbust_length = mydata.front_underbust_length.value * munit
    side_underbust_height = mydata.side_underbust_height.value * munit
    back_underbust_width = mydata.back_underbust_width.value * munit
    back_underbust_length = mydata.back_underbust_length.value * munit

    shoulder = mydata.shoulder.value * munit
    front_shoulder_height = mydata.front_shoulder_height.value * munit
    front_shoulder_width = mydata.front_shoulder_width.value * munit
    back_shoulder_height = mydata.back_shoulder_height.value * munit
    back_shoulder_width = mydata.back_shoulder_width.value * munit

    side = mydata.side.value * munit

    front_neck_balance = mydata.front_neck_balance.value * munit
    front_shoulder_balance = mydata.front_shoulder_balance.value * munit
    front_waist_balance = mydata.front_waist_balance.value * munit
    back_neck_balance = mydata.back_neck_balance.value * munit
    back_shoulder_balance = mydata.back_shoulder_balance.value * munit
    back_waist_balance = mydata.back_waist_balance.value * munit

    waist_circumference = mydata.waist_circumference.value * munit
    front_waist_width = mydata.front_waist_width.value * munit
    front_waist_length = mydata.front_waist_length.value * munit
    back_waist_width = mydata.back_waist_width.value * munit
    back_waist_length = mydata.back_waist_length.value * munit

    armscye_height = mydata.armscye_height.value * munit
    armscye_width = mydata.armscye_width.value * munit

    overarm_length = mydata.overarm_length.value * munit
    underarm_length = mydata.underarm_length.value * munit

    arm_sleeve_top_offset = mydata.arm_sleeve_top_offset.value * munit
    arm_sleevecap_width = mydata.arm_sleevecap_width.value * munit

    arm_circumference = mydata.arm_circumference.value * munit
    elbow_circumference = mydata.elbow_circumference.value * munit
    wrist_circumference = mydata.wrist_circumference.value * munit
    hand_circumference = mydata.hand_circumference.value * munit

    hip_circumference = mydata.hip_circumference.value * munit
    front_hip_width = mydata.front_hip_width.value * munit
    front_hip_length = mydata.front_hip_length.value * munit
    back_hip_width = mydata.back_hip_width.value * munit
    back_hip_length = mydata.back_hip_length.value * munit
    side_hip_length = mydata.side_hip_length.value * munit

    pelvic_distance = mydata.pelvic_distance.value * munit

    front_rise = mydata.front_rise.value * munit
    side_rise = mydata.side_rise.value * munit
    back_rise = mydata.back_rise.value * munit

    crotch_length = mydata.crotch_length.value * munit
    front_crotch_length = mydata.front_crotch_length.value * munit
    back_crotch_length = mydata.back_crotch_length.value * munit
    front_crotch_extension = mydata.front_crotch_extension.value * munit
    back_crotch_extension = mydata.back_crotch_extension.value * munit

    outseam = mydata.outseam.value * munit
    inseam = mydata.inseam.value * munit

    thigh_circumference = mydata.thigh_circumference.value * munit
    front_thigh_width = mydata.front_thigh_width.value * munit
    back_thigh_width = mydata.back_thigh_width.value * munit

    knee_circumference = mydata.knee_circumference.value * munit
    calve_circumference = mydata.calve_circumference.value * munit
    ankle_circumference = mydata.ankle_circumference.value * munit
    foot_circumference = mydata.foot_circumference.value * munit

    //resize canvas
    back_jacket_height = 7.5*CM + back_waist_length +1.75*back_hip_length;
    back_jacket_width = across_back/2.0
    var cwidth = 2*BORDER + 2*SEAM_ALLOWANCE + back_jacket_width + 12 * IN;
    var cheight = 2*BORDER + 2*SEAM_ALLOWANCE + back_jacket_height;
    canvas.setWidth(cwidth);
    canvas.setHeight(cheight);

    //create group for jacket pattern piece A
    var jacket = new fabric.Group();
    canvas.add(jacket);
    A = jacket;

    //pattern formulas
    var scale = bust_circumference/2.0;

    var a1 = patternPointXY('a1', BORDER, BORDER, 'M'); //nape
    var a2 = patternPoint('a2', downPoint(a1, 7.5*CM), 'L'); //back shoulder center
    var a3 = patternPoint('a3', downPoint(a1, back_underarm_height), 'L'); //back underarm height
    var a4 = patternPoint('a4', downPoint(a1, back_waist_length), 'L'); //back waist height
    var a5 = patternPoint('a5', downPoint(a4, back_hip_length), 'L'); //back hip height
    var a6 = patternPoint('a6', downPoint(a5, (0.75) * back_hip_length), 'L') //back hem height
    var a7 = patternPoint('a7', rightPoint(a1, across_back/2.0), 'L'); // across_back width at nape height
    var a8 = patternPoint('a8', point(a7.left, a6.top),'L'); // across_back width at hip height 
    var a9 = patternPoint('a9', point(a7.left, a2.top),'L'); // across_back width at ? height
    var a10 = patternPoint('a10', point(a7.left, a3.top),'L'); //across_back width at ? height
    var a11 = patternPoint('a11', point(a7.left, a4.top),'L'); //across_back width at waist height
    var a12 = patternPoint('a12', point(a7.left, a5.top),'L'); //across_back width at hip height
    var a13 = patternPoint('a13', rightPoint(a3, 1 * CM),'L'); //back underarm center
    var a14 = patternPoint('a14', rightPoint(a4, 2.5 * CM),'L' ); //back waist center
    var a15 = patternPoint('a15', rightPoint(a5, 2 * CM),'L'); //back hip center
    var a16 = patternPoint('a16', rightPoint(a6, 1.5 * CM),'L'); //back hem center
    var a17 = patternPoint('a17', rightPoint(a1, (scale/8.0) + 2 * CM),'L'); //temp point
    var a18 = patternPoint('a18', upPoint(a17, 2 * CM),''); //back neck side 
    var a19 = patternPoint('a19', rightPoint(a9, 1 * CM),'L'); //back shoulder tip
    var a20 = patternPoint('a20', upPoint(a10, scale/8.0),'L'); //back armscye point
    var a21 = patternPoint('a21', upPoint(a10, scale/4.0),'L'); //back sleeve balance point
    var a22 = patternPoint('a22', leftPoint(a10, 1 * CM),'L'); //back underarm side
    var a23 = patternPoint('a23', leftPoint(a11, 3 * CM),'L'); //back waist side
    var a24 = patternPoint('a24', leftPoint(a12, 2 * CM),'L'); //back hip side
    var a25 = patternPoint('a25', leftPoint(a8, 1.5 * CM),'L'); //back hem side


    displayPoints(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25);

    //pattern paths    
    //var neck_path = 'M ' + a1.coords + ' Q '+ a2_c1.coords + ' ' + a2.coords
    //var curve_a = new fabric.Path(neck_path, { fill: '', stroke: 'black' });
    //curve_a.selectable = false;
    //canvas.add(curve_a);
    //gridlines
    var path_str = formatPath('M', a1, 'L', a6, 'L', a8, 'L', a7, 'z');
    var gridline = new fabric.Path(path_str, styles.gridline_style);
    canvas.add(gridline);
    //seamlines
    path_str = formatPath('M', a1, 'L', a2, 'L', a13, 'L', a14, 'L', a15, 'L', a16, 'L', a25);
    path_str += formatPath( ' L', a24, 'L', a23, 'L', a22, 'L', a20, 'L', a21, 'L', a19, 'L', a18, 'Q', a17, a1, 'z');
    var seamline = new fabric.Path(path_str, styles.seamline_style);
    canvas.add(seamline);
    //cuttinglines
    cuttingline = new fabric.Path(path_str, styles.cuttingline_style);
    canvas.add(cuttingline);


}; //drawPattern()

// ------- debug utils -------

function displayPoints(string) {
    //write point values to console for debuggin
    var args = arguments;
    for(var i=0; i<args.length; i++){
	//do something by accessing valueArray[i];
	console.log(args[i].name  +' '+ args[i].left +' '+ args[i].top);
    }              
} //displayPoints()

// ------- undrawn locations -------

function point(left, top) {
    var c = new fabric.Object({
	left: left,
	top: top,
	coords: left +', '+ top
    });
    console.log('new point '+ c.left +' '+ c.top);
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

// ------- drawn canvas points -------

function patternPoint(pname, pnt, svg_cmd) {
    var c = new fabric.Circle({
	left: pnt.left,
	top: pnt.top,
	strokeWidth: 1,
	radius: 5,
	fill: 'red',
	stroke: 'red',
	name: pname,
	selectable: true,
	reference: true,
	coords: pnt.left +', '+  pnt.top,
	cmd: svg_cmd
    });

    c.hasBorders = c.hasControls = false;
    canvas.add(c);   
    return c;
} // patternPointXY()

function patternPointXY(pname, left, top, svg_cmd) {
    return patternPoint(pname, point(left, top), svg_cmd ); 
} //patternPoint()


function controlPoint(pname, pnt) {
    var c = new fabric.Circle({
	left: pnt.left,
	top: pnt.top,
	strokeWidth: 1,
	radius: 5,
	fill: 'none',
	stroke: 'gray',
	name: pname,
	reference: 'true',
	coords: pnt.left +', '+ pnt.top
    }); 
    c.hasBorders = c.hasControls = false;
    canvas.add(c);
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
    for (var i=0; i<args.length; i++) {
	arg = args[i];
	if (typeof arg == "string" ) {
		path_str += " " + arg;
	}
	else {
		path_str += ' '+ arg.left +', '+ arg.top;
	}                
    }
    console.log('path_str = ' + path_str);
    return path_str.trim(); //return path_str with leading & trailing whitespace removed
} //formatPath()

// -------define the canvas 
var canvas = new fabric.Canvas('c');
canvas.on({
    'object:selected': onObjectSelected,
    'object:moving': onObjectMoving,
    'before:selection:cleared': onBeforeSelectionCleared
}); 

// ------- math -------

function distance(p1,p2) {
    //Accepts two points p1 & p2. Returns the distance between p1 & p2
    return Math.pow(p2.x-p1.x, 2) + Math.pow(p2.y-p1.y,0.5);
} // distance()

function angleOfDegree(degree) {
    //Accepts degrees, returns radians
    return degree * Math.PI/180.0;
} //angleOfDegree()

// ------- animation -------
function onObjectSelected(e) {
    var activeObject = e.target; 
    if (activeObject.name == "p0" || activeObject.name == "p2") {
	activeObject.line2.animate('opacity', '1', {
	    duration: 200,
	    onChange: canvas.renderAll.bind(canvas),
	});
	activeObject.line2.selectable = true;
    }
} //onObjectSeleced()

function onBeforeSelectionCleared(e) {
    var activeObject = e.target;
    if (activeObject.name == "p0" || activeObject.name == "p2") {
	activeObject.line2.animate('opacity', '0', {
	    duration: 200,
	    onChange: canvas.renderAll.bind(canvas),
	});
	activeObject.line2.selectable = false;
    }
    else if (activeObject.name == "p1") {
	activeObject.animate('opacity', '0', {
	    duration: 200,
	    onChange: canvas.renderAll.bind(canvas),
	});
	activeObject.selectable = false;
    }
} // onBeforeSelectionCleared()

function onObjectMoving(e) {
    if (e.target.name == "p0" || e.target.name == "p2") {
	var p = e.target; 
	if (p.line1) {
	    p.line1.path[0][1] = p.left;
	    p.line1.path[0][2] = p.top;
	}
	else if (p.line3) {
	    p.line3.path[1][3] = p.left;
	    p.line3.path[1][4] = p.top;
	}
    }
    else if (e.target.name == "p1") {
	var p = e.target;
	if (p.line2) {
	    p.line2.path[1][1] = p.left;
	    p.line2.path[1][2] = p.top;
	}
    }
    else if (e.target.name == "p0" || e.target.name == "p2") {
	var p = e.target;
	p.line1 && p.line1.set({ 'x2': p.left, 'y2': p.top });
	p.line2 && p.line2.set({ 'x1': p.left, 'y1': p.top });
	p.line3 && p.line3.set({ 'x1': p.left, 'y1': p.top });
	p.line4 && p.line4.set({ 'x1': p.left, 'y1': p.top });
    }
} // onObjectMoving()