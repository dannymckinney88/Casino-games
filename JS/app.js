// Selectors 
    // card elements 
const playerContainer = document.querySelector('.card-container-player')
const dealerContainer =  document.querySelector('.card-container-dealer')
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
                const card = document.createElement('img');
                card.setAttribute('value',`${i}`);
                card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
                this.deck.push(card)
              
            }
            else if(i > 10 && i < 14){ 
                //Builds cards J, Q, K and set their value to 10
                const card = document.createElement('img');
                card.setAttribute('value',`10`);
                card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
                this.deck.push(card)
            } else { 
                // builds the Ace and sets its value to 11
                const card = document.createElement('img');
                card.setAttribute('value',`11`);
                card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
                this.deck.push(card)
            }
            
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

class BlackJack extends Casino {
    constructor(name){  
        super(name) ; {
        this.playerCard = ''
        this.dealerCard = ''
        this.playerCards = []
        this.dealerCards = []
        this.playerTurn = false
        this.dealerTurn = false
        this.playerTotal = 0
        this.dealerTotal = 0
        this.playerHasAce = false
        this.dealerHadAce = false
        this.firstDeal = false
        this.dealerQualify = false
        }
    }
    
    // Deals the game out and runs some checks for blackjack 
    deal() {
   
        //setting intiall values and resetting board
        modal.style.display = "none"
        this.firstDeal = true
        playerContainer.innerHTML = ''
        dealerContainer.innerHTML = ''
        this.playerCards = []
        this.dealerCards = []
        this.bet()
        // dealing cards out switching from player to dealer for visuals
        for(let i =0; i < 2; i++){
                // comme back and figure out how to slow down speed of cards comming out----
            this.playerCard = this.deck[0]
            this.playerCard.setAttribute('class', 'player-card')
            playerContainer.appendChild(this.playerCard)
            this.playerCards.push(this.playerCard)
            this.deck.shift()
            this.playerTurn = false
            this.dealerTurn = true
            this.dealerCard = this.deck[0]
            this.dealerCard.setAttribute('class', 'dealer-card')
            dealerContainer.appendChild(this.dealerCard)
            this.dealerCards.push(this.dealerCard)
            this.deck.shift()
        }
        //Reseting values 
        this.dealerHasAce = false
        this.playerHasAce = false
        this.playerTurn = true
        this.dealerTurn = false
        hitButton.disabled = false
        // Checking for black Jack
        this.checkForAceAndtotal()
        this.checkBlackJack()
    }
        
