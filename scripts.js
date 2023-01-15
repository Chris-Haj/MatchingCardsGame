let cards = document.querySelectorAll(".OneCard");
let SIZE = cards.length;
shuffle();

let firstCard, secondCard, matchCount = 0;
let lockBoard = false;
let moves = 1 , wins = 0;
cards.forEach(card => {
    card.addEventListener("click", flip);
});

function flip(event) {
    if (lockBoard) return;
    let clicked = event.target;
    console.log(clicked.tagName);
    document.getElementById('moves').innerHTML = 'Moves = ' + ++moves;

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
            wins++;
            document.getElementById('wins').innerHTML = 'Wins = ' + wins;
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
    cards.forEach((card, index) => {
        card.classList.remove("flipped");
        card.addEventListener("click", flip);
    });
    moves = 0;
    document.getElementById('moves').innerHTML = 'Moves = ' + moves;
    shuffle();
}


// Shuffle function
function shuffle() {
    let array = document.querySelectorAll(".Back img");
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i].src, array[j].src] = [array[j].src, array[i].src];
    }
}
