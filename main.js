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