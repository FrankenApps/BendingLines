var svg1, svg2, svg3;
var joist1;

$(document).ready(function() {
  /*reload MathJax = force new Typesetting
  MathJax.Hub.Queue(["Typeset",MathJax.Hub]);*/
  
  //create first dat.gui
  var Joist1 = function() {
    this.F = 500;   //N
    this.Iy = 1.2;     //MPa
    this.E = 120;         //MPa
    this.l = 400;       //px
    this.a = 400;      //px
    this.resolution = '0.1';
    this.colored = false;
    this.Update = function(){ update1(); }
  };

    joist1 = new Joist1();
    var gui = new dat.GUI({ autoPlace: false });
    var customContainer = document.getElementById('menu1');
    customContainer.appendChild(gui.domElement);
    var f1 = gui.addFolder('Material & Force');
    f1.add(joist1, 'F', -2000, 2000);
    f1.add(joist1, 'Iy', 0, 10);
    f1.add(joist1, 'E', 0, 500);
    var f2 = gui.addFolder('Geometric');
    f2.add(joist1, 'l', 0, 2000);
    f2.add(joist1 ,'a', 0, 2000);
    var f3 = gui.addFolder('Appearance');
    f3.add(joist1, 'resolution');
    f3.add(joist1, 'colored');
    gui.add(joist1, 'Update');

    initialize1();
});

function initialize1 (){
  if(parseFloat(document.getElementById('joint1SVG').clientHeight) < 220){
    svg1 = d3.select("#joint1SVG")
    .append("svg")
    .attr("width", document.getElementById('joint1SVG').clientWidth)
    .attr("height", '220')
    .call(d3.zoom().on("zoom", function () {
      svg1.attr("transform", d3.event.transform);
    }))
    .append("g")
    .attr("id", "svg1");
  } else{
    svg1 = d3.select("#joint1SVG")
    .append("svg")
    .attr("width", document.getElementById('joint1SVG').clientWidth)
    .attr("height", document.getElementById('joint1SVG').clientHeight)
    .call(d3.zoom().on("zoom", function () {
      svg1.attr("transform", d3.event.transform);
    }))
    .append("g")
    .attr("id", "svg1");
  }

  svg1.append("line")
      .attr("x1", 30)
      .attr("y1", -10000)
      .attr("x2", 30)
      .attr("y2", 10000)
      .attr("stroke-width", 2)
      .attr("stroke", "black");

  for(var i=-10000; i<10000; i+=5){
    svg1.append("line")
        .attr("x1", 30)
        .attr("y1", i)
        .attr("x2", 0)
        .attr("y2", i+30)
        .attr("stroke-width", 1)
        .attr("stroke", "black");
  }

  svg1.append("line")
      .attr("x1", 30)
      .attr("y1", 110)
      .attr("x2", 30+joist1.l)
      .attr("y2", 110)
      .attr("stroke-width", 0.5)
      .attr("stroke", "black")
      .attr("id", "placeholder1");
  
}

function update1 (){
  svg1.remove();
  $('#joint1SVG > svg').remove();
  initialize1();
  d3.select('#placeholder1').remove();
  d3.selectAll('circle').remove();
  for(var x=30; x<parseFloat(joist1.l)+30; x+=parseFloat(joist1.resolution)){
    var y = 0;
    if((x-30)<joist1.a){
      y=joist1.F/(6*joist1.E*joist1.Iy*10e5)*(3*joist1.a*Math.pow((x-30),2)-Math.pow((x-30),3));
    } else{
      y=joist1.F/(6*joist1.E*joist1.Iy*10e5)*(3*Math.pow(joist1.a,2)*(x-30)-Math.pow(joist1.a,3));
    }
    svg1.append("circle")
        .attr("cx", x)
        .attr("cy", y+110)
        .attr("r", 0.5);
  }
}
