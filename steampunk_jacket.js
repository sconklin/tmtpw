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
    var jacket_back = new fabric.Group();
    var A = jacket_back;
    //create group for front jacket pattern piece B
    var jacket_front = new fabric.Group();
    var B = jacket_front;

    //jacket points
    //jacket back A pattern points
    var a1 = addPointXY('a1', BORDER, BORDER, 'patternpoint'); //nape
    var a2 = addPoint('a2', downPoint(a1, 7.5 * CM), 'patternpoint'); //back shoulder center
    var a3 = addPoint('a3', downPoint(a1, md.back_underarm_height), 'patternpoint'); //back underarm height
    var a4 = addPoint('a4', downPoint(a1, md.back_waist_length), 'patternpoint'); //back waist height
    var a5 = addPoint('a5', downPoint(a4, md.back_hip_length), 'patternpoint'); //back hip height
    var a6 = addPoint('a6', downPoint(a5, (0.75) * md.back_hip_length), 'patternpoint'); //back hem height
    var a7 = addPoint('a7', rightPoint(a1, md.across_back / 2.0), 'patternpoint'); // across_back width at nape height
    var a8 = addPoint('a8', point(a7.left, a6.top), 'patternpoint'); // across_back width at hip height
    var a9 = addPoint('a9', point(a7.left, a2.top), 'patternpoint'); // across_back width at ? height
    var a10 = addPoint('a10', point(a7.left, a3.top), 'patternpoint'); //across_back width at ? height
    var a11 = addPoint('a11', point(a7.left, a4.top), 'patternpoint'); //across_back width at waist height
    var a12 = addPoint('a12', point(a7.left, a5.top), 'patternpoint'); //across_back width at hip height
    var a13 = addPoint('a13', rightPoint(a3, CM), 'patternpoint'); //back underarm center
    var a14 = addPoint('a14', rightPoint(a4, 2.5 * CM), 'patternpoint'); //back waist center
    var a15 = addPoint('a15', rightPoint(a5, 2 * CM), 'patternpoint'); //back hip center
    var a16 = addPoint('a16', rightPoint(a6, 1.5 * CM), 'patternpoint'); //back hem center
    var a17 = addPoint('a17', rightPoint(a1, (scale / 8.0) + 2 * CM), 'patternpoint'); //temp point
    var a18 = addPoint('a18', upPoint(a17, 2 * CM), 'patternpoint'); //back neck side
    var a19 = addPoint('a19', rightPoint(a9, CM), 'patternpoint'); //back shoulder tip
    var a20 = addPoint('a20', upPoint(a10, scale / 8.0), 'patternpoint'); //back armscye point
    var a21 = addPoint('a21', upPoint(a10, scale / 4.0), 'patternpoint'); //back sleeve balance point
    var a22 = addPoint('a22', leftPoint(a10, CM), 'patternpoint'); //back underarm side
    var a23 = addPoint('a23', leftPoint(a11, 3 * CM), 'patternpoint'); //back waist side
    var a24 = addPoint('a24', leftPoint(a12, 2 * CM), 'patternpoint'); //back hip side
    var a25 = addPoint('a25', leftPoint(a8, 1.5 * CM), 'patternpoint'); //back hem side
    //jacket back A control points
    a1.c1 = addPoint('a1.c1', a17, 'controlpoint');
    a1.c2 = addPoint('a1.c2', rightPoint(a1, distance(a1, a18)/3.0), 'controlpoint');
    var length = distance(a2, a13) / 3.0;
    a13.c1 = addPoint('a13.c1', downPoint(a2, length), 'controlpoint');
    a13.c2 = addPoint('a13.c2', polarPoint(a13, length, angleOfLine(a13, a2)), 'controlpoint');
    length = distance(a13, a14) / 3.0;
    a14.c1 = addPoint('a14.c1', polarPoint(a13, length, angleOfLine(a13, a14)), 'controlpoint');
    a14.c2 = addPoint('a14.c2', upPoint(a14, length), 'controlpoint');
    length = distance(a18, a19) / 3.0;
    a18.c1 = addPoint('a18.c1', polarPoint(a19, length, angleOfLine(a19, a17)), 'controlpoint');
    a18.c2 = addPoint('a18.c2', polarPoint(a18, length, angleOfLine(a18, a19)), 'controlpoint');
    length = distance(a19, a21) / 3.0;
    a19.c1 = addPoint('a19.c1', upPoint(a21, length), 'controlpoint');
    a19.c2 = addPoint('a19.c2', polarPoint(a19, length, angleOfLine(a18, a19) + ANGLE90), 'controlpoint');
    length = distance(a20, a22) / 3.0;
    a20.c1 = addPoint('a20.c1', polarPoint(a22, length, angleOfLine(a23, a22)), 'controlpoint');
    a20.c2 = addPoint('a20.c2', polarPoint(a20, length, angleOfLine(a20, a20.c1)), 'controlpoint');
    length = distance(a22, a23) / 3.0;
    a22.c1 = addPoint('a22.c1', upPoint(a23, length), 'controlpoint');
    a22.c2 = addPoint('a22.c2', polarPoint(a22, length, angleOfLine(a22, a23)), 'controlpoint');


    //front jacket B pattern points
    var b1 = addPoint('b1', rightPoint(a10, 7.5 * CM), 'patternpoint'); //front underarm side
    var b2 = addPoint('b2', rightPoint(a20, 8.5 * CM), 'patternpoint'); //front armscye point
    var b3 = addPoint('b3', rightPoint(a11, 7.5 * CM), 'patternpoint'); //front waist side
    var b4 = addPoint('b4', rightPoint(a12, 4.5 * CM), 'patternpoint'); //front hip side
    var b5 = addPoint('b5', rightPoint(a8, 3 * CM), 'patternpoint'); //front hem side
    var b6 = addPoint('b6', rightPoint(b1, scale / 4.0 + 2 * CM), 'patternpoint'); //on underarm line at armscye width
    var b7 = addPoint('b7', upPoint(b6, md.back_underarm_height), 'patternpoint'); //on top grid line at armscye width
    var b8 = addPoint('b8', rightPoint(b7, scale / 8.0 + CM), 'patternpoint'); //front neck side
    var b9 = addPoint('b9', downPoint(b7, 1.3 * CM), 'patternpoint'); //on shoulder seam at armscye width
    var b10 = addPoint('b10', pointOnLineAtLength(b8, b9, distance(a18, a19) - CM), 'patternpoint'); //front shoulder tip
    var b11 = addPoint('b11', upPoint(b6, 2.5 * CM), 'patternpoint'); //on front armscye curve
    var b12 = addPoint('b12', midPoint(b11, b10), 'patternpoint'); //reference point between shoulder tip and armscye curve
    var b13 = addPoint('b13', polarPoint(b12, 2 * CM, angleOfLine(b11, b10) + ANGLE90), 'patternpoint'); //between shoulder tip and armscye curve
    var b14 = addPoint('b14', polarPoint(b6, 2 * CM, angleOfDegree(225)), 'patternpoint'); //on front armscye curve
    var b15 = addPoint('b15', polarPoint(b1, 4 * CM, angleOfDegree(315)), 'patternpoint'); //on front armscye curve
    var b16 = addPoint('b16', rightPoint(b6, (scale / 2.0) - (3.5 * CM)), 'patternpoint'); //front center line, top buttonhole position
    var b17 = addPoint('b17', point(b16.left, b3.top), 'patternpoint'); //front center waist
    var b18 = addPoint('b18', point(b16.left, b5.top), 'patternpoint'); //front center hem
    var b19 = addPoint('b19', downPoint(b18, 2.5 * CM), 'patternpoint'); //front center extended hem
    var b20 = addPoint('b20', rightPoint(b16, 2 * CM), 'patternpoint'); //front underarm center
    var b21 = addPoint('b21', rightPoint(b17, 2 * CM), 'patternpoint'); //front waist center
    var b22 = addPoint('b22', leftPoint(b18, 6.5 * CM), 'patternpoint'); //on front hem center
    var b23 = addPoint('b23', upPoint(b18, distance(a6, a5) / 4.0), 'patternpoint'); //ref point on front center line
    var b24 = addPoint('b24', intersectLines(b5, b19, b23, b22), 'patternpoint'); //start of front hem
    var b25 = addPoint('b25', upPoint(b20, 16.5 * CM), 'patternpoint'); //front lapel point
    var b26 = addPoint('b26', downPoint(b8, 6.5 * CM), 'patternpoint'); //reference point at neck curve
    var b27 = addPoint('b27', pointOnLineAtLength(b8, b10, -2.5 * CM), 'patternpoint'); //reference point at neck side
    var b28 = addPoint('b28', intersectLines(b26, b25, b27, b20), 'patternpoint'); //point between neck curve and front lapel
    var b29 = addPoint('b29', polarPoint(b26, 2.5 * CM, angleOfDegree(315)), 'patternpoint'); //point on neck curve
    var b30 = addPoint('b30', midPoint(b28, b25), 'patternpoint'); //middle of lapel dart on lapel top edge
    var b31 = addPoint('b31', polarPoint(b30, 9 * CM, angleOfDegree(100)), 'patternpoint'); //collar dart point
    var collar_dart_width = 1.3 * CM;
    var b32 = addPoint('b32', leftPoint(b30, collar_dart_width / 2.0), 'patternpoint'); //
    var b33 = addPoint('b33', rightPoint(b30, collar_dart_width / 2.0), 'patternpoint'); //
    var b34 = addPoint('b34', pointOnLineAtLength(b32, b31, -0.5 * CM), 'patternpoint'); //collar dart inside leg
    var b35 = addPoint('b35', pointOnLineAtLength(b33, b31, -0.5 * CM), 'patternpoint'); //collar dart outside leg

    //list point names & locations in console.log
    displayPoints(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20, a21, a22, a23, a24, a25);
    displayPoints(b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20);

    //back jacket A gridline
    var path_str = formatPath('M', a1, 'L', a7, 'L', a8, 'L', a6, 'L', a1, 'M', a2, 'L', a19, 'M', a3, 'L', a10, 'M', a4, 'L', a11,
            'M', a5, 'L', a12, 'M', a18, 'L', a17);
    var Agridline = new fabric.Path(path_str, styles.gridline_style);
    canvas.add(Agridline);
    canvas.sendToBack(Agridline);
    //back jacket A seamline
    addLine(a1, a2, 'seamline');
    addCurve(a2, a13.c1, a13.c2, a13, 'seamline');
    addCurve(a13, a14.c1, a14.c2, a14, 'seamline');
    addLine(a14, a15, 'seamline');
    addLine(a15, a16, 'seamline');
    addLine(a16, a25, 'seamline');
    addLine(a25, a24, 'seamline');
    addLine(a24, a23, 'seamline');
    addCurve(a23, a22.c1, a22.c2, a22, 'seamline');
    addCurve(a22, a20.c1, a20.c2, a20, 'seamline');
    addLine(a20, a21, 'seamline');
    addCurve(a21, a19.c1, a19.c2, a19, 'seamline');
    addCurve(a19, a18.c1, a18.c2, a18, 'seamline');
    addCurve(a18, a1.c1, a1.c2, a1, 'seamline');

    //draw jacket A
    canvas.add(A);

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


    //update lines & text when circles are moved
    canvas.observe('object:modified', function (e) {
        var p = e.target;

        if (p.hasOwnProperty("text") === true) {
            //move text label to new circle location
            console.log('Moving ' + p.text.name);
            p.text.set({ 'left': p.left, 'top': p.top });

        }
        if (p.hasOwnProperty("inPath") === true) {
            //path ends at circle
            for (var i=0; i<p.inPath.length; i++) {
                ppath = p.inPath[i];
                console.log('ppath = ' + ppath);
                if (p.ptype === 'control') {
                    ppath.path[1][3] = p.left; //c0.x
                    ppath.path[1][4] = p.top; //c0.y
                } else if (ppath.type === 'path') {
                    ppath.path[1][5] = p.left; //p1.x
                    ppath.path[1][6] = p.top; //p1.y
                } else if (ppath.type === 'line') {
                    ppath.set({ 'x2': p.left, 'y2': p.top });
                }
            }
        }
        if (p.hasOwnProperty("outPath") === true) {
            //path begins at circle
            for (var i=0; i<p.outPath.length; i++) {
                ppath = p.outPath[i];
                console.log('ppath = ' + ppath);
                if (p.ptype === 'control') {
                    ppath.path[1][1] = p.left; //c0.x
                    ppath.path[1][2] = p.top; //c0.y
                } else
                if (ppath.type === 'path') {
                    ppath.path[0][1] = p.left;  // p0.x
                    ppath.path[0][2] = p.top;   // p0.y
                } else if (ppath.type === 'line') {
                    ppath.set({ 'x1': p.left, 'y1': p.top });
                }
            }
        }
        console.log(p.name + ' moved!');
        canvas.renderAll();
        canvas.bringToFront(p);
    });

} //drawPattern()
