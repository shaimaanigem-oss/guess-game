const CELLS_COUNT = 9;
const TURN_TIMEOUT = 30000;

let secretCell = -1;
let guesses = 0;
let isRunning = false;
let timeoutId = null;

const statusMessageEl = document.getElementById("status-message");
const guessesCounterEl = document.getElementById("guesses-counter");
const newGameBtn = document.getElementById("new-game-btn");
const cells = document.querySelectorAll(".cell");

const IMAGE_SRC = "https://picsum.photos/200/200?random=3";

function startGame() {
    clearTurnTimeout();
    resetBoard();

    secretCell = Math.floor(Math.random() * CELLS_COUNT);
    guesses = 0;
    isRunning = true;

    statusMessageEl.textContent = "לחץ על ריבוע כדי לנחש איפה התמונה.";
    guessesCounterEl.textContent = "מספר ניחושים: 0";

    resetTurnTimeout();
}

function resetBoard() {
    cells.forEach(cell => {
        cell.classList.remove("tried");
        cell.innerHTML = "";
    });
}

function clearTurnTimeout() {
    if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
}

function resetTurnTimeout() {
    clearTurnTimeout();
    timeoutId = setTimeout(() => {
        if (!isRunning) return;
        isRunning = false;
        alert("you loose - המחשב ניצח (עברו 30 שניות בלי מהלך)");
        startGame();
    }, TURN_TIMEOUT);
}

function onCellClick(event) {
    if (!isRunning) return;

    const cell = event.currentTarget;
    const index = Number(cell.getAttribute("data-index"));

    resetTurnTimeout();

    guesses++;
    guessesCounterEl.textContent = "מספר ניחושים: " + guesses;

    if (index === secretCell) {
        showImage(cell);
        isRunning = false;
        clearTurnTimeout();
        statusMessageEl.textContent = "כל הכבוד! ניצחת אחרי " + guesses + " ניחושים.";
    } else {
        cell.classList.add("tried");
        statusMessageEl.textContent = "לא נכון... נסה/י ריבוע אחר.";
    }
}

function showImage(cell) {
    const img = document.createElement("img");
    img.src = IMAGE_SRC;
    img.alt = "התמונה שמצאת";
    cell.appendChild(img);
}

cells.forEach(cell => {
    cell.addEventListener("click", onCellClick);
});

newGameBtn.addEventListener("click", startGame);

window.addEventListener("load", startGame);
