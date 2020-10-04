// Selectors 
    // card elements 
const playerCard = document.querySelectorAll('.player-card')
const cpuCard = document.querySelectorAll('.cpu-card')
const playerContainer = document.querySelector('.card-container-player')
const cpuContainer =  document.querySelector('.card-container-cpu')
    //buttons
const dealButton = document.querySelector('.deal')
const hitButton = document.querySelector('.hit')
const standButton = document.querySelector('.stand')

const tempDiv = document.createElement('div')
let tempCard = document.createElement('img')
let tempCards = []

// Game object 
let game = {
    playerCards: [],
    cpuCards: [],
    
    deck: [],
    // Builds a full 52card deck and puts them in the deck array.
    buildDeck(suit){
        makeCards('s')
        makeCards('c')
        makeCards('h')
        makeCards('d')

    },

    shuffleDeck(deck) {
        for(let i = deck.length -1; i > 0; i--){
            //Shuffling around each index to make sure random everytime.
            const j = Math.floor(Math.random() * i)
            const temp = deck[i]
            deck[i] = deck[j]
            deck[j] = temp
            
        }

    },

    hit() {
        
    }
}
// Creates cards with suit. Suits are labeled (s =spade c=clubs h=heart d=dimond)
function makeCards(suit){
    for(let i=2; i < 15; i++){
        if(i < 11){
            const deckCard = document.createElement('img');
            deckCard.setAttribute('value',`${i}`);
            deckCard.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
            game.deck.push(deckCard)
            console.log()
        }
        else if(i > 10 && i < 14){ 
            // Checks for K,Q,J  and gives them a value of 10
            const deckCard = document.createElement('img');
            deckCard.setAttribute('value',`10`);
            deckCard.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
            game.deck.push(deckCard)
        } else { 
            // Checks for aces and gives them a value of 11
            const deckCard = document.createElement('img');
            deckCard.setAttribute('value',`11`);
            deckCard.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
            game.deck.push(deckCard)
        }
    
        
    }
}

// Shuffels deck 


game.buildDeck()
game.shuffleDeck(game.deck)
for(let i=0; i < 52; i++){
    console.log(game.deck[i])
}


