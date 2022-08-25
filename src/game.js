// Nodos
const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

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
	console.log(mapRowCol)

	for (let row = 1; row <= 10; row++) {
		for (let col = 1; col <= 10; col++) {
			const element = mapRowCol[row-1][col-1]
			game.fillText(emojis[element], elementsSize * col, elementsSize * row);
		}
	}

}

