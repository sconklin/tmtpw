// steampunk_jacket2.js
// ------- main -------

function drawPattern(mydata, styles,md) {

    console.log("drawPattern");


    //pattern formulas
    var scale = md.bust_circumference / 2.0;

    //resize canvas
    var back_jacket_height = 7.5 * CM + md.back_waist_length + 1.75 * md.back_hip_length;
    var back_jacket_width = md.across_back / 2.0;
    var front_jacket_height = back_jacket_height + 2.5 * CM;
    var front_jacket_width = scale / 2.0;
    var cwidth = 2 * BORDER + 2 * SEAM_ALLOWANCE + back_jacket_width + 3 * CM + front_jacket_width + 15 * CM;
    var cheight = 2 * BORDER + 2 * SEAM_ALLOWANCE + Math.max(back_jacket_height, front_jacket_height);
    canvas.setWidth(cwidth);
    canvas.setHeight(cheight);

    //create group for jacket
    var jacket = new fabric.Group();
    //create group for back jacket pattern piece A
    var back_jacket = new fabric.Group();
    var A = back_jacket;

    A.points = [];

    //back jacket A
    var a1 = newPatternPointXY(A, 'a1', BORDER, BORDER, a3, 'Q', 'true'); //nape
    var a2 = newPatternPoint(A, 'a2', downPoint(a1, 7.5 * CM), a1, 'L', 'false'); //back shoulder center
    var a3 = newPatternPoint(A, 'a3', polarPoint(a1, 5 * CM, angleOfDegree(45)), a2, 'L', 'false'); //back neck side
    var a1_c1 = newControlPoint(A, 'a1_c1', rightPoint(a1, (scale / 8.0) + 2 * CM), a1); //temp point

    //list point names & locations in console.log
    displayPoints(a1, a2, a3, a1_c1);

    //back jacket A gridline
    var path_str = formatPath('M', a1, 'L', a1_c1, 'L', a3);
    var Agridline = new fabric.Path(path_str, styles.gridline_style);
    canvas.add(Agridline);
    //back jacket seamline
    path_str = formatPath('M', a1, 'L', a2, 'L', a3, 'Q', a1_c1, a1);
    var Aseamline = new fabric.Path(path_str, styles.seamline_style);
    canvas.add(Aseamline);
    //back jacket cuttingline
    var Acuttingline = new fabric.Path(path_str, styles.cuttingline_style);
    canvas.add(Acuttingline);
    //draw jacket A
    canvas.add(A);
    //arrange paths
    Aseamline.sendToBack(); //seamline under points
    Acuttingline.sendToBack(); //cuttingline under seamline
    Agridline.sendToBack(); //gridline under cuttingline




} //drawPattern()
