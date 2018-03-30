
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}


function relativeLuminanceClac(R,G,B){
//     # formula from W3C https://www.w3.org/TR/WCAG20-TECHS/G17.html
    
    
// # Relative luminance
// #
// # http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
// #https://en.wikipedia.org/wiki/Luminance_(relative)
// # https://en.wikipedia.org/wiki/Luminosity_function
// # https://en.wikipedia.org/wiki/Rec._709#Luma_coefficients
    R= R/255;
    G= G/255;
    B= B/255;
  
    if (R <= 0.03928){
        R = R /12.92;
        }
    else{ 
      R = ((R +0.055)/1.055)**gamma;
    }

    if (G <= 0.03928){
        G = G /12.92;
        }
    else{
        G = ((G +0.055)/1.055)**gamma;
        }

    if (B <= 0.03928){
        B = B /12.92;
        }
    else{
        B = ((B +0.055)/1.055)**gamma;
        }


    L = 0.2126 * R + 0.7152 * G + 0.0722 * B;
    
    return L;
}


function contrastRatioCalc(LI,LII){
     // formula from W3C https://www.w3.org/TR/WCAG20-TECHS/G17.html
    
    if (LI > LII){
        LB = LI;
        LD = LII;}
    else{
        
        LB = LII;
        LD = LI;
      }
           
    CR = (LB + 0.05) / (LD + 0.05);
    
    return CR;
}




function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

// formula from http://www.javascripter.net/faq/hextorgb.htm








var sl_dispLv = document.getElementById("dispLv");
var vl_dispLv = document.getElementById("vl_dispLv");
sl_dispLv.oninput = function() {

  dispLv = parseFloat(this.value);
  vl_dispLv.value = dispLv;
  dispcon = dispLv/dispOffLv ;
  sl_dispcon.value = dispcon;
  vl_dispcon.value = dispcon;


  plot();
}
vl_dispLv.oninput = function() { 
  dispLv = parseFloat(this.value); 
  sl_dispLv.value = dispLv;
  dispcon = dispLv/dispOffLv ;
  sl_dispcon.value = dispcon;
  vl_dispcon.value = dispcon;

  plot();
}
var vl_gamma = document.getElementById("vl_gamma");

vl_gamma.oninput = function() { 
  gamma = parseFloat(this.value); 

  plot();
}

var sl_dispOffLv = document.getElementById("dispOffLv");
var vl_dispOffLv = document.getElementById("vl_dispOffLv");
sl_dispOffLv.oninput = function() {

  dispOffLv = parseFloat(this.value);
  dispcon = dispLv/dispOffLv ;
  sl_dispcon.value = dispcon;
  vl_dispcon.value = dispcon;
  vl_dispOffLv.value = dispOffLv;
  plot();
}
vl_dispOffLv.oninput = function() { 
  dispOffLv = parseFloat(this.value); 
  sl_dispOffLv.value = dispOffLv;
  dispcon = dispLv/dispOffLv ;
  sl_dispcon.value = dispcon;
  vl_dispcon.value = dispcon;
  plot();
}


var sl_dispcon = document.getElementById("dispcon");
var vl_dispcon = document.getElementById("vl_dispcon");
sl_dispcon.oninput = function() {
  dispcon = parseFloat(this.value);
  dispOffLv = dispLv/dispcon;
  vl_dispcon.value = dispcon;
  sl_dispOffLv.value = dispOffLv;
  vl_dispOffLv.value = dispOffLv;
  plot();
}
vl_dispcon.oninput = function() { 
  dispcon = parseFloat(this.value); 
  sl_dispcon.value = dispcon;
  dispOffLv = dispLv/dispcon;
  sl_dispOffLv.value = dispOffLv;
  vl_dispOffLv.value = dispOffLv;
  plot();
}


var sl_Rl = document.getElementById("Rl");
var vl_Rl = document.getElementById("vl_Rl");
sl_Rl.oninput = function() {
  Rl = parseFloat(this.value);
  vl_Rl.value = Rl;
  plot();
}
vl_Rl.oninput = function() { 
  Rl = parseFloat(this.value); 
  sl_Rl.value = Rl;
  plot();
}

  
var sl_ambLux = document.getElementById("ambLux");
var vl_ambLux = document.getElementById("vl_ambLux");
sl_ambLux.oninput = function() {
  ambLux = parseFloat(this.value);
  vl_ambLux.value = ambLux;
  plot();
}
vl_ambLux.oninput = function() { 
  ambLux = parseFloat(this.value); 
  sl_ambLux.value = ambLux;
  plot();
}




var vl_foreg = document.getElementById("vl_foreg");


vl_foreg.oninput = function() { 

  R = hexToR(this.value);
  G = hexToG(this.value);
  B = hexToB(this.value);
  foregColor = [R,G,B];

  document.getElementById("calc_contrast_text").style.color = this.value;

  plot();

}

var vl_backg = document.getElementById("vl_backg");

