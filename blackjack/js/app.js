// Selectors 
    // card elements 
const playerContainer = document.querySelector('.card-container-player')
const cpuContainer =  document.querySelector('.card-container-cpu')
    //buttons
const dealButton = document.querySelector('.deal-btn')
const hitButton = document.querySelector('.hit')
const standButton = document.querySelector('.stand')
    //Money
const playerMoney = document.querySelector('.player-money')

//player Object
let player = {
    name: 'danny',
    money: 100
}
// Game object
let game = {
    playerCards: [],
    cpuCards: [],
    playerTurn: false,
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
            playerCard = this.deck[0]
            playerCard.setAttribute('class', 'cpu-card')
            playerContainer.appendChild(playerCard)
            this.playerCards.push(playerCard)
            this.deck.shift()
            this.playerTurn = false
            this.cpuTurn = true
            cpuCard = this.deck[0]
            cpuCard.setAttribute('class', 'cpu-card')
            cpuContainer.appendChild(cpuCard)
            this.cpuCards.push(cpuCard)
            this.deck.shift()
        }
        //Reseting values 
        this.cpuHasAce = false
        this.playerHasAce = false
        this.playerTurn = true
        this.cpuTurn = false
        //Turns back on hit button after a bust
        hitButton.disabled = false
        this.checkForAceAndtotal()
        this.HasAce()
        this.checkBlackJack()
        console.log(this.playerTotal)
        console.log(this.cpuTotal)
        this.bet()
    },

    bet() {
        player.money -= 5
        console.log('test'+ player.money)
        playerMoney.innerHTML = player.money
    },

    checkBlackJack(){
        if(this.playerTotal==21 && this.cpuTotal==21){
            alert('tie')
            hitButton.disabled = true
        }
        else if(this.playerTotal == 21){
            alert('player win')
            hitButton.disabled = true
        }
        else if(this.cpuTotal == 21){
            alert('computer wins')
            hitButton.disabled = true
        }
    },

    hit() {

       game.firstDeal = false; 
       if(this.playerTurn){
        //Creates a card for the player and adds to to the playerCards array
        playerCard = this.deck[0]
        playerCard.setAttribute('class', 'player-card')
        playerContainer.appendChild(playerCard)
        this.playerCards.push(playerCard)
        this.deck.shift()
        this.checkForAceAndtotal()
        this.HasAce()
        this.checkPlayerHand()
        this.checkForWin()
      }else if (this.cpuTurn){
        //Creates a card for the cpu and adds to to the cpuCards array
        cpuCard = this.deck[0]
        cpuCard.setAttribute('class', 'cpu-card')
        cpuContainer.appendChild(cpuCard)
        this.cpuCards.push(cpuCard)
        this.deck.shift()
        this.checkForAceAndtotal()
        this.HasAce()
        this.dealerHit()
        
       }
    },

    stand(){
        this.switchPlayer()
        this.checkForAceAndtotal()
        this.HasAce()
        this.dealerHit()
        
    },
    checkForAceAndtotal() {
            this.playerTotal = 0
            this.cpuTotal = 0
            //  Checks for aces for bothe players
            for(let i= 0; i < this.playerCards.length; i++){
                this.playerTotal += parseInt(this.playerCards[i].getAttribute('value'))
                if(parseInt(this.playerCards[i].getAttribute('value')) ===11){
                    this.playerHasAce = true
                   
                }
            }
            for(let i= 0; i< this.cpuCards.length; i ++){
                this.cpuTotal += parseInt(this.cpuCards[i].getAttribute('value'))
                if(parseInt(this.cpuCards[i].getAttribute('value')) ===11){
                    this.cpuHasAce = true
                }
            }
            console.log('player: '+this.playerTotal)
            console.log('cpu: '+this.cpuTotal)
    },
    
    HasAce(){
         if(this.playerHasAce){
            if(this.playerTotal >= 22){
                console.log('this play has ace:'+this.playerHasAce)
                this.playerTotal -= 10
                this.playerHasAce = false
                console.log('this play has ace after:'+this.playerHasAce)
                for(let i=0; i< this.playerCards.length; i++){
                    if(parseInt(this.playerCards[i].getAttribute('value')) ===11){
                        this.playerCards[i].setAttribute('value', 1)
                        console.log(this.playerCards[i].getAttribute('value'))
                    }
                }
                if(this.cpuTotal >= 22){
                   this.playerBusted = true
                }
            }
        }

        if(this.cpuHasAce){
            if(this.cpuTotal >= 22){
                console.log('Dealer has ace:'+this.cpuHasAce)
                this.cpuTotal -= 10
                this.cpuHasAce = false
                console.log('Dealer has ace after:'+this.cpuHasAce)
                for(let i=0; i< this.cpuCards.length; i++){
                    // console.log('in loop')
                    if(parseInt(this.cpuCards[i].getAttribute('value')) ===11){
                        this.cpuCards[i].setAttribute('value', 1)
                        // console.log(this.cpuCards[i].getAttribute('value'))
                    }
                }
                if(this.cpuTotal >= 22){
                    // hitButton.disabled = true
                    console.log('bust with ace')
                }
            }
        }
        
    },

    checkPlayerHand(){
        if(this.playerTurn){
            //  Checks for Ace and makes sure it counts as 1 or 11
             if(this.playerTotal > 22){
                console.log(this.playerTotal)
                hitButton.disabled = true
                console.log("player bust")
                
            }
        } 
    },

    dealerHit(){
        if(this.cpuTurn){
            console.log('test')
            if(this.cpuTotal < 17){
                    console.log('I need to hit')
                    this.hit()
                    console.log(this.cpuTotal)
                // Checking to see if dealer needs to hit
            }
            else if(this.cpuTotal > 22){
                console.log(this.cpuTotal)
                hitButton.disabled = true
                console.log("Dealer bust")
            }
        }
    },
    checkForWin(){
      
            
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
    console.log('Player total: '+ game.playerTotal)
})

standButton.addEventListener('click', function(){
    game.stand()
})

