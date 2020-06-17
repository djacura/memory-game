const cards = document.querySelectorAll('.memory-card');

// setting up variables

let hasFlippedCard = false;
let lockBoard = false; // using this so that you can't click multiple cards at once before they check for match.
let firstCard, secondCard;

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

    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];

} 

(function shuffleCards() {
    cards.forEach(card => {

        let randomPos = Math.floor(Math.random() * 12);

        card.style.order = randomPos;
    });
})();


cards.forEach(card => card.addEventListener('click', flipCard));