
//variable initialisation
let sizeOptionClick = document.getElementById('buttonCanvasSize');
let canvasSize;
let pixelSize;
let canvas = document.getElementById('mainCanvas');
let colorOptionPicker = document.getElementById('colorPicker');
let currentColor = 'white';
let mouseDown = 0;

//add color palet (dinamically selected)
addColorSet();

//reset button
let resetButton = document.getElementById('resetCanvas');
resetButton.addEventListener('click', () => {
    var children = canvas.children;
        for(var i=0; i<children.length; i++){
            var child = children[i];
            child.style.color = "white";
        }
});

//all event handlers
sizeOptionClick.addEventListener('click', createCanvas);
colorOptionPicker.addEventListener('click', pickColor);
canvas.addEventListener('mouseover', fillPixel);

//color the canvas while mouse pressed fucntionality
canvas.addEventListener('mouseleave', () => {
    mouseDown = 0;
});
canvas.onmousedown = function () {
    mouseDown = 1;
}
canvas.onmouseup = function () {
    mouseDown = 0;
}

//when selecting new canvas size replace the existing pixels
function createCanvas(e){
    if(e.target.type == 'submit'){
        canvasSize = e.target.getAttribute('data-value');
        canvas.replaceChildren();
        adjustCanvasSize(canvasSize);
        pixelSize = canvas.clientHeight / canvasSize;
        createPixels(canvasSize, pixelSize);
    }
}

//add the correct number of pixels with the right classes on them
function createPixels(canvasSize, pixelSize){
    for(let i = 0; i < canvasSize; i++){
        for(let j = 0; j < canvasSize; j++){
            let newPixel = document.createElement('div');
            newPixel.classList.add('pixel');
            newPixel.style.height = `${pixelSize}px`;
            canvas.appendChild(newPixel);
        }
    }

}

//change the color of the brush to the new selected color
function pickColor(e) {
    if(e.target.classList.contains('color-option')){
        currentColor = e.target.getAttribute('data-color');
        console.log(currentColor);
    }
}

//while mouse down fill the pixel that the mouse is on
function fillPixel(e){
    if(mouseDown){
        let thisPixel = e.target;
        console.log(thisPixel);
        thisPixel.style.backgroundColor = currentColor;
    }
}

//check that the canvas size is divisible by the no of pixerls
function adjustCanvasSize(canvasSize){
    let wantedSize = canvas.clientHeight;
    while(wantedSize % canvasSize != 0){
        wantedSize -= 1;
        if(wantedSize < canvasSize)break;
    }
    canvas.style.height = `${wantedSize}px`;
    canvas.style.width = `${wantedSize}px`;
}

//create new color and add it to the option list
function createColorChoice(wantedColor){
    let newColor = document.createElement('div');
    newColor.classList.add('color-option');
    newColor.style.backgroundColor = `${wantedColor}`;
    newColor.dataset.color = `${wantedColor}`;
    colorOptionPicker.appendChild(newColor);
}

//color list create (at initial load)
function addColorSet() {
    createColorChoice('#f4f4f4');
    createColorChoice('black');
    createColorChoice('blue');
    createColorChoice('red');
    createColorChoice('yellow');
    createColorChoice('green');
    createColorChoice('orange');
    createColorChoice('purple');
    createColorChoice('brown');
    createColorChoice('teal');
    createColorChoice('aqua');
    createColorChoice('navy');
    createColorChoice('maroon');
    createColorChoice('olive');
}