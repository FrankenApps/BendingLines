var joist1, joist2, joist3;

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
    this.annotations = true;
    this.Update = function(){ update1(); }
  };

    joist1 = new Joist1();
    var gui = new dat.GUI({ autoPlace: false });
    var customContainer = document.getElementById('menu1');
    customContainer.appendChild(gui.domElement);
    var f1 = gui.addFolder('Material & Force');
    f1.add(joist1, 'F', -2000, 2000);
    f1.add(joist1, 'Iy', 0.0001, 10);
    f1.add(joist1, 'E', 0.0001, 500);
    var f2 = gui.addFolder('Geometric');
    f2.add(joist1, 'l', 0, 2000);
    f2.add(joist1 ,'a', 0, 2000);
    var f3 = gui.addFolder('Appearance');
    f3.add(joist1, 'resolution');
    f3.add(joist1, 'colored');
    f3.add(joist1, 'annotations')
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
      this.annotations = true;
      this.Update = function(){ update2(); }
    };
  
      joist2 = new Joist2();
      var gui = new dat.GUI({ autoPlace: false });
      var customContainer = document.getElementById('menu2');
      customContainer.appendChild(gui.domElement);
      var f1 = gui.addFolder('Material & Force');
      f1.add(joist2, 'F', -2000, 2000);
      f1.add(joist2, 'Iy', 0.000001, 10);
      f1.add(joist2, 'E', 0.00001, 500);
      var f2 = gui.addFolder('Geometric');
      f2.add(joist2, 'l', 0, 2000);
      f2.add(joist2 ,'a', 0, 2000);
      var f3 = gui.addFolder('Appearance');
      f3.add(joist2, 'resolution');
      f3.add(joist2, 'colored');
      f3.add(joist2, 'annotations')
      gui.add(joist2, 'Update');

    //create third dat.gui
    var Joist3 = function() {
      this.F = 500;   //N
      this.Iy = 1.2;     //MPa
      this.E = 120;         //MPa
      this.l = 400;       //px
      this.a = 200;      //px
      this.resolution = '0.1';
      this.colored = false;
      this.annotations = true;
      this.Update = function(){ update3(); }
    };
  
      joist3 = new Joist3();
      var gui = new dat.GUI({ autoPlace: false });
      var customContainer = document.getElementById('menu3');
      customContainer.appendChild(gui.domElement);
      var f1 = gui.addFolder('Material & Force');
      f1.add(joist3, 'F', -2000, 2000);
      f1.add(joist3, 'Iy', 0.000001, 10);
      f1.add(joist3, 'E', 0.00001, 500);
      var f2 = gui.addFolder('Geometric');
      f2.add(joist3, 'l', 0, 2000);
      f2.add(joist3 ,'a', 0, 2000);
      var f3 = gui.addFolder('Appearance');
      f3.add(joist3, 'resolution');
      f3.add(joist3, 'colored');
      f3.add(joist3, 'annotations')
      gui.add(joist3, 'Update');

    initialize1();
    initialize2();
    initialize3();
});
