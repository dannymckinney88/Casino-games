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
    // Gets card to the right player
    getCard(){
        if(this.playerTurn){
            //Creates a card for the player and adds to to the playerCards array
            console.log('test')
            playerCard = this.deck[0]
            playerCard.setAttribute('class', 'cpu-card')
            playerContainer.appendChild(playerCard)
            this.playerCards.push(playerCard)
            this.deck.shift()
        }else if (this.cpuTurn){
            //Creates a card for the cpu and adds to to the cpuCards array
            cpuCard = this.deck[0]
            cpuCard.setAttribute('class', 'cpu-card')
            cpuContainer.appendChild(cpuCard)
            this.cpuCards.push(cpuCard)
            this.deck.shift()
        }
    },

    switchPlayer(){
        if(this.playerTurn){
            game.playerTurn = false
            game.cpuTurn = true
        }else{
            this.playerTurn = true
            this.cpuTurn = false
        }
    },
    // Deals the game out and runs some checks for blackjack 
    deal() {
        dealButton.addEventListener('click', function(){
            game.firstDeal = true
            playerContainer.innerHTML = ''
            cpuContainer.innerHTML = ''
            game.playerCards = []
            game.cpuCards = []
            // dealing cards out switching from player to cpu for visuals
            for(let i =0; i < 2; i++){
                    // comme back and figure out how to slow down speed of cards comming out----
                game.cpuTurn = false;
                game.playerTurn = true;
                game.getCard()
                game.switchPlayer()
                game.getCard()
            }
            //Reseting values 
            game.cpuHasAce = false
            game.playerHasAce = false
            game.switchPlayer()
            game.checkForAceAndCardTotal()
            game.scoreCheck()
            // console.log(game.cpuHasAce, game.playerHasAce)
             
        })
    },
    
    hit() {
        hitButton.addEventListener('click', function(){
            game.firstDeal = false; 
            //Grabs current player a card
            game.getCard()
            //Checks for bust after hit
            // game.checkBust()
            game.checkForAceAndCardTotal()
            game.scoreCheck()
            
           
        })
    },

    stand(){
        standButton.addEventListener('click', function(){
            game.switchPlayer()
        })
    },
    
    checkForAceAndCardTotal(){
        // console.log('I hit checkforaces')
            // Loops through cards and gets total of both cpu and player
        for(let i=0; i <this.playerCards.length; i++ ){
            // console.log(parseInt(this.playerCards[i].getAttribute('value')))
            this.playerTotal += parseInt(this.playerCards[i].getAttribute('value'))
            // console.log(parseInt(this.playerCards[i].getAttribute('value')))
        }
        for(let i=0; i <this.cpuCards.length; i++ ){
            this.cpuTotal += parseInt(this.cpuCards[i].getAttribute('value'))
            // console.log(parseInt(this.cpuCards[i].getAttribute('value')))
        }

        for(let i= 0; i < this.playerCards.length; i++){
            if(parseInt(this.playerCards[i].getAttribute('value')) ===11){
                this.playerHasAce = true
                // console.log('player: ' +this.playerHasAce)
            }
        }
        for(let i= 0; i< this.cpuCards.length; i ++){
            if(parseInt(this.cpuCards[i].getAttribute('value')) ===11){
                this.cpuHasAce = true
                // console.log('dealer: ' + this.cpuHasAce)
            }
        }
    },

    scoreCheck(){
  
        // If it is first deal checks for black jack
    
        if(this.firstDeal){
            console.log(this.playerTotal,this.cpuTotal)
            if(this.playerTotal ===21 && this.cpuTotal ===21) {
                console.log('tie')
            }else if(this.playerTotal ==21){
                console.log('player wins')
            }else if(this.cpuTotal ==21){
                console.log('dealer wins')
            }
        }  //checks score if players turn
        else if(this.playerTurn){
            if(this.playerTotal > 21){
                this.switchPlayer()
                console.log("player bust")
              
            }
        } // Checks score if dealer turn
        else if(this.cpuTurn){
            if(this.cpuTotal < 17){
                // Checking to see if dealer needs to hit
                console.log('I need to hit')
                this.getCard()
            }
            else if(this.cpuTotal > 21){
                console.log('cpu bust')
                this.cpuTurn = false
            }
        }
        this.playerTotal = 0
        this.cpuTotal = 0
    }


    
}

game.buildDeck()
game.shuffleDeck(game.deck)
game.deal()
game.hit()
game.stand()
