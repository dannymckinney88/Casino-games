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
    firstDeal: true,
    playerHasAce: false,
    cpuHasAce: false,
    
    deck: [],
    // Creates cards with suit. Suits are labeled (s =spade c=clubs h=heart d=dimond)
    buildCards(suit){
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
    },
    
    // Builds a full 52card deck and puts them in the deck array.
    buildDeck(suit){
        this.buildCards('s')
        this.buildCards('c')
        this.buildCards('h')
        this.buildCards('d')

    },
    // Shuffles the deck of cards 
    shuffleDeck(deck) {
        for(let i = deck.length -1; i > 0; i--){
            //Shuffling around each index to make sure random everytime.
            const j = Math.floor(Math.random() * i)
            const temp = deck[i]
            deck[i] = deck[j]
            deck[j] = temp
        }
    },

    switchPlayer(){
        if(this.playerTurn){
            this.playerTurn = false
            this.cpuTurn = true
        }else{
            this.playerTurn = true
            this.cpuTurn = false
        }
    },
    // Deals the game out and runs some checks for blackjack 
    deal() {
        this.firstDeal = true
        playerContainer.innerHTML = ''
        cpuContainer.innerHTML = ''
        this.playerCards = []
        this.cpuCards = []
        // dealing cards out switching from player to cpu for visuals
        for(let i =0; i < 2; i++){
                // comme back and figure out how to slow down speed of cards comming out----
            this.switchPlayer()
            this.hit()
            this.switchPlayer()
            this.hit()
        }
        //Reseting values 
        this.cpuHasAce = false
        this.playerHasAce = false
        this.playerTurn = true
        this.checkForWin()  
        //Turns back on hit button after a bust
        hitButton.disabled = false
    },

    hit() {
        this.playerTotal = 0
        this.cpuTotal = 0
       game.firstDeal = false; 
       if(this.playerTurn){
        //Creates a card for the player and adds to to the playerCards array
        console.log('test')
        playerCard = this.deck[0]
        playerCard.setAttribute('class', 'cpu-card')
        playerContainer.appendChild(playerCard)
        this.playerCards.push(playerCard)
        this.deck.shift()
        game.checkForWin()
      }else if (this.cpuTurn){
        //Creates a card for the cpu and adds to to the cpuCards array
        cpuCard = this.deck[0]
        cpuCard.setAttribute('class', 'cpu-card')
        cpuContainer.appendChild(cpuCard)
        this.cpuCards.push(cpuCard)
        this.deck.shift()
       }
       console.log(this.cpuTotal)
    },

    stand(){
        console.log('hello')
        game.switchPlayer()
        game.checkForWin()
        
    },

    checkForWin(){
        //    Gets card total of all cards for the player and dealer
        console.log('players turn:' + this.playerTurn)
        console.log('cpu turn:' + this.cpuTurn)
        for(let i=0; i <this.playerCards.length; i++ ){
            this.playerTotal += parseInt(this.playerCards[i].getAttribute('value'))
            
        }
        for(let i=0; i <this.cpuCards.length; i++ ){
            this.cpuTotal += parseInt(this.cpuCards[i].getAttribute('value'))
            
        }
        //  Checks for aces for bothe players
        for(let i= 0; i < this.playerCards.length; i++){
            if(parseInt(this.playerCards[i].getAttribute('value')) ===11){
                this.playerHasAce = true
               
            }
        }
        for(let i= 0; i< this.cpuCards.length; i ++){
            if(parseInt(this.cpuCards[i].getAttribute('value')) ===11){
                this.cpuHasAce = true
            }
        }
        //Checks for black jack on inital deal
        
            
            if(this.playerTotal ===21 && this.cpuTotal ===21) {
                console.log('tie')
            }else if(this.playerTotal ==21){
                console.log('player jack')
            }else if(this.cpuTotal ==21){
                console.log('dealer blackjack')
            }
            //checks score if players turn
            else if(this.playerTurn){
                if(this.cpuHasAce){
                    if(this.cpuTotal >= 21){
                        this.cpuTotal -= 10
                        if(this.cpuTotal >= 21){
                            hitButton.disabled = true
                            console.log('bust')
                        }
                    }
                }
                //  Checks for Ace and makes sure it counts as 1 or 11
                else if(this.playerTotal > 21){
                    hitButton.disabled = true
                    console.log("player bust")
                    
                }
            } 
            
            // Check deals score and if they need to hit
            while(this.cpuTurn){
                if(this.cpuHasAce){
                    if(this.cpuTotal >= 21){
                        this.cpuTotal -= 10
                        if(this.cpuTotal >= 21){
                            console.log('bust')
                        }
                    }
                }if(this.cpuTotal < 17){
                    // Checking to see if dealer needs to hit
                    console.log('I need to hit')
                    this.hit()
                    console.log(this.cpuTotal)
                }
                if(this.cpuTotal > 21){
                    console.log('cpu bust')
                    this.cpuTurn = false
                }
                //If dealer has ace make sure to use it as either 1 or 11.
                
            }
            
        }
}
game.buildDeck()
game.shuffleDeck(game.deck)
game.checkForWin()


// event listenerss
dealButton.addEventListener('click', function(){
    game.deal()
    
})

hitButton.addEventListener('click', function(){
    game.hit()
})

standButton.addEventListener('click', function(){
    game.stand()
})

