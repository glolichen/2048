var size = 4;
var squareSize = 125;
var border = 10;
var squareBorder = 5;

var score = 0;

var aiStatus = false;
var isGameOver = false;

var board = new Array();

var thinkingTime = 150;

function init() {
	isGameOver = false;
	board = new Array();

	for (let i = 0; i < size; i++) {
		let temp = new Array();
		for (let j = 0; j < size; j++) 
			temp.push(new Tile(0, false));
		board.push(temp);
	}

	genTile();
	genTile();
}

function start() {
	size = 4;
	reset();
	window.onkeydown = function(event) {
		handleKeyPress(event)
		draw();
	}
}

function reset() {
	if (aiStatus) return;
	score = 0;
	init();
	displayInit();
	draw();
}

function handleKeyPress(event) {
	if (aiStatus || isGameOver) return;
	event.preventDefault()
	switch (event.code) {
		case "KeyW":
		case "KeyI":
		case "ArrowUp":
			shiftUp();
			break;
		case "KeyA":
		case "KeyJ":
		case "ArrowLeft":
			shiftLeft();
			break;
		case "KeyS":
		case "KeyK":
		case "ArrowDown":
			shiftDown();
			break;
		case "KeyD":
		case "KeyL":
		case "ArrowRight":
			shiftRight();
			break;
	}

	return false;
}

function gameOver() {
    for (let i = 0; i < size; i++) {
        let previous = -1;
        for (let j = 0; j < size; j++) {
            let current = board[i][j].exponent;
            if (current == 0) return false;
            if (current == previous) return false;
            previous = current;
        }
    }
    for (let i = 0; i < size; i++) {
        let previous = -1;
        for (let j = 0; j < size; j++) {
            let current = board[j][i].exponent;
            if (current == 0) return false;
            if (current == previous) return false;
            previous = current;
        }
    }

	isGameOver = true;
    return true;
}