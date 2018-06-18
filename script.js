var svg1, svg2, svg3;
var joist1, joist2;

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

    //create second dat.gui
    var Joist2 = function() {
      this.F = 500;   //N
      this.Iy = 1.2;     //MPa
      this.E = 120;         //MPa
      this.l = 400;       //px
      this.a = 200;      //px
      this.resolution = '0.1';
      this.colored = false;
      this.Update = function(){ update2(); }
    };
  
      joist2 = new Joist2();
      var gui = new dat.GUI({ autoPlace: false });
      var customContainer = document.getElementById('menu2');
      customContainer.appendChild(gui.domElement);
      var f1 = gui.addFolder('Material & Force');
      f1.add(joist2, 'F', -2000, 2000);
      f1.add(joist2, 'Iy', 0, 10);
      f1.add(joist2, 'E', 0, 500);
      var f2 = gui.addFolder('Geometric');
      f2.add(joist2, 'l', 0, 2000);
      f2.add(joist2 ,'a', 0, 2000);
      var f3 = gui.addFolder('Appearance');
      f3.add(joist2, 'resolution');
      f3.add(joist2, 'colored');
      gui.add(joist2, 'Update');

    initialize1();
    initialize2();
});

function initialize1 (){
  if(parseFloat(document.getElementById('joist1SVG').clientHeight) < 220){
    svg1 = d3.select("#joist1SVG")
    .append("svg")
    .attr("width", document.getElementById('joist1SVG').clientWidth)
    .attr("height", '220')
    .call(d3.zoom().on("zoom", function () {
      svg1.attr("transform", d3.event.transform);
    }))
    .append("g")
    .attr("id", "svg1");
  } else{
    svg1 = d3.select("#joist1SVG")
    .append("svg")
    .attr("width", document.getElementById('joist1SVG').clientWidth)
    .attr("height", document.getElementById('joist1SVG').clientHeight)
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
  $('#joist1SVG > svg').remove();
  initialize1();
  d3.select('#placeholder1').remove();
  d3.select('#svg1').selectAll('circle').remove();
  var yMax = 0, yF = 0;
  if((joist1.l)<joist1.a){
    yMax = joist1.F/(6*joist1.E*joist1.Iy*10e5)*(3*joist1.a*Math.pow((joist1.l),2)-Math.pow((joist1.l),3));
    yF = joist1.F/(6*joist1.E*joist1.Iy*10e5)*(3*joist1.a*Math.pow((joist1.a),2)-Math.pow((joist1.a),3));
  } else{
    yMax=joist1.F/(6*joist1.E*joist1.Iy*10e5)*(3*Math.pow(joist1.a,2)*(joist1.l)-Math.pow(joist1.a,3));
    yF=joist1.F/(6*joist1.E*joist1.Iy*10e5)*(3*Math.pow(joist1.a,2)*(joist1.a)-Math.pow(joist1.a,3));
  }
    //show additional data
  //Dimension: length
  var yL, yA, marginSign;
  if(joist1.F < 0){
    yL = 190;
    yA = 150;
    marginSign = -1;
  } else{
    yL = 30;
    yA = 70;
    marginSign = 1;
  }
  svg1.append("line")
      .attr("x1", 40)
      .attr("y1", yL)
      .attr("x2", 20+joist1.l)
      .attr("y2", yL)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");

  svg1.append('path')
      .attr('d', function(d) { 
        var x = 30+joist1.l-15, y = yL;
        return 'M ' + x +' '+ y + ' l 0 5 l 15 -5 l -15 -5 z';
      })
      .style('fill', 'grey');

  svg1.append('path')
      .attr('d', function(d) { 
        var x = 45, y = yL;
        return 'M ' + x +' '+ y + ' l 0 5 l -15 -5 l 15 -5 z';
      })
      .style('fill', 'grey');

  svg1.append('text')
      .attr("x", 30+joist1.l/2)
      .attr("y", yL-10)
      .text('l')
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr("fill", "grey");

  svg1.append("line")
      .attr("x1", 30+joist1.l)
      .attr("y1", yL-20*marginSign)
      .attr("x2", 30+joist1.l)
      .attr("y2", yMax+110)
      .attr("stroke-width", 0.25)
      .attr("stroke", "grey");

  //Dimension Force away from origin (a)
  svg1.append("line")
      .attr("x1", 40)
      .attr("y1", yA)
      .attr("x2", 20+joist1.a)
      .attr("y2", yA)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");

      svg1.append('path')
      .attr('d', function(d) { 
        var x = 30+joist1.a-15, y = yA;
        return 'M ' + x +' '+ y + ' l 0 5 l 15 -5 l -15 -5 z';
      })
      .style('fill', 'grey');

  svg1.append('path')
      .attr('d', function(d) { 
        var x = 45, y = yA;
        return 'M ' + x +' '+ y + ' l 0 5 l -15 -5 l 15 -5 z';
      })
      .style('fill', 'grey');

  svg1.append('text')
      .attr("x", 30+joist1.a/2)
      .attr("y", yA-10)
      .text('a')
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr("fill", "grey");

  svg1.append("line")
      .attr("x1", 30+joist1.a)
      .attr("y1", yA-20*marginSign)
      .attr("x2", 30+joist1.a)
      .attr("y2", yF+110)
      .attr("stroke-width", 0.25)
      .attr("stroke", "grey");

  //Force
  svg1.append("line")
      .attr("x1", 30+joist1.a)
      .attr("y1", yF-40+110)
      .attr("x2", 30+joist1.a)
      .attr("y2", yF+110-7) // instead of -7.5 to remove white line
      .attr("stroke-width", 4)
      .attr("stroke", "blue");

  svg1.append('path')
      .attr('d', function(d) { 
        var x = 30+joist1.a, y = yF+110;
        return 'M ' + x +' '+ y + ' l -7.5 -7.5 l 15 0 z';
      })
      .style('fill', 'blue');

  svg1.append('text')
      .attr("x", 40+joist1.a)
      .attr("y", (yF+110-7-(yF-40+110))/2+(yF-40+110)+7.5)
      .text('F')
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr("fill", "blue");


  
  for(var x=30; x<parseFloat(joist1.l)+30; x+=parseFloat(joist1.resolution)){
    var y = 0;
    if((x-30)<joist1.a && joist1.a <= joist1.l){
      y=joist1.F/(6*joist1.E*joist1.Iy*10e5)*(3*joist1.a*Math.pow((x-30),2)-Math.pow((x-30),3));
    } else if((x-30)>joist1.a && joist1.a <= joist1.l){
      y=joist1.F/(6*joist1.E*joist1.Iy*10e5)*(3*Math.pow(joist1.a,2)*(x-30)-Math.pow(joist1.a,3));
    } else {
      y = 0;
    }
    var color = '#000000';
    if(joist1.colored){
      color = 'rgb(' + String(y/yMax*255) + ', 0, 0)';
    }
    svg1.append("circle")
        .attr("cx", x)
        .attr("cy", y+110)
        .attr("r", 0.5)
        .style('fill', color);
  }
}

function initialize2 (){
  if(parseFloat(document.getElementById('joist2SVG').clientHeight) < 220){
    svg2 = d3.select("#joist2SVG")
    .append("svg")
    .attr("width", document.getElementById('joist2SVG').clientWidth)
    .attr("height", '220')
    .call(d3.zoom().on("zoom", function () {
      svg2.attr("transform", d3.event.transform);
    }))
    .append("g")
    .attr("id", "svg2");
  } else{
    svg2 = d3.select("#joist2SVG")
    .append("svg")
    .attr("width", document.getElementById('joist2SVG').clientWidth)
    .attr("height", document.getElementById('joist2SVG').clientHeight)
    .call(d3.zoom().on("zoom", function () {
      svg2.attr("transform", d3.event.transform);
    }))
    .append("g")
    .attr("id", "svg2");
  }

  svg2.append("line")
      .attr("x1", (parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2)
      .attr("y1", 110)
      .attr("x2", (parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2+joist2.l)
      .attr("y2", 110)
      .attr("stroke-width", 0.5)
      .attr("stroke", "black")
      .attr("class", "placeholder2");

  svg2.append('path')
      .attr('d', function(d) { 
        var x = (parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2, y = 110.815;
        return 'M ' + x +' '+ y + ' l 15 15 l -30 0 z';
      })
      .style('fill', 'none')
      .attr("stroke-width", 1.5)
      .attr("stroke", "black");

  svg2.append("line")
      .attr("x1", (parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2-22)
      .attr("y1", 126)
      .attr("x2", (parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2+20.3)
      .attr("y2", 126)
      .attr("stroke-width", 2)
      .attr("stroke", "black");

  for(var i=(parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2-30; i<=(parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2+10; i+=5){
    svg2.append("line")
        .attr("x1", i)
        .attr("y1", 136)
        .attr("x2", i+10)
        .attr("y2", 126)
        .attr("stroke-width", 0.7)
        .attr("stroke", "black");
  }
  
  for(var i=(parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2-30+joist2.l; i<=(parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2+10+joist2.l; i+=5){
    svg2.append("line")
        .attr("x1", i)
        .attr("y1", 136)
        .attr("x2", i+10)
        .attr("y2", 126)
        .attr("stroke-width", 0.7)
        .attr("stroke", "black");
  }

  svg2.append("line")
        .attr("x1", (parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2-22+joist2.l)
        .attr("y1", 126)
        .attr("x2", (parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2+20.3+joist2.l)
        .attr("y2", 126)
        .attr("stroke-width", 2)
        .attr("stroke", "black");

  svg2.append('path')
        .attr('d', function(d) { 
          var x = (parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2+joist2.l, y = 110.815;
          return 'M ' + x +' '+ y + ' l 10 10 l -20 0 z';
        })
        .style('fill', 'none')
        .attr("stroke-width", 1.5)
        .attr("stroke", "black");
}

function update2(){
  svg2.remove();
  $('#joist2SVG > svg').remove();
  initialize2();
  d3.select('.placeholder2').remove();
  d3.select('#svg2').selectAll('circle').remove();
  
  var m1 = (parseFloat(document.getElementById('joist2SVG').clientWidth)-joist2.l)/2; //margin left/right

  var yF = 0;
  if((joist2.l/2)<joist2.a){
    yF = joist2.F*(joist2.l-joist2.a)/(6*joist2.E*joist2.Iy*10e5*joist2.l)*(Math.pow(joist2.l,2)*joist2.a-Math.pow(joist2.l-joist2.a,2)*joist2.a-Math.pow(joist2.a,3));
  } else{
    yF=joist2.F*(joist2.l-joist2.a)/(6*joist2.E*joist2.Iy*10e5*joist2.l)*(joist2.l/(joist2.l-joist2.a)*Math.pow(joist2.a-joist2.a,3)+(Math.pow(joist2.l,2)-Math.pow(joist2.l-joist2.a,2))*joist2.a-Math.pow(joist2.a,3));
  }

  //show additional stuff
  //Dimension: length
  var yL, yA, marginSign;
  if(joist2.F < 0){
    yL = 190;
    yA = 150;
    marginSign = -1;
  } else{
    yL = 30;
    yA = 70;
    marginSign = 1;
  }
  svg2.append("line")
      .attr("x1", m1+10)
      .attr("y1", yL)
      .attr("x2", m1-10+joist2.l)
      .attr("y2", yL)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");

  svg2.append('path')
      .attr('d', function(d) { 
        var x = m1+joist2.l-15, y = yL;
        return 'M ' + x +' '+ y + ' l 0 5 l 15 -5 l -15 -5 z';
      })
      .style('fill', 'grey');

  svg2.append('path')
      .attr('d', function(d) { 
        var x = m1+15, y = yL;
        return 'M ' + x +' '+ y + ' l 0 5 l -15 -5 l 15 -5 z';
      })
      .style('fill', 'grey');

  svg2.append('text')
      .attr("x", m1+joist1.l/2)
      .attr("y", yL-10)
      .text('l')
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr("fill", "grey");

  svg2.append("line")
      .attr("x1", m1+joist2.l)
      .attr("y1", yL-20*marginSign)
      .attr("x2", m1+joist2.l)
      .attr("y2", 110)
      .attr("stroke-width", 0.25)
      .attr("stroke", "grey");

  svg2.append("line")
      .attr("x1", m1)
      .attr("y1", yL-20*marginSign)
      .attr("x2", m1)
      .attr("y2", 110)
      .attr("stroke-width", 0.25)
      .attr("stroke", "grey");

  //force away from origin (a)
  svg2.append("line")
      .attr("x1", m1+10)
      .attr("y1", yA)
      .attr("x2", m1-10+joist2.a)
      .attr("y2", yA)
      .attr("stroke-width", 1)
      .attr("stroke", "grey");

      svg2.append('path')
      .attr('d', function(d) { 
        var x = m1+joist2.a-15, y = yA;
        return 'M ' + x +' '+ y + ' l 0 5 l 15 -5 l -15 -5 z';
      })
      .style('fill', 'grey');

  svg2.append('path')
      .attr('d', function(d) { 
        var x = m1+15, y = yA;
        return 'M ' + x +' '+ y + ' l 0 5 l -15 -5 l 15 -5 z';
      })
      .style('fill', 'grey');

  svg2.append('text')
      .attr("x", m1+joist2.a/2)
      .attr("y", yA-10)
      .text('a')
      .attr("font-family", "sans-serif")
      .attr("font-size", "20px")
      .attr("fill", "grey");

  svg2.append("line")
      .attr("x1", m1+joist2.a)
      .attr("y1", yA-20*marginSign)
      .attr("x2", m1+joist2.a)
      .attr("y2", yF+110)
      .attr("stroke-width", 0.25)
      .attr("stroke", "grey");

    //Force
    svg2.append("line")
    .attr("x1", m1+joist2.a)
    .attr("y1", yF-40+110)
    .attr("x2", m1+joist2.a)
    .attr("y2", yF+110-7) // instead of -7.5 to remove white line
    .attr("stroke-width", 4)
    .attr("stroke", "blue");

svg2.append('path')
    .attr('d', function(d) { 
      var x = m1+joist2.a, y = yF+110;
      return 'M ' + x +' '+ y + ' l -7.5 -7.5 l 15 0 z';
    })
    .style('fill', 'blue');

svg2.append('text')
    .attr("x", m1+10+joist2.a)
    .attr("y", (yF+110-7-(yF-40+110))/2+(yF-40+110)+7.5)
    .text('F')
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "blue");

  var constant = joist2.F/(6*joist2.E*joist2.Iy*10e5*joist2.l);
  var a = 0, b = 0;
  a = joist2.a;
  b = joist2.l-a;
  var yMax = joist2.F*b/(9*Math.sqrt(3)*joist2.E*joist2.Iy*joist2.l*10e5)*Math.pow(Math.pow(joist2.l,2)-Math.pow(b,2),1.5);
  console.log('Durchbiegung ' + yMax + ' a = ' + a + ' b = ' +b);
  for(var x=m1; x<parseFloat(joist2.l)+m1; x+=parseFloat(joist2.resolution)){
    var y = 0;
    if((x-m1)<a){
      y=constant*b*(Math.pow(joist2.l,2)*(x-m1)-Math.pow(b,2)*(x-m1)-Math.pow((x-m1),3));
    } else if ((x-m1)>a){
      y=constant*b*(joist2.l/b*Math.pow((x-m1)-a,3)+(Math.pow(joist2.l,2)-Math.pow(b,2))*(x-m1)-Math.pow((x-m1),3));
    } else{
      y = 0;
    }
    var color = '#000000';
    if(joist2.colored){
      color = 'rgb(' + String(y/yMax*255) + ', 0, 0)';
    }
    svg2.append("circle")
        .attr("cx", x)
        .attr("cy", y+110)
        .attr("r", 0.5)
        .style('fill', color);
  }
}