    // Tracks your money
    bet() {
        player.money -= 5
        console.log('test'+ player.money)
        playerMoney.innerHTML = '$'+player.money
    }
    // Checks for blackjac after intialll deal
    checkBlackJack(){
        //Checking if either both or just one player has black jack
        if(this.playerTotal==21 && this.dealerTotal==21){
            hitButton.disabled = true
            winnerText.innerHTML = "You push"
            modal.style.display = "block"
        }
        else if(this.playerTotal == 21){
            hitButton.disabled = true
            winnerText.innerHTML = "Winner Winner Chicken Dinner"
            modal.style.display = "block"
        }
        else if(this.dealerTotal == 21){
            hitButton.disabled = true
            winnerText.innerHTML = "You Dealer Wins"
            modal.style.display = "block"
        }
    }
    //Lets the player and dealer hit
    hit() {
        //Checks which players turn it is and then gives card to correct player
       if(this.playerTurn){
        //Creates a card for the player and adds to to the playerCards array
        this.playerCard = this.deck[0]
        this.playerCard.setAttribute('class', 'player-card')
        playerContainer.appendChild(this.playerCard)
        this.playerCards.push(this.playerCard)
        this.deck.shift()
        this.checkForAceAndtotal()
        this.HasAce()
        this.checkForWin()
      }else if (this.dealerTurn){
        //Creates a card for the dealer and adds to to the dealerCards array
        this.dealerCard = this.deck[0]
        this.dealerCard.setAttribute('class', 'dealer-card')
        dealerContainer.appendChild(this.dealerCard)
        this.dealerCards.push(this.dealerCard)
        this.deck.shift()
        this.checkForAceAndtotal()
        this.HasAce()
        this.checkForWin()
        
       }
    }
    // Stops players turn and switches to dealer.
    stand(){
        this.playerTurn = false
        this.dealerTurn = true
        this.checkForAceAndtotal()
        this.HasAce()
        this.dealerHit()
        this.checkForWin()
        
    }
    // Checks to see if either player has an Ace and counts card total
    checkForAceAndtotal() {
            this.playerTotal = 0
            this.dealerTotal = 0
            //  Checks to see if either player has an ace
            for(let i= 0; i < this.playerCards.length; i++){
                this.playerTotal += parseInt(this.playerCards[i].getAttribute('value'))
                if(parseInt(this.playerCards[i].getAttribute('value')) ===11){
                    this.playerHasAce = true
                   
                }
            }
            for(let i= 0; i< this.dealerCards.length; i ++){
                this.dealerTotal += parseInt(this.dealerCards[i].getAttribute('value'))
                if(parseInt(this.dealerCards[i].getAttribute('value')) ===11){
                    this.dealerHasAce = true
                }
            }
            console.log('player total:'+this.playerTotal)
            console.log('Dealer total:'+this.dealerTotal)
            
    }
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
                if(this.dealerTotal >= 22){
                   this.playerBusted = true
                }
            }
        }

        if(this.dealerHasAce){
            // makking sure ace works for dealer
            if(this.dealerTotal >= 22){
                console.log('Dealer has ace:'+this.dealerHasAce)
                this.dealerTotal -= 10
                this.dealerHasAce = false
                console.log('Dealer has ace after:'+this.dealerHasAce)
                for(let i=0; i< this.dealerCards.length; i++){
                    if(parseInt(this.dealerCards[i].getAttribute('value')) ===11){
                        this.dealerCards[i].setAttribute('value', 1)
                    }
                }
                if(this.dealerTotal >= 22){
                    hitButton.disabled = true
                }
            }
        }
        
    }
    // If player stands this has dealer player by itself
    dealerHit(){
        if(this.dealerTurn){
            console.log('test')
            while(this.dealerTotal < 17){
                    console.log('I need to hit')
                    this.hit()
                    this.checkForAceAndtotal()
                    //Checks if dealer bust
                    if(this.dealerTotal <= 21 && this.dealerTotal >=17){
                        this.dealerQualify = true;
                        console.log(this.dealerTotal, this.dealerQualify)
                    }
                    this.checkForWin()
                // Checking to see if dealer needs to hit
            }
            if(this.dealerTotal <= 21 && this.dealerTotal >=17){
                this.dealerQualify = true;
                console.log(this.dealerTotal, this.dealerQualify)
            }
            this.checkForWin()
    }
}
    //  Checks all win condtions 
    checkForWin(){
            //  Checks for Ace and makes sure it counts as 1 or 11
            console.log('player total:'+this.playerTotal)
            console.log('Dealer total:'+this.dealerTotal)
     if(this.playerTotal > 21){
       console.log(this.playerTotal)
       hitButton.disabled = true
       winnerText.innerHTML = "You bust"
       modal.style.display = "block"         
     }
     if(this.dealerTotal > 21){
       console.log(this.dealerTotal)
       winnerText.innerHTML = "Dealer bust"
       modal.style.display = "block"
       hitButton.disabled = true
    }
     if(this.dealerQualify){
      if(this.playerTotal > this.dealerTotal){
         hitButton.disabled = true
         winnerText.innerHTML = "YOU WIN!!!!!"
         modal.style.display = "block"
     }else{
         hitButton.disabled = true
         winnerText.innerHTML = "The house wins"
         modal.style.display = "block"
     }
     this.dealerQualify = false;
   }
  }
 }
        
const blackJack = new BlackJack("Black Jack dealer")
// console.log(blackJack)

    //Sets up decks
blackJack.buildDeck()
blackJack.shuffleDeck(blackJack.deck)
blackJack.checkForWin()
     
// Event listeners
dealButton.addEventListener('click', ()=>{
        blackJack.deal()


    
})

hitButton.addEventListener('click', ()=>{
    blackJack.hit()
    blackJack.checkForWin()
    // console.log('Player total: '+ game.playerTotal)
})

standButton.addEventListener('click', ()=>{
    blackJack.stand()
})


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

