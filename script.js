

// Get DOM items
const grid = document.querySelector(".canvas");
const slider = document.getElementById("slider");
const dims = document.getElementById("dimensions");
const dimInpt = document.getElementById("dimChange");

// tools
const pencil = document.getElementById("black-white");
const paint = document.getElementById("color-choose");
const rainbow = document.getElementById("color");
const eraser = document.getElementById("eraser");
const gridToggle = document.getElementById("grid-toggle");
const clearBtn = document.getElementById("clear");
const colorChoose = document.getElementById("color-chooser");
const colors = document.getElementsByName('paint-choose');

const drawTools = [pencil, paint, rainbow, eraser];


function randomColor() {
  return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}

function getColor() {
  for(let i=0; i<colors.length; i++){
    if(colors[i].checked){
      //colorChoose.style.display='none';
      return colors[i].value;
    }
  }
}

let paintChoice;
colors.forEach((color) => {
  color.addEventListener('click', () => {
  paintChoice = getColor()
  })
});
function paintColor() {
  colorChoose.style.display = 'block';

  console.log(paintChoice)

  return paintChoice;
}

function getSelected() {
  for(let i=0; i<drawTools.length; i++){
    if(drawTools[i].checked){
      return(drawTools[i].value)
    }
  }
}

function chooseColor() {
  let color;
  if(getSelected() == 'pencil') {
    color = 'black'
    console.log('pencil', color);

  }
  else if(getSelected() == 'paint') {
    color = paintColor();
    console.log('paint', color);

  }
  else if(getSelected() == 'random') {
    color = randomColor();
    console.log('random', color);
  }
  else if(getSelected() == 'eraser') {
    color = 'white';
    console.log('eraser', color);
  }
  return color;
}
  
  

function draw() {
  let pixels = document.querySelectorAll('.grid-item');
  pixels.forEach(item => {
    item.addEventListener('mouseover', () => {
      item.style.backgroundColor = chooseColor();
    });
  });
}

function clearCanvas() {
  let pixels = document.querySelectorAll('.grid-item');
  pixels.forEach((item) => item.style.backgroundColor = 'white');
}

let on = 1;
function toggleGrid() {
  let pixels = document.querySelectorAll('.grid-item');
  if(on===1){
    pixels.forEach((item) => item.style.border = 'none');
    on = 0;
    return on;
  } 
  else if(on===0){
    pixels.forEach((item) => item.style.border = '1px solid #ddd');
    on = 1;
    return on;
  }
}



// add functions to tools
for(let i=0; i<drawTools.length; i++){
  drawTools[i].addEventListener('click', () => {
  chooseColor
  colorChoose.style.display = 'none';
  });
}

clearBtn.addEventListener('click', clearCanvas);
gridToggle.addEventListener('click', toggleGrid);

// Initialize the canvas
function createCanvas(size) {
  grid.innerHTML = ""
  grid.style.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;
  grid.style.gridTemplateColumns = `repeat(${slider.value}, 1fr)`;
  
  for(let i=0; i<size*size; i++){
    const gridDiv = document.createElement('div');
    gridDiv.addEventListener('mouseover', draw);
    //gridDiv.style.backgroundColor = '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
    grid.appendChild(gridDiv).className = 'grid-item';
  }

}

// get grid size value from slider
let update = () => {
  dimInpt.value = slider.value;
  dims.value = `X ${slider.value}`;
  createCanvas(slider.value);
  slider.value = dimInpt.value;
  };
  
let inputManual = () => {
  slider.value = dimInpt.value;
  update()
  };
  
slider.addEventListener('input', update);
dimInpt.addEventListener('input', inputManual);
update();



window.onload = () => {
  createCanvas(slider.value);
}
