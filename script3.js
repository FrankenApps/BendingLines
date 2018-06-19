function initialize3 (){
    if(parseFloat(document.getElementById('joist3SVG').clientHeight) < 220){
      svg3 = d3.select("#joist3SVG")
      .append("svg")
      .attr("width", document.getElementById('joist3SVG').clientWidth)
      .attr("height", '220')
      .call(d3.zoom().on("zoom", function () {
        svg3.attr("transform", d3.event.transform);
      }))
      .append("g")
      .attr("id", "svg3");
    } else{
      svg3 = d3.select("#joist3SVG")
      .append("svg")
      .attr("width", document.getElementById('joist3SVG').clientWidth)
      .attr("height", document.getElementById('joist3SVG').clientHeight)
      .call(d3.zoom().on("zoom", function () {
        svg3.attr("transform", d3.event.transform);
      }))
      .append("g")
      .attr("id", "svg3");
    }
  
    svg3.append("line")
        .attr("x1", 30)
        .attr("y1", -10000)
        .attr("x2", 30)
        .attr("y2", 10000)
        .attr("stroke-width", 2)
        .attr("stroke", "black");
  
    for(var i=-10000; i<10000; i+=5){
      svg3.append("line")
          .attr("x1", 30)
          .attr("y1", i)
          .attr("x2", 0)
          .attr("y2", i+30)
          .attr("stroke-width", 1)
          .attr("stroke", "black");
    }
  
    svg3.append("line")
        .attr("x1", 30)
        .attr("y1", 110)
        .attr("x2", 30+joist3.l)
        .attr("y2", 110)
        .attr("stroke-width", 0.5)
        .attr("stroke", "black")
        .attr("id", "placeholder1");
    
  }