// Selectors 
    // card elements 
    const playerContainer = document.querySelector('.card-container-player')
    const cpuContainer =  document.querySelector('.card-container-cpu')
    //buttons
    const dealButton = document.querySelector('.deal')
    const hitButton = document.querySelector('.hit')
    const standButton = document.querySelector('.stand')

// Game object 
let game = {
    playerCards: [],
    cpuCards: [],
    playerTurn: true,
    cpuTurn: false,
    
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
        hitButton.addEventListener('click', function(){
            if(game.playerTurn){
                //Creates a card for the player and adds to to the playerCards array
            playerCard = game.deck[0]
            playerCard.setAttribute('class', 'cpu-card')
            playerContainer.appendChild(playerCard)
            game.playerCards.push(playerCard)
            console.log(game.playerCards)
            game.deck.shift()
            console.log(game.cpuTurn)
            }else if (game.cpuTurn){
                //Creates a card for the cpu and adds to to the cpuCards array
                cpuCard = game.deck[0]
                console.log(cpuCard)
                cpuCard.setAttribute('class', 'cpu-card')
                cpuContainer.appendChild(cpuCard)
                game.cpuCards.push(cpuCard)
                console.log(game.cpuCards)
                game.deck.shift()
            }
        })
    },

    stand(){
        standButton.addEventListener('click', function(){
            game.playerTurn = false
            game.cpuTurn = true
            console.log(`cpu: ${game.cpuTurn}`)
        })
    }
}
// Creates cards with suit. Suits are labeled (s =spade c=clubs h=heart d=dimond)
function makeCards(suit){
    for(let i=2; i < 15; i++){
        // Builds cards 2-10 and sets their value
        if(i < 11){
            const card = document.createElement('img');
            card.setAttribute('value',`${i}`);
            card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
            game.deck.push(card)
            console.log()
        }
        else if(i > 10 && i < 14){ 
            //Builds cards J, Q, K and set their value to 10
            const card = document.createElement('img');
            card.setAttribute('value',`10`);
            card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
            game.deck.push(card)
        } else { 
            // builds the Ace and sets its value to 11
            const card = document.createElement('img');
            card.setAttribute('value',`11`);
            card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
            game.deck.push(card)
        }
    
        
    }
}


game.buildDeck()
game.shuffleDeck(game.deck)
game.hit()
// for(let i=0; i < 52; i++){
//     console.log(game.deck[i])
// }
game.stand()
