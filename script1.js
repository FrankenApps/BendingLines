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

  if(joist1.annotations){
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
  }

  
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