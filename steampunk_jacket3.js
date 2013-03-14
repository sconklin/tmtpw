// steampunk_jacket2.js
// ------- main -------

function drawPattern(mydata, styles, md) {

    console.log("drawPattern");

    console.log(canvas);

    //points
    var p0 = newPointXY('p0', BORDER, BORDER); //nape
    var p1 = newPointXY('p1', p0.x, p0.y + (15 * CM));
    var c1 = newPointXY('c1', p0.x + (15 * CM), p0.y); //temp point

    //lines & curves
    var line1 = new fabric.Line([p0.x, p0.y, p1.x, p1.y], {
        fill: 'green',
        strokewidth: 5,
        selectable: false
        });
    canvas.add(line1);

    //draw patternpoints with links to lines
    canvas.add(newPatternPoint(p0, in_lines=[null], out_lines=[line1]));
    canvas.add(newPatternPoint(p1, in_lines=[line1], out_lines=[null]));



    canvas.observe('object:modified', function(e) {
        var p = e.target;
        console.log(p);
        i = 0;
        for (item in p.inline) {
            p.inline[i] && p.inline[i].set({ 'x2': p.left, 'y2': p.top });  //line feeds into point
            i += 1;
        }
        i = 0;
        for (item in p.outline) {
            p.outline[i] && p.outline[i].set({ 'x1': p.left, 'y1': p.top });  //line feeds out of point
            i += 1;
        }
        console.log(p.name + ' moved!');
        canvas.renderAll();
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
