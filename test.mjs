// Importing data from game
import { Card, Deck, Player, Game } from './index.mjs';
// Chai testing
(async () => {
    const { expect } = await import('./node_modules/chai/chai.js');

// Tests
describe('Deck', function() {
    it('should shuffle the deck', function() {
        const deck = new Deck();
        const originalOrder = [...deck.cards];
        deck.shuffle();
        const shuffledOrder = deck.cards;

        expect(shuffledOrder).to.not.deep.equal(originalOrder);
    });
});

describe('Game', function() {
    it('should create players with 26 cards each', function() {
        const game = new Game();
        expect(game.player1.hand.length).to.equal(26);
        expect(game.player2.hand.length).to.equal(26);
    });
    it('should correctly determine the winner', function() {
        const game = new Game();
        game.player1.hand = [
            new Card('A', 'Spades'), new Card('K', 'Hearts'), new Card('Q', 'Diamonds')
        ];
        game.player2.hand = [
            new Card('2', 'Clubs'), new Card('3', 'Clubs'), new Card('4', 'Clubs')
        ];
        game.playGame();
        expect(game.player1.score).to.equal(3);
        expect(game.player2.score).to.equal(0);
    });
});
})();