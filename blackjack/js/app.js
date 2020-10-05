// Selectors 
    // card elements 
const playerContainer = document.querySelector('.card-container-player')
const cpuContainer =  document.querySelector('.card-container-cpu')
    //buttons
const dealButton = document.querySelector('.deal-btn')
const hitButton = document.querySelector('.hit')
const standButton = document.querySelector('.stand')
// Game object 
let game = {
    playerCards: [],
    cpuCards: [],
    playerTurn: true,
    cpuTurn: false,
    playerTotal: 0,
    cpuTotal: 0,
    firstDeal: false,
    playerHasAce: false,
    cpuHasAce: false,
    
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

    deal() {
        dealButton.addEventListener('click', function(){
            game.firstDeal = true
            playerContainer.innerHTML = ''
            cpuContainer.innerHTML = ''
            game.playerCards = []
            game.cpuCards = []
            for(let i =0; i < 2; i++){
                // comme back and figure out how to slow down speed of cards comming out----
            game.cpuTurn = false;
            game.playerTurn = true;
            getCard()
            switchPlayer()
            getCard()
            game.cpuTurn = false;
            game.playerTurn = true;
            }
            game.checkForAce()
            scoreCheck()
             
        })
    },
    hit() {
        hitButton.addEventListener('click', function(){
            game.firstDeal = false; 
            //Grabs current player a card
            getCard()
            //Checks for bust after hit
            // game.checkBust()
            scoreCheck()
            
           
        })
    },

    stand(){
        standButton.addEventListener('click', function(){
            switchPlayer()
            // game.checkBust()
            
        })
    },
    checkForAceAndScore(){
            // Loops through cards and gets total of but cpu and player
        const playerParsedNum = parseInt(game.playerCards[i].getAttribute('value'))
        const cpuParsedNum = parseInt(game.cpuCards[i].getAttribute('value'))
        for(let i=0; i <game.playerCards.length; i++ ){
            // console.log(parseInt(this.playerCards[i].getAttribute('value')))
            game.playerTotal += playerParsedNum
            console.log(playerParsedNum)
        }
        for(let i=0; i <game.cpuCards.length; i++ ){
            game.cpuTotal += cpuParsedNum
            console.log(cpuParsedNum)
        }

        for(let i= 0; i < this.playerCards.length; i++){
            if(this.playerCards[i] ===11){
                this.playerHasAce = true
                console.log(this.playerHasAce)
            }
        }
        for(let i= 0; i< this.cpuCards.length; i ++){
            if(this.cpuCards[i]===11){
                this.cpuHasAce === true
                console.log(this.cpuHasAce)
            }
        }
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

function switchPlayer(){
    game.playerTurn = false
    game.cpuTurn = true
}

//Set up and indivdual card to display on screen

function getCard(){
    if(game.playerTurn){
        //Creates a card for the player and adds to to the playerCards array
    playerCard = game.deck[0]
    playerCard.setAttribute('class', 'cpu-card')
    playerContainer.appendChild(playerCard)
    game.playerCards.push(playerCard)
    game.deck.shift()
    }else if (game.cpuTurn){
        //Creates a card for the cpu and adds to to the cpuCards array
        cpuCard = game.deck[0]
        cpuCard.setAttribute('class', 'cpu-card')
        cpuContainer.appendChild(cpuCard)
        game.cpuCards.push(cpuCard)
        game.deck.shift()
    }
}

// Checks total of cards 

function scoreCheck(){
  
    // If it is first deal checks for black jack
    if(game.firstDeal){
        console.log(game.playerTotal,game.cpuTotal)
        if(game.playerTotal ===21 && game.cpuTotal ===21) {
            console.log('tie')
        }else if(game.playerTotal ==21){
            console.log('player wins')
        }else if(game.cpuTotal ==21){
            console.log('dealer wins')
        }
    }  //checks score if players turn
    else if(game.playerTurn){
        if(game.playerTotal > 21){
            switchPlayer()
            console.log("player bust")
          
        }
    } // Checks score if dealer turn
    else if(game.cpuTurn){
        if(game.cpuTotal < 17){
            // Checking to see if dealer needs to hit
            console.log('I need to hit')
            getCard()
        }
        else if(game.cpuTotal > 21){
            console.log('cpu bust')
            game.cpuTurn = false
        }
    }
    game.playerTotal = 0
    game.cpuTotal = 0
}


game.buildDeck()
game.shuffleDeck(game.deck)
game.deal()
game.hit()
game.stand()
