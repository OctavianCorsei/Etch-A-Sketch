//alert('ye');

let sizeOptionClick = document.getElementById('buttonCanvasSize');
let canvasSize;
let pixelSize;
let canvas = document.getElementById('mainCanvas');
let colorOptionPicker = document.getElementById('colorPicker');
let currentColor = 'white';

let resetButton = document.getElementById('resetCanvas');
resetButton.addEventListener('click', () => {
    var children = canvas.children;
        for(var i=0; i<children.length; i++){
            var child = children[i];
            child.style.color = "white";
        }
});

addColorSet();

sizeOptionClick.addEventListener('click', createCanvas);

canvas.addEventListener('mouseover', fillPixel);

function createCanvas(e){
    if(e.target.type == 'submit'){
        canvasSize = e.target.getAttribute('data-value');
        canvas.replaceChildren();
        adjustCanvasSize(canvasSize);
        pixelSize = canvas.clientHeight / canvasSize;
        createPixels(canvasSize, pixelSize);
    }
}

//check if mousedown or not
let mouseDown = 0;

canvas.addEventListener('mouseleave', () => {
    mouseDown = 0;
});

canvas.onmousedown = function () {
    mouseDown = 1;
}
canvas.onmouseup = function () {
    mouseDown = 0;
}

function fillPixel(e){
    if(mouseDown){
        let thisPixel = e.target;
        console.log(thisPixel);
        thisPixel.style.backgroundColor = currentColor;
    }
}

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

function adjustCanvasSize(canvasSize){
    let wantedSize = canvas.clientHeight;
    while(wantedSize % canvasSize != 0){
        wantedSize -= 1;
        if(wantedSize < canvasSize)break;
    }
    console.log(wantedSize);
    canvas.style.height = `${wantedSize}px`;
    canvas.style.width = `${wantedSize}px`;
}

function createColorChoice(wantedColor){
    let newColor = document.createElement('div');
    newColor.classList.add('color-option');
    newColor.style.backgroundColor = `${wantedColor}`;
    newColor.dataset.color = `${wantedColor}`;
    colorOptionPicker.appendChild(newColor);
}

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

colorOptionPicker.addEventListener('click', pickColor);

function pickColor(e) {
    if(e.target.classList.contains('color-option')){
        currentColor = e.target.getAttribute('data-color');
        console.log(currentColor);
    }
}