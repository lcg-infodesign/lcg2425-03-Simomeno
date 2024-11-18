
let data;
let dataObj;

function preload(){
  data = loadTable("assets/data.csv","csv","header");
  console.log(data);
}

let size= 100;
let padding= 200;
let textColor = "white";

function setup() {
  let totalHeight = (size+padding)*data.getRowCount()+(size+padding);
  createCanvas(windowWidth, totalHeight);
  background("black");
  noLoop();


  
  dataObj=data.getObject();

  let xPos =windowWidth/2;
  let yPos = windowHeight/2;

  for(let i=0; i<data.getRowCount();i++){
      let item = dataObj[i];
      drawGraphics(xPos,yPos, size, item);
      yPos = yPos + padding + size;
    }
  }
  
function draw() {
}



function drawGraphics(x,y,rowData,rowData){
  rectMode(CENTER);
  let rectHeight = map(rowData.min_temp, -20,30,30,110,size);
  let rectWidth =3;
  

  let rectHeight2 = map(rowData.max_temp,-20,30,30,110,size);
  
  let yRect= y;

  let minAvgTemp = -20; // Definisco il valore minimo di avg_temp
  let maxAvgTemp = 40;  // Definisco il valore massimo di avg_temp
  let lowColor = color("#0091FF"); 
  let highColor = color("#FF4D00");  

  // Calcolo il colore basato su avg_temp
  let tempFactor = map(rowData.avg_temp, minAvgTemp, maxAvgTemp, 0, 1); // Normalizza
  let dynamicColor = lerpColor(lowColor, highColor, tempFactor); // Interpola il colore
  
  fill("d7d7d7");
  rect(x,y,200,15,100);
  noStroke();
  circle(x-80,y,40);
  //fill("d7d7d7");
  //circle(x,y,10);
 
  fill(dynamicColor)
  circle(x-80,y,28);

  if (rowData.avg_temp>0){
    at= abs(rowData.avg_temp*2);
  }else{
    at= -abs(rowData.avg_temp*2);
  }

  push();
  fill(dynamicColor)
  rectMode(CORNER);
  rect(x-80,y-3,at+80,6,10);
  pop();

  
 
  for(let a=0;a<rowData.max_temp;a++){
    //let xRect2= x+(a*4); 
    let yRect= y;
  
    //let yRect2=yRect+200;
    noStroke();
    fillGradient("linear", {
      from: [x, yRect - rectHeight2 / 2], // Inizio del gradiente
      to: [x, yRect + rectHeight2 / 2],   // Fine del gradiente
      steps: ["yellow", "red"]                 // Colori gradiente
    });
    fill("red")
    rect(x+abs(rowData.max_temp*2),yRect,rectWidth,rectHeight2);
    


  }
  let xRect= x;

  if (rowData.min_temp>0){
    mt= (xRect+abs(rowData.min_temp*2));
  }
  else if(rowData.min_temp<0){
    mt=xRect-abs(rowData.min_temp*2);
  }
  else{
    mt=x;
  }



  for(let a=0;a<=abs(rowData.min_temp);a++){
    let xRect= x;
    noStroke();
    fillGradient("linear", {
      from: [xRect, yRect - rectHeight2 / 2], // Inizio del gradiente
      to: [xRect, yRect + rectHeight2 / 2],   // Fine del gradiente
      steps: ["blue", "cyan"]                 // Colori gradiente
    });

    
  rect(mt,yRect,rectWidth,rectHeight);
  }
 
  fill(textColor);
  textSize(15);
  textAlign(CENTER,CENTER);
  text(rowData.name, x,y-100);

  fill(textColor);
  textSize(30);
  text("River's min,max and average temperature",windowWidth/2,windowHeight*0.1 );

  fill(textColor);
  textSize(15);
  rectMode(CENTER,CENTER);
  text("0"+"°", x,y+25 );

}
