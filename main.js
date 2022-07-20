const scoreValueElem = document.querySelector('#scoreValue');
const correctElem = document.querySelector('#correct');
const wrongElem = document.querySelector('#wrong');
const questionElem = document.querySelector('#question');
const box1Elem = document.querySelector('#box1');
const box2Elem = document.querySelector('#box2');
const box3Elem = document.querySelector('#box3');
const box4Elem = document.querySelector('#box4');
const startStopBtn = document.querySelector('#startstop');
const timeremainingElem = document.querySelector('#timeremaining');
const timeremainingValueElem = document.querySelector('#timeremainingValue');
const gameoverElem = document.querySelector('#gameover');

let score = 0;
let isPlaying = false;
let playTime;
let timeRemainingInterval;
let correctAnsElemNumber;

initialize();

function initialize() {
    startStopBtn.addEventListener('click', handleStartStop);
}


// EVENT HANDLERS
function handleStartStop(evt) {
    if (isPlaying) {
        window.location.reload();
    } else {
        startGame();
    }
}

// GAME LOGIC FUNCTIONS
function checkAnswer(evt) {
    const clickedElementNumber = parseInt(evt.target.dataset.position);
    if (clickedElementNumber === correctAnsElemNumber) {
        score++;
        setText(scoreValueElem, score);
        show(correctElem);
        hide(wrongElem);
        generateQA();
        setTimeout(function() {
            hide(correctElem);
        }, 500);
    } else {
        show(wrongElem);
        hide(correctElem);
        setTimeout(function() {
            hide(wrongElem);
        }, 500);
    }
}

function generateQA() {
    let num1 = getRandom(9);
    let num2 = getRandom(9);
    let correctAns = num1 * num2;
    setText(questionElem, `${num1} x ${num2}`);

    correctAnsElemNumber = getRandom(9);
    let correctAnsElem = getAnswerElement(correctAnsElemNumber);

    setText(correctAnsElem, correctAns);
    let answers = [correctAns];

    for (let i = 1; i <= 4; i++) {
        if (i !== correctAnsElemNumber) {
            let wrongAns;
            do {
                const worngNum1 = getRandom(9);
                const worngNum2 = getRandom(9);
                wrongAns = worngNum1 * worngNum2;
            } while (answers.indexOf(wrongAns) !== -1);

            // wrongAns will have the value which i can use
            answers.push(wrongAns);
            setText(getAnswerElement(i), wrongAns);
        }
    }
}

function startGame() {
    isPlaying = true;
    playTime = 5;
    hide(gameoverElem);
    setText(startStopBtn, "Stop Game");
    show(timeremainingElem);
    setText(scoreValueElem, score);
    setText(timeremainingValueElem, playTime);
    initializeTimer();
    addOptionsListners();
    generateQA();
}

function stopGame() {
    setText(gameoverElem, `<p>Game Over</p><p>Your Score ${score}</p>`);
    hide(timeremainingElem);
    show(gameoverElem);
    isPlaying = false;
    score = 0;
    setText(scoreValueElem, "");
    setText(startStopBtn, 'Start Game');
    clearInterval(timeRemainingInterval);
    removeOptionListerns();
}

function initializeTimer() {
    timeRemainingInterval = setInterval(function() {
        playTime--;
        setText(timeremainingValueElem, playTime);
        if (playTime <= 0) {
            stopGame();
        }
    }, 1000);
}