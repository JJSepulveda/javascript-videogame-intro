// Nodos
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

// Objetos
const playerPos = {
	x: undefined,
	y: undefined
}
const giftPos = {
	x: undefined,
	y: undefined
}

// Variables globales
let canvasSize;
let elementsSize;
let enemyPositions = [];
let level = 0;


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

	const currentMap = maps[level]

	if (!currentMap) {
		gameOver();
		return;
	}

	const mapRows = currentMap.trim().split('\n')
	const mapRowCol = mapRows.map(row => row.trim().split(''))

	// Reset map
	enemyPositions = [];
	game.clearRect(0, 0, canvasSize, canvasSize);

	mapRowCol.forEach((row, rowIndex) => {
		row.forEach((element, colIndex) => {
			const emoji = emojis[element];
			const posX = elementsSize * (colIndex + 1);
			const posY = elementsSize * (rowIndex + 1);

			if (element == 'O') {
				if(!playerPos.x && !playerPos.y) {
					playerPos.x = posX;
					playerPos.y = posY;
					console.log({playerPos});
				}
			}
			else if (element == 'I') {
				giftPos.x = posX;
				giftPos	.y = posY;
			}
			else if(element == 'X') {
				enemyPositions.push({
					x: posX,
					y: posY
				})
			}

			game.fillText(emoji, posX, posY);
		})
	});

	movePlayer();
}

function movePlayer() {
	// Revisar si el jugador colisiona con el objetivo
	const giftCollisionX = playerPos.x.toFixed(1) == giftPos.x.toFixed(1);
	const giftCollisionY = playerPos.y.toFixed(1) == giftPos.y.toFixed(1);
	const giftCollision = giftCollisionX && giftCollisionY;

	if (giftCollision) {
		levelWin();
	}

	const enemyCollision = enemyPositions.find(enemy => {
		const enemyCollisionX = enemy.x.toFixed(1) == playerPos.x.toFixed(1);
		const enemyCollisionY = enemy.y.toFixed(1) == playerPos.y.toFixed(1);
		return enemyCollisionX && enemyCollisionY
	});

	if (enemyCollision) {
		console.log("Chocaste con un enemigo")
	}

	game.fillText(emojis['PLAYER'], playerPos.x, playerPos.y);
}

function levelWin() {
	console.log('Pasaste de nivel');
	level++;
	startGame();
}

function gameOver() {
	console.log("!Terminaste el juego")
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

function checkUpCollision() {
	return playerPos.y < elementsSize;
}

function checkDownCollision() {
	return (playerPos.y + elementsSize) > canvasSize;
}

function checkRightCollision() {
	return (playerPos.x + elementsSize) > canvasSize;
}

function checkLeftCollision() {
	return playerPos.x < elementsSize;
}

function moveUp(){
	//condición para evitar que se salga del mapa
	if (!checkUpCollision()){
		playerPos.y -= elementsSize;
		startGame();
	}
}

function moveDown(){
	if(!checkDownCollision()) {
		playerPos.y += elementsSize;
		startGame();
	}
}

function moveLeft(){
	if(!checkLeftCollision()) {
		playerPos.x -= elementsSize;
		startGame();
	}
}

function moveRight(){
	if(!checkRightCollision()) {
		playerPos.x += elementsSize;
		startGame();
	}
}
