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
    //create group for front jacket pattern piece B
    var front_jacket = new fabric.Group();
    var B = back_jacket;



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

    //front jacket B pattern points
    var b1 = patternPoint(B, 'b1', rightPoint(a10, 7.5 * CM)); //front underarm side
    var b2 = patternPoint(B, 'b2', rightPoint(a20, 8.5 * CM)); //front armscye point
    var b3 = patternPoint(B, 'b3', rightPoint(a11, 7.5 * CM)); //front waist side
    var b4 = patternPoint(B, 'b4', rightPoint(a12, 4.5 * CM)); //front hip side
    var b5 = patternPoint(B, 'b5', rightPoint(a8, 3 * CM)); //front hem side
    var b6 = patternPoint(B, 'b6', rightPoint(b1, scale / 4.0 + 2 * CM)); //on underarm line at armscye width
    var b7 = patternPoint(B, 'b7', upPoint(b6, md.back_underarm_height)); //on top grid line at armscye width
    var b8 = patternPoint(B, 'b8', rightPoint(b7, scale / 8.0 + CM)); //front neck side
    var b9 = patternPoint(B, 'b9', downPoint(b7, 1.3 * CM)); //on shoulder seam at armscye width
    var b10 = patternPoint(B, 'b10', pointOnLineAtLength(b8, b9, distance(a18, a19) - CM)); //front shoulder tip
    var b11 = patternPoint(B, 'b11', upPoint(b6, 2.5 * CM)); //on front armscye curve
    var b12 = patternPoint(B, 'b12', midPoint(b11, b10)); //reference point between shoulder tip and armscye curve
    var b13 = patternPoint(B, 'b13', polarPoint(b12, 2 * CM, angleOfLine(b11, b10) + ANGLE90)); //between shoulder tip and armscye curve
    var b14 = patternPoint(B, 'b14', polarPoint(b6, 2 * CM, angleOfDegree(225))); //on front armscye curve
    var b15 = patternPoint(B, 'b15', polarPoint(b1, 4 * CM, angleOfDegree(315))); //on front armscye curve
    var b16 = patternPoint(B, 'b16', rightPoint(b6, (scale / 2.0) - (3.5 * CM))); //front center line, top buttonhole position
    var b17 = patternPoint(B, 'b17', point(b16.left, b3.top)); //front center waist
    var b18 = patternPoint(B, 'b18', point(b16.left, b5.top)); //front center hem
    var b19 = patternPoint(B, 'b19', downPoint(b18, 2.5 * CM)); //front center extended hem
    var b20 = patternPoint(B, 'b20', rightPoint(b16, 2 * CM)); //front underarm center
    var b21 = patternPoint(B, 'b21', rightPoint(b17, 2 * CM)); //front waist center
    var b22 = patternPoint(B, 'b22', leftPoint(b18, 6.5 * CM)); //on front hem center
    var b23 = patternPoint(B, 'b23', upPoint(b18, distance(a6, a5) / 4.0)); //ref point on front center line
    var b24 = patternPoint(B, 'b24', intersectLines(b5, b19, b23, b22)); //start of front hem
    var b25 = patternPoint(B, 'b25', upPoint(b20, 16.5 * CM)); //front lapel point
    var b26 = patternPoint(B, 'b26', downPoint(b8, 6.5 * CM)); //reference point at neck curve
    var b27 = patternPoint(B, 'b27', pointOnLineAtLength(b8, b10, -2.5 * CM)); //reference point at neck side
    var b28 = patternPoint(B, 'b28', intersectLines(b26, b25, b27, b20)); //point between neck curve and front lapel
    var b29 = patternPoint(B, 'b29', polarPoint(b26, 2.5 * CM, angleOfDegree(315))); //point on neck curve
    var b30 = patternPoint(B, 'b30', midPoint(b28, b25)); //middle of lapel dart on lapel top edge
    var b31 = patternPoint(B, 'b31', polarPoint(b30, 9 * CM, angleOfDegree(100))); //collar dart point
    var collar_dart_width = 1.3 * CM;
    var b32 = patternPoint(B, 'b32', leftPoint(b30, collar_dart_width / 2.0)); //
    var b33 = patternPoint(B, 'b33', rightPoint(b30, collar_dart_width / 2.0)); //
    var b34 = patternPoint(B, 'b34', pointOnLineAtLength(b32, b31, -0.5 * CM)); //collar dart inside leg
    var b35 = patternPoint(B, 'b35', pointOnLineAtLength(b33, b31, -0.5 * CM)); //collar dart outside leg





    //list point names & locations in console.log
    displayPoints(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25);
    displayPoints(b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20);

    //back jacket A gridline
    var path_str = formatPath('M', a1, 'L', a7, 'L', a8, 'L', a6, 'L', a1, 'M', a2, 'L', a19, 'M', a3, 'L', a10,
                    'M', a4, 'L', a11, 'M', a5, 'L', a12, 'M', a18, 'L', a17);
    var Agridline = new fabric.Path(path_str, styles.gridline_style);
    canvas.add(Agridline);
    //back jacket seamline
    path_str = formatPath('M', a1, 'L', a2, 'L', a13, 'L', a14, 'L', a15, 'L', a16, 'L', a25,
                        ' L', a24, 'L', a23, 'L', a22, 'L', a20, 'L', a21, 'L', a19, 'L', a18, 'Q', a17, a1, 'z');
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

    //back jacket B
    //back jacket gridline
    var path_str = formatPath('M', a7, 'L', b8, 'M', a20, 'L', b2, 'M', a10, 'L', b20, 'M', a11, 'L', b21,
                        'M', a12, 'L', b4, 'M', a8, 'L', b18, 'M', b5, 'L', b19,
                        'M', a7, 'L', a8, 'M', b15, 'L', b1, 'M', b14, 'L', b6, 'M', b10, 'L', b11, 'M', b12, 'L', b13,
                        'M', b7, 'L', b6, 'M', b8, 'L', b26, 'L', b28, 'L', b25, 'L', b21,
                        'M', b10, 'L', b27, 'L', b20, 'M', b26, 'L', b29,
                        'M', b16, 'L', b19, 'M', b23, 'L', b24);
    var Bgridline = new fabric.Path(path_str, styles.gridline_style);
    canvas.add(Bgridline);
    //back jacket  seamline & cuttingline
    path_str = formatPath('M', b25, 'L', b20, 'L', b21, 'L', b22, 'L', b24, 'L', b5, 'L', b4, 'L', b3, 'L', b1, 'L', b2,
                        'L', b15, 'L', b14, 'L', b11, 'L', b13, 'L', b10, 'L', b8, 'L', b29, 'L', b28,
                        'L', b34, 'L', b31, 'L', b35, 'L', b25, 'z');
    var Bseamline = new fabric.Path(path_str, styles.seamline_style);
    var Bcuttingline = new fabric.Path(path_str, styles.cuttingline_style);
    canvas.add(Bseamline);
    canvas.add(Bcuttingline);
    //draw back jacket B
    canvas.add(B);
    //arrange paths
    Bseamline.sendToBack(); //seamline under points
    Bcuttingline.sendToBack(); //cuttingline under seamline
    Bgridline.sendToBack(); //gridline under cuttingline


} //drawPattern()
