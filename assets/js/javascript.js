const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let firstCard, secondCard;

function flipCard() {
  $(this).toggleClass('flip');

  if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = this;
  } else {
      // second click
      hasFlippedCard = false;
      secondCard = this;

      // does card match?
      if (firstCard.dataset.card === secondCard.dataset.card) {
          // the cards match!
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
      } else {
          // the cards do not match!
          setTimeout(() => {
          $(firstCard).removeClass('flip');
          $(secondCard).removeClass('flip');
          }, 1200);
      }
  }
};

cards.forEach(card => card.addEventListener('click', flipCard));