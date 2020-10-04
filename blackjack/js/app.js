// Selectors 
    // card elements 
    const playerContainer = document.querySelector('.card-container-player')
    const cpuContainer =  document.querySelector('.card-container-cpu')
    //buttons
    const dealButton = document.querySelector('.deal')
    const hitButton = document.querySelector('.hit')
    const standButton = document.querySelector('.stand')
    //creating and setting up cards
//     let playerCard ;
//     let playerCards = [document.createElement('img'), document.createElement('img')]
//     let cpuCard ;
//     let cpuCards = [document.createElement('img'),document.createElement('img')]
//     for(let i =0; i < playerCards.length; i++){
//         playerCards[i].setAttribute('class','player-card')
//         playerCards[i].setAttribute('src','./assests/blackjack/cardback1.png' )
//         cpuCards[i].setAttribute('class','cpu-card')
//         cpuCards[i].setAttribute('src','./assests/blackjack/cardback1.png' )
//         console.log(playerCards[i],cpuCards[i])

//     }
// console.log(playerCards)

// playerContainer.appendChild(playerCard)




const tempDiv = document.createElement('div')
let tempCard = document.createElement('img')
let tempCards = []

// Game object 
let game = {
    // playerCard: undefined,
    // cpuCard: undefined,
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
            playerCard = game.deck[0]
            playerCard.setAttribute('class', 'cpu-card')
            playerContainer.appendChild(playerCard)
            console.log(playerCard)
            game.deck.shift()
            console.log(game.cpuTurn)
            }else if (game.cpuTurn){
                cpuCard = game.deck[0]
                console.log(cpuCard)
                cpuCard.setAttribute('class', 'cpu-card')
                cpuContainer.appendChild(cpuCard)
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
        if(i < 11){
            const card = document.createElement('img');
            card.setAttribute('value',`${i}`);
            card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
            game.deck.push(card)
            console.log()
        }
        else if(i > 10 && i < 14){ 
            // Checks for K,Q,J  and gives them a value of 10
            const card = document.createElement('img');
            card.setAttribute('value',`10`);
            card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
            game.deck.push(card)
        } else { 
            // Checks for aces and gives them a value of 11
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
// game.hit()
// for(let i=0; i < 52; i++){
//     console.log(game.deck[i])
// }
game.stand()
