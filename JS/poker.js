const pokerCards = document.querySelectorAll('.card')
const pokerCardContainer = document.querySelectorAll('.card-container')
const cardsToDiscard = document.querySelectorAll('input')
const dealBtn = document.querySelector('.deal-btn')
console.log(pokerCardContainer)

class Casino  {
    constructor(name){
        this.name = name
        this.playerCredit = 0
        this.card = ""
        this.deck = []
    }
    // Creates cards with suit. Suits are labeled (s =spade c=clubs h=heart d=dimond)
    // Cards have id of suit
    buildCards(suit){
        for(let i=2; i < 15; i++){
            // Builds cards 2-10 and sets their value
                const card = document.createElement('img');
                card.setAttribute('value',i);
                card.setAttribute('id',suit)
                card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
                this.deck.push(card)
        }
    }
      // Builds a full 52card deck and puts them in the deck array.
      buildDeck(suit){
        this.buildCards('s')
        this.buildCards('c')
        this.buildCards('h')
        this.buildCards('d')

    }
    // Shuffles the deck of cards 
    shuffleDeck(deck) {
        for(let i = this.deck.length -1; i > 0; i--){
            //Shuffling around each index to make sure random everytime.
            const j = Math.floor(Math.random() * i)
            const temp = this.deck[i]
            this.deck[i] = this.deck[j]
            this.deck[j] = temp
        }
    }

}

class Poker extends Casino {
    constructor(name){  
        super(name) ; {
            this.playerHand = []
            this.royalFlush = false
            this.straightFlush = false
            this.forOfAKind = false
            this.fullHouse = false
            this.flush = false
            this.straight = false
            this.twoPair = false
        }
    }
    deal(){
        for(let i=0; i< pokerCards.length; i++){
            pokerCards[i].remove()
            pokerCardContainer[i].appendChild(poker.deck[i])
            poker.playerHand.push(poker.deck[i])
            console.log(poker.playerHand[i])
            poker.deck.shift()
        }
    }
}

let poker = new Poker('name')
poker.buildDeck()
poker.shuffleDeck()
poker.deal()



console.log(poker.playerHand)
console.log(poker.deck)

console.log(cardsToDiscard[0])
console.log(dealBtn)

