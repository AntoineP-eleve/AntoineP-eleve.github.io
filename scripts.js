const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timerStart = false
let isGameComplete = false;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    ///ajouter
    //commence le timer
    if(!timerStart){
      startTimer();
      timerStart = true
    }
    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}


function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
  
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

////////////////////
/// modification ///
////////////////////

const timer = document.getElementById("timer");



//trouver sur internet (stack overflow)
let seconds = 0;
let minutes = 0;
let timerInterval;

// fonctionement du timer
function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }, 1000);
}

// pour arreter le timer
function stopTimer() {
  clearInterval(timerInterval);
}


//dialogue
const afficher = document.getElementById('dialog');


/**
 * ouvre le dialogue
 */
window.addEventListener('load', () => {
  afficher.showModal();
});

 
/**
 * ferme le dialogue
 */
function fermerDialogue() {
  document.getElementById("dialog").close();
}
/**
 * si appuyer ne reaffiche pas le dialogue
 */
function fermerPourToujours() {
  localStorage.setItem("FermerLeDialogue", "true");
  document.getElementById("dialog").close();
 
}
/**
 * vérifie si le dialogue doit etre ouvert
 */
window.onload = function() {
  if (localStorage.getItem("FermerLeDialogue") === "true") {
    document.getElementById("dialog").close();
   
  }
}