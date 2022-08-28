// Nodos
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLifes = document.querySelector('#lifes');
const spanTime = document.querySelector('#time');

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
let lifes = 3;

let timeStart;
let timePlayer;
let timeInterval;


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

	if (!timeStart) {
		timeStart = Date.now();
		timeInterval = setInterval(show_time, 100);
	}

	const mapRows = currentMap.trim().split('\n')
	const mapRowCol = mapRows.map(row => row.trim().split(''))

	// Reset map
	enemyPositions = [];
	game.clearRect(0, 0, canvasSize, canvasSize);

	// Print game info
	show_lifes();

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
		levelFail()
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
	// Detenemos el intervalo que imprime el contador
	clearInterval(timeInterval);
}

function levelFail() {
	console.log("Chocaste con un enemigo")
	lifes--;
	if (lifes <= 0){
		level = 0;
		lifes = 3;
		timeStart = undefined;
	}
	playerPos.x = undefined;
	playerPos.y = undefined;
	startGame();
}

function show_lifes() {
	// Crear una array con la cantidad de elementos de un array
	// .fill() inserta algo en cada posición.
	const heartsArry = Array(lifes).fill(emojis['HEART']);

	// resetear el texto del nodo
	spanLifes.innerHTML = "";
	heartsArry.forEach(heart => spanLifes.append(heart));
}

function show_time() {
	spanTime.innerHTML = Date.now() - timeStart;
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
