let cards = document.querySelectorAll(".OneCard");

let firstCard, secondCard, matchCount = 0;
let lockBoard = false;

cards.forEach(card => {
    card.addEventListener("click", flip);
});

function flip(event) {
    if (lockBoard) return;
    let clicked = event.target;
    if (clicked === firstCard) return;
    clicked.classList.add("flipped");
    if (!firstCard){
        firstCard = clicked;
        return;
    }
    secondCard = clicked;
    checkForMatch();
}

function checkForMatch() {
    let firstCardImg = firstCard.querySelector(".Back img");
    let secondCardImg = secondCard.querySelector(".Back img");
    if (firstCardImg.src === secondCardImg.src) {
        matchCount++;
        disableCards();
        if (matchCount === (cards.length / 2)) {
            alert("You Win!");
            resetGame();
        }
    } else {
        unFlipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip);
    resetBoard();
}

function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetBoard();
    }, 500);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function resetGame() {
    matchCount = 0;
    resetBoard();
    // Shuffle cards
    cards = shuffle(cards);
    cards.forEach((card, index) => {
        card.style.order = index;
        card.classList.remove("flipped");
        card.addEventListener("click", flip);
    });
}


// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

