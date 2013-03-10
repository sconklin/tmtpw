// ------- main -------

function drawPattern(mydata, styles,md) {

    console.log("drawPattern");

    //resize canvas
    var back_jacket_height = 7.5 * CM + md.back_waist_length + 1.75 * md.back_hip_length;
    var back_jacket_width = md.across_back / 2.0;
    var cwidth = 2 * BORDER + 2 * SEAM_ALLOWANCE + back_jacket_width + 12 * IN;
    var cheight = 2 * BORDER + 2 * SEAM_ALLOWANCE + back_jacket_height;
    canvas.setWidth(cwidth);
    canvas.setHeight(cheight);

    //create group for jacket pattern piece A
    var jacket = new fabric.Group();
    var back_jacket = new fabric.Group();
    var A = back_jacket;
    canvas.add(A);

    //pattern formulas
    var scale = md.bust_circumference / 2.0;

    //back jacket A
    var a1 = patternPointXY(A, 'a1', BORDER, BORDER, 'M'); //nape
    var a2 = patternPoint(A, 'a2', downPoint(a1, 7.5 * CM), 'L'); //back shoulder center
    var a3 = patternPoint(A, 'a3', downPoint(a1, md.back_underarm_height), 'L'); //back underarm height
    var a4 = patternPoint(A, 'a4', downPoint(a1, md.back_waist_length), 'L'); //back waist height
    var a5 = patternPoint(A, 'a5', downPoint(a4, md.back_hip_length), 'L'); //back hip height
    var a6 = patternPoint(A, 'a6', downPoint(a5, (0.75) * md.back_hip_length), 'L'); //back hem height
    var a7 = patternPoint(A, 'a7', rightPoint(a1, md.across_back / 2.0), 'L'); // across_back width at nape height
    var a8 = patternPoint(A, 'a8', point(a7.left, a6.top), 'L'); // across_back width at hip height
    var a9 = patternPoint(A, 'a9', point(a7.left, a2.top), 'L'); // across_back width at ? height
    var a10 = patternPoint(A, 'a10', point(a7.left, a3.top), 'L'); //across_back width at ? height
    var a11 = patternPoint(A, 'a11', point(a7.left, a4.top), 'L'); //across_back width at waist height
    var a12 = patternPoint(A, 'a12', point(a7.left, a5.top), 'L'); //across_back width at hip height
    var a13 = patternPoint(A, 'a13', rightPoint(a3, CM), 'L'); //back underarm center
    var a14 = patternPoint(A, 'a14', rightPoint(a4, 2.5 * CM), 'L'); //back waist center
    var a15 = patternPoint(A, 'a15', rightPoint(a5, 2 * CM), 'L'); //back hip center
    var a16 = patternPoint(A, 'a16', rightPoint(a6, 1.5 * CM), 'L'); //back hem center
    var a17 = patternPoint(A, 'a17', rightPoint(a1, (scale / 8.0) + 2 * CM), 'L'); //temp point
    var a18 = patternPoint(A, 'a18', upPoint(a17, 2 * CM), 'L'); //back neck side
    var a19 = patternPoint(A, 'a19', rightPoint(a9, CM), 'L'); //back shoulder tip
    var a20 = patternPoint(A, 'a20', upPoint(a10, scale / 8.0), 'L'); //back armscye point
    var a21 = patternPoint(A, 'a21', upPoint(a10, scale / 4.0), 'L'); //back sleeve balance point
    var a22 = patternPoint(A, 'a22', leftPoint(a10, CM), 'L'); //back underarm side
    var a23 = patternPoint(A, 'a23', leftPoint(a11, 3 * CM), 'L'); //back waist side
    var a24 = patternPoint(A, 'a24', leftPoint(a12, 2 * CM), 'L'); //back hip side
    var a25 = patternPoint(A, 'a25', leftPoint(a8, 1.5 * CM), 'L'); //back hem side

    //list point names & locations in console.log
    displayPoints(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25);

    //back jacket gridline
    var path_str = formatPath('M', a1, 'L', a6, 'L', a8, 'L', a7, 'z');
    var Agridline = new fabric.Path(path_str, styles.gridline_style);
    canvas.add(Agridline);
    //back jacket seamline
    path_str = formatPath('M', a1, 'L', a2, 'L', a13, 'L', a14, 'L', a15, 'L', a16, 'L', a25);
    path_str += formatPath(' L', a24, 'L', a23, 'L', a22, 'L', a20, 'L', a21, 'L', a19, 'L', a18, 'Q', a17, a1, 'z');
    var Aseamline = new fabric.Path(path_str, styles.seamline_style);
    canvas.add(Aseamline);
    //back jacket cuttingline
    var Acuttingline = new fabric.Path(path_str, styles.cuttingline_style);
    canvas.add(Acuttingline);
    Aseamline.sendToBack(); //seamline under points
    Acuttingline.sendToBack(); //cuttingline under seamline
    Agridline.sendToBack(); //gridline under cuttingline

    //draw back jacket
    canvas.add(A);

} //drawPattern()
