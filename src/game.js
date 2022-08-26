// Nodos
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

// Variables globales
let canvasSize;
let elementsSize;

// Para evitar problemas es mejor esperar a que el DOM se carge
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
	if (window.innerHeight > window.innerWidth) {
		canvasSize = window.innerWidth * 0.8;
	}
	else {
		canvasSize = window.innerHeight * 0.8;	
	}

	canvas.setAttribute('width', canvasSize);
	canvas.setAttribute('height', canvasSize);

	elementsSize = canvasSize / 10;

	console.log({canvasSize, elementsSize});

	startGame();
}

function startGame() {
	game.font = elementsSize + 'px Verdana';
	game.textAlign = 'end';

	const currentMap = maps[0]
	const mapRows = currentMap.trim().split('\n')
	const mapRowCol = mapRows.map(row => row.trim().split(''))

	mapRowCol.forEach((row, rowIndex) => {
		row.forEach((element, colIndex) => {
			const emoji = emojis[element];
			const posX = elementsSize * (colIndex + 1);
			const posY = elementsSize * (rowIndex + 1);
			game.fillText(emoji, posX, posY);
		})
	})
}

// Botones
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

// cuando llamas a una función por addevnetlistener siempre envia 
// el argumento de evento
function moveByKeys(event){
	if(event.key == 'ArrowUp') moveUp();
	else if (event.key == 'ArrowDown') moveDown();
	else if (event.key == 'ArrowRight') moveRight();
	else if (event.key == 'ArrowLeft') moveLeft();
}

function moveUp(){
	console.log('Hacia arriba')
}

function moveDown(){
	console.log('Hacia abajo')
}

function moveLeft(){
	console.log('Hacia izquierda')
}

function moveRight(){
	console.log('Hacia derecha')
}