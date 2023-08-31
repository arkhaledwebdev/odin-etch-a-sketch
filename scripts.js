const gridContainer = document.querySelector('#gridContainer')
const buttonChange = document.querySelector('#buttonChange')
const buttonClear = document.querySelector('#buttonClear')
const buttonBW = document.querySelector('#buttonBW')
const buttonDarken = document.querySelector('#buttonDarken')
const buttonRGB = document.querySelector('#buttonRGB')
const buttonEraser = document.querySelector('#buttonEraser')
const colorSelect = document.querySelector('#colorSelect')
const colorSelectedBox = document.querySelector('#selectedColorBox')

let userGridSize = 0;
let isBWMode = true;
let isRGBMode = false;
let isColorMode = false;
let isDarkenMode = false;
let isEraserMode = false;
let selectedColor = 'black';
createAGrid(50);

buttonChange.addEventListener('click', () => {

    while (true) {
        userGridSize = prompt("Please enter a grid size:")

        if (userGridSize === null || userGridSize === '') {
            alert("input cancelled or empty, Please enter a number between 1 and 100.")
            continue;
        }

        const userNumber = parseInt(userGridSize);

        if(!isNaN(userNumber)&& userNumber >= 1 && userNumber <= 100){
            createAGrid(userNumber)
            break;
        }
        else{
            alert("Invalid number entered, Please enter a number between 1 and 100.")
        }
    }
    
})

buttonClear.addEventListener('click', () => {

    if (parseInt(userGridSize) !== 0) {
        createAGrid(parseInt(userGridSize))
    }
    else {
        createAGrid(50)
    }
})

buttonBW.addEventListener('click', () => {
    buttonBW.classList.add('selected');
    buttonRGB.classList.remove('selected');
    colorSelect.classList.remove('selected')
    buttonEraser.classList.remove('selected');
    isBWMode = true;
    isRGBMode = false;
    isColorMode = false;
    isDarkenMode = false;
    isEraserMode = false;
})
buttonRGB.addEventListener('click', () => {
    buttonRGB.classList.add('selected');
    buttonBW.classList.remove('selected');
    colorSelect.classList.remove('selected')
    buttonEraser.classList.remove('selected');
    isBWMode = false;
    isRGBMode = true;
    isColorMode = false;
    isDarkenMode = false;
    isEraserMode = false;
})

colorSelect.addEventListener('change',()=>{
    colorSelect.classList.add('selected')
    buttonEraser.classList.remove('selected');
    buttonBW.classList.remove('selected');
    buttonRGB.classList.remove('selected');
    isColorMode = true;
    isRGBMode = false;
    isBWMode = false;
    isDarkenMode = false;
    isEraserMode = false;
    selectedColor = colorSelect.value;
    colorSelectedBox.style.backgroundColor = selectedColor;
})

buttonDarken.addEventListener('click', () => {
    buttonDarken.classList.add('selected')
    buttonEraser.classList.remove('selected');
    buttonBW.classList.remove('selected');
    buttonRGB.classList.remove('selected');
    colorSelect.classList.remove('selected')
    isBWMode = false;
    isRGBMode = false;
    isDarkenMode = true;
    isColorMode = false;
    isEraserMode = true;
})

buttonEraser.addEventListener('click', () => {
    buttonEraser.classList.add('selected');
    buttonBW.classList.remove('selected');
    buttonRGB.classList.remove('selected');
    colorSelect.classList.remove('selected')
    isBWMode = false;
    isRGBMode = false;
    isDarkenMode = false;
    isColorMode = false;
    isEraserMode = true;
})

function createAGrid(gridSize) {

    removeAllNodes(gridContainer);

    const gridArea = gridSize * gridSize;
    const gridWidth = 960 / gridSize;
    const gridHeight = 640 / gridSize;
    let colorToDark = '#ffffff'

    for (let i = 1; i <= gridArea; i++) {

        let grid = document.createElement('div')
    
        grid.style.outline = '1px solid black';
        grid.style.outlineOffset = '-1px';
        grid.style.textAlign = 'center';
        grid.style.verticalAlign = 'center';
        grid.style.lineHeight = `${gridHeight}px`;
        grid.style.height = `${gridHeight}px`;
        grid.style.width = `${gridWidth}px`;
        grid.style.backgroundColor = 'white'; 

        grid.addEventListener('mouseover', () => {
            if (isRGBMode) {
                grid.style.backgroundColor = generateRandomColor();
                console.log(generateRandomColor())
            }
            else if (isColorMode){
                grid.style.backgroundColor = selectedColor; 
            }
            else if(isDarkenMode){
                colorToDark = darkenColor(colorToDark)
                grid.style.backgroundColor = colorToDark; 
            }
            else if(isEraserMode){
                grid.style.backgroundColor = 'white'; 
            }
            else {
                grid.style.backgroundColor = 'black';
            }
        })
        gridContainer.appendChild(grid);
    }

}

function removeAllNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function generateRandomColor(){
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for(let i = 0; i < 6 ; i++){
        color += letters[Math.floor(Math.random()*16)];
    }

    if(color === '#000000' || color === '#FFFFFF'){
        generateRandomColor();
    }
    else{
        return color;
    }
}

function darkenColor(color) {
    // Remove the '#' symbol and split the color into RGB components
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    
    // Calculate the darker RGB values by reducing each component by 10%
    const darkerR = Math.max(0, Math.round(r * 0.99));
    const darkerG = Math.max(0, Math.round(g * 0.99));
    const darkerB = Math.max(0, Math.round(b * 0.99));
    
    // Convert the darker RGB values back to hexadecimal and form the new color
    const newColor = `#${darkerR.toString(16).padStart(2, '0')}${darkerG.toString(16).padStart(2, '0')}${darkerB.toString(16).padStart(2, '0')}`;
    
    return newColor;
}

