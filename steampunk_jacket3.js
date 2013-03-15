// steampunk_jacket2.js
// ------- main -------

function drawPattern(mydata, styles, md) {

    console.log("drawPattern");

    console.log(canvas);
    jacket_back = new fabric.Group();
    var A = jacket_back;


    //circles
    a1 = newPointXY('a1', BORDER, BORDER, 'patternpoint'); //nape
    a2 = newPointXY('a2', a1.left, a1.top + (15 * CM), 'patternpoint');
    a3 = newPointXY('a3', a1.left + 15 * CM, a1.top, 'patternpoint');
    a3.c0 = newPointXY('a3.c0', a2.left + 7 * CM, a2.top, 'controlpoint'); //control point
    a3.c1 = newPointXY('a3.c1', a3.left, a1.top + 7 * CM, 'controlpoint'); //control point


    //path_str = formatPath('M', a2, 'C', a3c1, a3c2, a3);
    //console.log('path_str = ' + path_str);
    //var new_path = new fabric.Path(path_str, {
    //       fill: 'green',
    //       stroke: 'green',
    //       strokeWidth: 4
    //   });
    //canvas.add(new_path);

    //lines & curves
    newLine(a1, a2, 'seamline');
    newLine(a1, a3, 'seamline');
    newCurve(a2, a3.c0, a3.c1, a3, 'seamline');

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

    //list point names & locations in console.log
    //displayPoints(a1, a3, a1_c1);

    //back jacket A gridline
    //var path_str = formatPath('M', a1, 'L', a1_c1, 'L', a3);
    //var Agridline = new fabric.Path(path_str, styles.gridline_style);
    //canvas.add(Agridline);
    //back jacket seamline
    //path_str = formatPath('M', a1, 'L', a2, 'L', a3, 'Q', a1_c1, a1);
    //var Aseamline = new fabric.Path(path_str, styles.seamline_style);
    //canvas.add(Aseamline);
    //back jacket cuttingline
    //var Acuttingline = new fabric.Path(path_str, styles.cuttingline_style);
    //canvas.add(Acuttingline);
    //draw jacket A
    //canvas.add(A);
    //arrange paths
    //Aseamline.sendToBack(); //seamline under points
    //Acuttingline.sendToBack(); //cuttingline under seamline
    //Agridline.sendToBack(); //gridline under cuttingline




} //drawPattern()
