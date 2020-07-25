const cards = document.querySelectorAll('.memory-card');

// setting up variables

let hasFlippedCard = false;
let lockBoard = false;   // using this so that you can't click multiple cards at once before check for match.
let firstCard, secondCard;
let timerVar = false;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    $(this).toggleClass('flip');

  if (!hasFlippedCard) {

      // first click

      hasFlippedCard = true;
      firstCard = this;

      return;
  }

    // second click

    secondCard = this;
    timerVar = true;

    checkForMatch();
  
};

// does the card match?

function checkForMatch() {

    if (firstCard.dataset.card === secondCard.dataset.card) {  

    // the cards match!

    disableCards();

    } else {

    // the cards do not match!
    
    unflipCards();
        
    }
};

function disableCards() {

    // removes the event listener so cannot click cards again after match.

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}
      
function unflipCards() {

    lockBoard = true;

    setTimeout(() => {

        // removes the class 'flip' from the cards if they dont match.

        $(firstCard).removeClass('flip');
        $(secondCard).removeClass('flip');

        resetBoard();

        }, 1200);
}  

function resetBoard() {

    // this function allows the board to reset once matched cards have been found.

    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

} 

(function shuffleCards() {

    // this function is for shuffling the cards at the start of the game.

    cards.forEach(card => {

        let randomPos = Math.floor(Math.random() * 12);

        card.style.order = randomPos;
    });
})();

function refreshPage(){  //function to reload webpage
    window.location.reload();
} 


cards.forEach(card => card.addEventListener('click', flipCard));


// Timer javascript

function startCountdown() {


        let counter = document.getElementById("display").innerHTML;

        const interval = setInterval(() => {

        counter--;

        display.text(counter);

        if ($(".memory-card.flip").length == $(".memory-card").length) {
        //All card elements have class flip then show win modal.
        $('.modal-win').modal('show')
        winAudio.play();
        clearInterval(interval);
        return;
    } 

        else if (counter <= 0) {
        clearInterval(interval);
        // if the timer reaches zero then show lose modal.
        $('.modal-lose').modal('show')
        loseAudio.play();

      };
    }, 1000);

};


$(".memory-card").click(function() {

    if(!timerVar) {
        //function to start the timer when the you click the first card.
        display = $('#display');
        startCountdown();

    };

});

// adding sounds.

var winAudio = new Audio('assets/sounds/win-fanfare.mp3');
var loseAudio = new Audio('assets/sounds/lose-the-game.mp3');

// this functio was so i can play sounds on IOS mobile.

function myPlay(){
    var audio = new Audio('assets/sounds/win-fanfare.mp3');
    audio.play();
    audio.pause();
}