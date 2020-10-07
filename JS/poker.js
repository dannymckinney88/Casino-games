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
            if(i < 11){
                this.card = document.createElement('img');
                this.card.setAttribute('value',i)
                this.card.setAttribute('id',suit)
                this.card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
                this.deck.push(this.card)
                // console.log(this.deck[i].value)
        
            }
            else if(i > 10 && i < 14){ 
                //Builds cards J, Q, K and set their value to 10
                const card = document.createElement('img');
                this.card.setAttribute('value',`10`);
                this.card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
                this.deck.push(this.card)
            } else { 
                // builds the Ace and sets its value to 11
                const card = document.createElement('img');
                this.card.setAttribute('value',`11`);
                this.card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
                this.deck.push(this.card)
            }
            console.log(this.deck[i])
            
            
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
        super(name,playerCredit) ; {
            playerHand = []
            royalFlush = false
            straightFlush = false
            forOfAKind = false
            fullHouse = false
            flush = false
            straight = false
            twoPair = false
            pair = false
        }
    }
    getDeck(){
        for(let i=0; i< this.deck.length; i++){

            console.log(this.deck[i].value)
        }
    }
}

const pokerDealer = new Casino('Poker Room')


pokerDealer.buildDeck()
pokerDealer.shuffleDeck()
pokerDealer.getDeck()
