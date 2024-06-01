// Creating Card Class
class Card {
    constructor(rank, suit) {
        this.rank =  rank;
        this.suit = suit;
        this.value = this.getValue(rank);
    }
    getValue(rank) {
        const rankValues = {
            '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
        };
        return rankValues[rank];
    }
    toString() {
        return `${this.rank} of ${this.suit}`;
    }
}
// Creating Deck Class
class Deck {
    constructor() {
        this.cards = [];
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

        for (let suit of suits) {
            for (let rank of ranks) {
                this.cards.push(new Card(rank, suit));
            }
        }
    }
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }
    splitDeck() {
        this.shuffle();
        const midIndex = this.cards.length / 2;
        return [this.cards.slice(0, midIndex), this.cards.slice(midIndex)];
    }
}
// Creating Player Class
class Player {
    constructor(name) {
        this.name = name;
        this.hand = [];
        this.score = 0;
    }
    playCard() {
        return this.hand.pop();
    }
    incrementScore() {
        this.score += 1;
    }
}
// Creating Game Class
class Game {
    constructor() {
        this.player1 = new Player('Player 1');
        this.player2 = new Player('Player 2');
        this.deck = new Deck();

        const [hand1, hand2] = this.deck.splitDeck();
        this.player1.hand = hand1;
        this.player2.hand = hand2;
    }
    playGame() {
        while (this.player1.hand.length > 0 && this.player2.hand.length > 0) {
            const card1 = this.player1.playCard();
            const card2 = this.player2.playCard();
            
            console.log(`${this.player1.name} plays ${card1.toString()}`);
            console.log(`${this.player2.name} plays ${card2.toString()}`);

            if (card1.value > card2.value) {
                this.player1.incrementScore();
                console.log(`${this.player1.name} wins this round!`);
            } else if (card2.value > card1.value) {
                this.player2.incrementScore();
                console.log(`${this.player2.name} wins this round!`)
            } else {
                console.log("It's a tie!");
            }
        }
        this.determineWinner();
    } 
    determineWinner() {
        console.log(`Player 1 Score: ${this.player1.score}`);
        console.log(`Player 2 Score: ${this.player2.score}`);

        if (this.player1.score > this.player2.score) {
            console.log(`Player 1 Wins!`);
        } else if (this.player2.score > this.player1.score) {
            console.log(`Player 2 Wins!`);
        } else {
            console.log("It's a tie!");
        }
    }
}
// Running the game
const game = new Game();
game.playGame();

export { Card, Deck, Player, Game};