vl_backg.oninput = function() { 

  R = hexToR(this.value);
  G = hexToG(this.value);
  B = hexToB(this.value);
  backgColor = [R,G,B];

  plot();
  document.getElementById("calc_contrast_box").style.background = this.value;

}

var ambLux =parseFloat(sl_ambLux.value);
var gamma=parseFloat(vl_gamma.value);
var dispLv= parseFloat(vl_dispLv.value);
var dispcon=parseFloat(vl_dispcon.value);
var Rl = parseFloat(vl_Rl.value);
var backgColor = [255,255,255];
var foregColor = [0,0,0];






var options_con = {
  
   tip: {
    xLine: true,    // dashed line parallel to y = 0
    yLine: true,    // dashed line parallel to x = 0
    renderer: function (x, y, index) {
      return (precisionRound(y,2).toString()+":1 @ " +precisionRound(x,0).toString() +"lux" ) } },
  

 
 
  target: '#contrast',
  width: 850,
  height: 250,
  disableZoom :true,
  xAxis: {
    label: 'Ambient Illuminat (Lux)',
    domain: [0,  ambLux],
    renderer: function (x,index) {
      return (x.toString() +":1") } },

  yAxis: {
    label: 'Ambient Contrast Ratio',
    domain: [0, 10] 
  },
  data: [
    
  ]

};

var options = {
  

  annotations :[{y:800, text:'800ms'}],
   tip: {
    xLine: true,    // dashed line parallel to y = 0
    yLine: true,    // dashed line parallel to x = 0
    renderer: function (x, y, index) {
      return (precisionRound(y,0).toString()+"ms @ " +precisionRound(x,0).toString() +"lux" ) } },
     
  target: '#multiple',
  width: 850,
  height: 500,
  disableZoom :true,
  xAxis: {
    label: 'Ambient Illuminat (Lux)',
    domain: [0,  ambLux]
  },
  yAxis: {
    label: 'Reference recognition time (ms)',
    domain: [0, 3000] 
  },
  data: [ 
    
  ]

};

function plot() {

  wdt=document.documentElement.clientWidth;
  if (wdt>1500) {
    wdt=wdt/1.6;
  }
  else {
    wdt=wdt;
  }


  foreg = relativeLuminanceClac(foregColor[0],foregColor[1],foregColor[2]);
  backg = relativeLuminanceClac(backgColor[0],backgColor[1],backgColor[2]);

 
  if (foreg < backg){
    [normHi,normLw]= [backg,foreg];
    document. getElementById("polarity_warning").style.color = 'white';
  }
  else{
      [normHi,normLw]= [foreg,backg];
      document. getElementById("polarity_warning").style.color = 'red';
  }

  
  document.getElementById("calc_contrast").innerHTML = precisionRound( contrastRatioCalc(normHi,normLw), 1);

  dispOffLv = dispLv/dispcon;

  hiLv=dispLv*normHi+dispOffLv*(1-normHi);
  lwLv=dispLv*normLw+dispOffLv*(1-normLw);

 options_con.width=wdt;
 options.width=wdt;

  options_con.data=[{fn:'(('+hiLv+' + x/3.1416 *'+Rl+')/( '+lwLv+' + x/3.1416*'+Rl+')/0.3682054)',color: 'black', nPoints:50}];
  

  options.xAxis= {domain: [0, ambLux]};
  options_con.xAxis= {domain: [0, ambLux]};
  
  options.data = [{  
  fn: '1032.753 + (6823.572 - 1032.753)/(1 + (('+hiLv+' + x/3.1416 *'+Rl+')/( '+lwLv+' + x/3.1416*'+Rl+')/1.125596)^27.3107)'
, graphType: 'polyline',range: [0, ambLux],
    closed: true , color: 'black', nPoints:50},
    { fn: '779.2451 + (7460499000 - 779.2451)/(1 + (('+hiLv+' + x/3.1416 *'+Rl+')/( '+lwLv+' + x/3.1416*'+Rl+')/0.4192372)^15.31096)'
, graphType: 'polyline',range: [0, ambLux],
    closed: false, color: 'red', nPoints:50 },
    { fn: '555.7534 + (4999687000 - 555.7534)/(1 + (('+hiLv+' + x/3.1416 *'+Rl+')/( '+lwLv+' + x/3.1416*'+Rl+')/0.3682054)^13.54447)'
, graphType: 'polyline',range: [0, ambLux],
    closed: true, color: 'black', nPoints:50 }];
    



   plot_a= functionPlot(options);
   plot_b= functionPlot(options_con);
   plot_a.addLink(plot_b);
   plot_b.addLink(plot_a);
  // old format
  var format = plot_b.meta.yAxis.tickFormat()
  var newFormat= function (d) {
  // new format = old format + ' i' for imaginary
  return format(d) + ':1'}
  plot_b.meta.yAxis.tickFormat(newFormat)
  plot_b.draw()
  

  
}


window.onresize = function() {
   plot();
};

plot()
