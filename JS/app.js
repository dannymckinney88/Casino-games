// Selectors 
    // card elements 
const playerContainer = document.querySelector('.card-container-player')
const cpuContainer =  document.querySelector('.card-container-cpu')
    //buttons
const dealButton = document.querySelector('.deal-btn')
const hitButton = document.querySelector('.hit')
const standButton = document.querySelector('.stand')
const blackJackButton = document.querySelector('.blackjack-btn')
const playerName = document.querySelector('.player-name')
    //Money
const playerMoney = document.querySelector('.player-money')
    //Modals
const modal = document.querySelector(".modal-content");
const span = document.getElementsByClassName("close")[0];
const winnerText = document.querySelector('.winner-text')


//player Object
let player = {
    name: 'danny',
    money: 100
}
class Casino  {
    constructor(){

    }
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
    cpuQualify: false,
    
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
    // Deals the game out and runs some checks for blackjack 
    deal() {
        //setting intiall values and resetting board
        modal.style.display = "none"
        this.firstDeal = true
        playerContainer.innerHTML = ''
        cpuContainer.innerHTML = ''
        this.playerCards = []
        this.cpuCards = []
        this.bet()
        // dealing cards out switching from player to cpu for visuals
        for(let i =0; i < 2; i++){
                // comme back and figure out how to slow down speed of cards comming out----
            playerCard = this.deck[0]
            playerCard.setAttribute('class', 'player-card')
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
        hitButton.disabled = false
        // Checking for black Jack
        this.checkForAceAndtotal()
        this.checkBlackJack()
    },
        
    // Tracks your money
    bet() {
        player.money -= 5
        console.log('test'+ player.money)
        playerMoney.innerHTML = '$'+player.money
    },
    // Checks for blackjac after intialll deal
    checkBlackJack(){
        //Checking if either both or just one player has black jack
        if(this.playerTotal==21 && this.cpuTotal==21){
            hitButton.disabled = true
            winnerText.innerHTML = "You push"
            modal.style.display = "block"
        }
        else if(this.playerTotal == 21){
            hitButton.disabled = true
            winnerText.innerHTML = "Winner Winner Chicken Dinner"
            modal.style.display = "block"
        }
        else if(this.cpuTotal == 21){
            hitButton.disabled = true
            winnerText.innerHTML = "You Dealer Wins"
            modal.style.display = "block"
        }
    },
    //Lets the player and dealer hit
    hit() {
        //Checks which players turn it is and then gives card to correct player
       if(this.playerTurn){
        //Creates a card for the player and adds to to the playerCards array
        playerCard = this.deck[0]
        playerCard.setAttribute('class', 'player-card')
        playerContainer.appendChild(playerCard)
        this.playerCards.push(playerCard)
        this.deck.shift()
        this.checkForAceAndtotal()
        this.HasAce()
        this.checkForWin()
      }else if (this.cpuTurn){
        //Creates a card for the dealer and adds to to the cpuCards array
        cpuCard = this.deck[0]
        cpuCard.setAttribute('class', 'cpu-card')
        cpuContainer.appendChild(cpuCard)
        this.cpuCards.push(cpuCard)
        this.deck.shift()
        this.checkForAceAndtotal()
        this.HasAce()
        this.checkForWin()
        
       }
    },
    // Stops players turn and switches to dealer.
    stand(){
        this.playerTurn = false
        this.cpuTurn = true
        this.checkForAceAndtotal()
        this.HasAce()
        this.dealerHit()
        this.checkForWin()
        
    },
    // Checks to see if either player has an Ace and counts card total
    checkForAceAndtotal() {
            this.playerTotal = 0
            this.cpuTotal = 0
            //  Checks to see if either player has an ace
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
    },
    //  After getting totall checks logic for ace cards if any are out
    HasAce(){
        //    Makes sure that an ace can either be 11 or 1
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
            // makking sure ace works for dealer
            if(this.cpuTotal >= 22){
                console.log('Dealer has ace:'+this.cpuHasAce)
                this.cpuTotal -= 10
                this.cpuHasAce = false
                console.log('Dealer has ace after:'+this.cpuHasAce)
                for(let i=0; i< this.cpuCards.length; i++){
                    if(parseInt(this.cpuCards[i].getAttribute('value')) ===11){
                        this.cpuCards[i].setAttribute('value', 1)
                    }
                }
                if(this.cpuTotal >= 22){
                    hitButton.disabled = true
                }
            }
        }
        
    },
    // If player stands this has dealer player by itself
    dealerHit(){
        if(this.cpuTurn){
            console.log('test')
            while(this.cpuTotal < 17){
                    console.log('I need to hit')
                    this.hit()
                    this.checkForAceAndtotal()
                    //Checks if dealer bust
                    if(this.cpuTotal <= 21 && this.cpuTotal >=17){
                        this.cpuQualify = true;
                        console.log(this.cpuTotal, this.cpuQualify)
                    }
                    this.checkForWin()
                // Checking to see if dealer needs to hit
            }
            if(this.cpuTotal <= 21 && this.cpuTotal >=17){
                this.cpuQualify = true;
                console.log(this.cpuTotal, this.cpuQualify)
            }
            this.checkForWin()
    }
},
    //  Checks all win condtions 
    checkForWin(){
            //  Checks for Ace and makes sure it counts as 1 or 11
                if(this.playerTotal > 21){
                console.log(this.playerTotal)
                hitButton.disabled = true
                winnerText.innerHTML = "You bust"
                modal.style.display = "block"         
            }
                if(this.cpuTotal > 21){
                    console.log(this.cpuTotal)
                    hitButton.disabled = true
                    winnerText.innerHTML = "Dealer bust"
                    modal.style.display = "block"
                }
                if(this.cpuQualify){
                    if(this.playerTotal > this.cpuTotal){
                        hitButton.disabled = true
                        winnerText.innerHTML = "YOU WIN!!!!!"
                        modal.style.display = "block"
                    }else{
                        hitButton.disabled = true
                        winnerText.innerHTML = "The house wins"
                        modal.style.display = "block"
                    }
                    this.cpuQualify = false;
                }
       }
            
       
    }
    //Sets up decks
game.buildDeck()
game.shuffleDeck(game.deck)
game.checkForWin()
     
// Event listeners
dealButton.addEventListener('click', ()=>{
        game.deal()
    

    
})

hitButton.addEventListener('click', ()=>{
    game.hit()
    game.checkForWin()
    // console.log('Player total: '+ game.playerTotal)
})

standButton.addEventListener('click', ()=>{
    game.stand()
})




// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere on the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

for(let i=0; i<=100; i++){
    if(i % 3 ==0 && i %5 ==0){
        console.log(i+':Fizz')
    }
    else if(i % 5==0){
        console.log(i+':buzz')
    }else if(i %3 ==0){
        console.log(i+':Frizzbizz')
    }else{
        console.log(i)
    }
}