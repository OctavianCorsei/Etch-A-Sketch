
//variable initialisation
let sizeOptionClick = document.getElementById('buttonCanvasSize');
let canvasSize;
let pixelSize;
let canvas = document.getElementById('mainCanvas');
let colorOptionPicker = document.getElementById('colorPicker');
let colorPreviewWindow = document.getElementById('colorPreview');
let hexaPreviewWindow = document.getElementById('hexaPreview');
let colorPickerButton = document.getElementById('customColor');
let currentColor = 'white';
let mouseDown = 0;

//initialize dataset and tools
initializeColorSet();
initializePreviewBar();
initializeCanvas(16);

//all event handlers
sizeOptionClick.addEventListener('click', createCanvas);
colorOptionPicker.addEventListener('click', pickColor);
canvas.addEventListener('mouseover', fillPixel);
colorPickerButton.addEventListener('change', newColorPicked);

//reset button
let resetButton = document.getElementById('resetCanvas');
resetButton.addEventListener('click', () => {
    let children = canvas.children;
    for(let i=0; i<children.length; i++){
        let child = children[i];
        child.style.backgroundColor = "#f4f4f4";
    }
    updateBrushColor(currentColor);
});



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
        initializeCanvas(canvasSize);
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
        let selectedColor = e.target.getAttribute('data-color');
        updateBrushColor(selectedColor);
    }
}

//modifiy preview color window and text 
function changePreviewColor(currentColor){
    colorPreviewWindow.style.backgroundColor = `${currentColor}`;
    hexaPreviewWindow.replaceChildren();
    hexaPreviewWindow.appendChild(document.createTextNode(`${currentColor}`));
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

function newColorPicked(e) {
    //
    updateBrushColor(e.target.value);
    console.log(e.target.value);
}

//create new color and add it to the option list
function createColorChoice(wantedColor){
    let newColor = document.createElement('div');
    newColor.classList.add('color-option');
    newColor.style.backgroundColor = `${wantedColor}`;
    newColor.dataset.color = `${wantedColor}`;
    colorOptionPicker.appendChild(newColor);
}

//change brush color and preview color
function updateBrushColor(selectedColor){
    currentColor = selectedColor;
    changePreviewColor(selectedColor);
}

//color list create (at initial load)
function initializeColorSet() {
    createColorChoice('#f4f4f4');
    createColorChoice('#000000');
    createColorChoice('#6495ed');
    createColorChoice('ff0000');
    createColorChoice('#ffff00');
    createColorChoice('#00fa9a');
    createColorChoice('#ff7f50');
    createColorChoice('#9370db');
    createColorChoice('#b22222');
    createColorChoice('008b8b');
    createColorChoice('#e0ffff');
    createColorChoice('#4682b4');
    createColorChoice('#a0522d');
    createColorChoice('#6b8e23');
}

//initialize color preview bar
function initializePreviewBar(){
    changePreviewColor('#FFFFFF');
}

//initialize canvas 128x128
function initializeCanvas(size){
    canvas.replaceChildren();
    adjustCanvasSize(size);
    pixelSize = canvas.clientHeight / size;
    createPixels(size, pixelSize);
}