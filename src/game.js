// Nodos
const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')

// Para evitar problemas es mejor esperar a que el DOM se carge
window.addEventListener('load', startGame);

function startGame() {
	// Crear un rectangulo relleno
	// game.fillRect(x, y, width, height);
	// game.fillRect(0, 0, 100, 100);
	// game.clearRect(0, 0, 50, 50);

	// Función para escribir texto
	game.font = '25px Verdana';
	game.fillStyle = 'purple';
	game.textAlign = 'start';
	game.filltext(texto, x, y)
	game.fillText('Platzi', 25, 25);
}

