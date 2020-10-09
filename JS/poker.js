//Checking for win condtions 
// get all values from value attribute, loop through and check each element against each other
// add the value and then push value into new array
// then check how many times each time pairs, 3x and 4x show up
//Check for suits adding up same way 
// Then check if the numbers are consecutive
// Check highest 1st,  royal flush,straight flush, 4x, full house, flush, straight, 3x, 2 pair
//--Royal flush 
    //check ids for suit and value card value then check if all 5 cards are same id(suiut) and  consecutive order (10-14 sort the values)
// --straight flush same as about with any order use previous number - 1 = %0
//-- 4 of a kind
    // check if 4 values are the same 
//--fullHouse
    //Check if 3 values are the same and then if 2 values are the same. Use some counter and check if total is 5 then true
//--Flush
    // check if all 5 are the same value if so true 
// -- straight 
    // Check if all 5 numbers are consecutive
// -- 3 of a kind
    //  check if 3 values are in the array
//  2 pair 
    //  Check if there are 2 diffrent numbers consecutive

// Selectors 
const pokerCards = document.querySelectorAll('.card')
const pokerCardContainer = document.querySelectorAll('.card-container')
const cardsToDiscard = document.querySelectorAll('input')
const dealBtn = document.querySelector('.deal-btn')
const betBtn = document.querySelector('.bet-btn')
const standBtn = document.querySelector('.stand-btn')
//Event listeners

// standBtn.addEventListener('clcik',function(){

// })

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
                const card = document.createElement('img');
                card.setAttribute('value',i);
                card.setAttribute('id',suit)
                card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
                this.deck.push(card)
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
        super(name) ; {
            this.playerHand = []
            this.royalFlush = false
            this.straightFlush = false
            this.forOfAKind = false
            this.fullHouse = false
            this.flush = false
            this.straight = false
            this.threeOfAKind = false
            this.twoPair = false
           
           
            
        }
    }
    deal(){
        for(let i=0; i< pokerCards.length; i++){
            pokerCards[i].remove()
            pokerCardContainer[i].appendChild(this.deck[i])
            this.playerHand.push(this.deck[i])
            // console.log(i+poker.playerHand[i])
            poker.deck.shift()
        }

    }
    discard(){
        for(let i=0;i<5;i++){
            //    console.log(cardsToDiscard[i])
            
            if(!cardsToDiscard[i].checked){
                poker.deck.shift()
                // console.log(poker.deck[1])
                pokerCardContainer[i].innerHTML = ''
                // console.log(pokerCardContainer[i])
                pokerCardContainer[i].appendChild(poker.deck[1])
                // console.log('I am comming from poker deck'+this.deck[i])
    
                // console.log(temp)
                poker.playerHand.splice(i,1,poker.deck[1])
                poker.deck.shift()
                // cardsToDiscard[i].checked = false
            }
        } 
    }
    pairsAndFlush(){
        //Temp vars
        let cardTotals = []
        let flushArray = []
        let pairsCounter = 0
        let threeOfAkindCounter = 0
        let fourOfAkindCounter = 0
        let flushCounter = 0

        for(let i = 0; i< poker.playerHand.length; i++){
            let pairs= 0
            let suits= 0
            for(let j = 0; j< poker.playerHand.length; j++){
                if(parseInt(poker.playerHand[i].getAttribute('value')) === parseInt(poker.playerHand[j].getAttribute('value'))){
                    pairs ++
                }
                if(poker.playerHand[i].getAttribute('id') === poker.playerHand[j].getAttribute('id') ){
                    suits++
                }
                // console.log(parseInt(poker.playerHand[i].getAttribute('value')))
            }
                cardTotals.push(pairs)
                flushArray.push(suits)
                pairs = 0
                suits = 0
        } 
    
        for(let i=0; i < cardTotals.length; i++){
            if(cardTotals[i] === 2){
                pairsCounter++
            }
            if(cardTotals[i] === 3){
                threeOfAkindCounter++
            }
            if(cardTotals[i] === 4){
                fourOfAkindCounter++
            }
            if(flushArray[i] === 5){
                flushCounter++
            }
        } console.log(threeOfAkindCounter)
        if(fourOfAkindCounter ===4){
            this.forOfAKind = true
        }
        else if(threeOfAkindCounter ===3 && pairsCounter ===2){
            this.fullHouse = true
        }
        else if(flushCounter === 5){
            this.flush = true
        }
        else if(threeOfAkindCounter === 3){
            this.threeOfAKind = true
        }else if(pairsCounter ===4){
            this.twoPair = true
        }
        console.log(flushArray)
        console.log(cardTotals)
   }
   hasStraight(){
    // Temp array to hold the parsed values and then sort them.
    const tempArray = []
       for(let i=0; i < this.playerHand.length; i++){
           tempArray.push(parseInt(this.playerHand[i].getAttribute('value')))
       }
        tempArray.sort(function(a,b){return a-b})
        console.log('temp: '+tempArray)
        let straightCounter = 0
        for(let i=0; i < tempArray.length -1; i++){
        
            let numHolder = 0
            numHolder = tempArray[i]
            if(tempArray[i+1] - numHolder === 1){   
                straightCounter ++
            }   
        }
      if(straightCounter ===5 ){
          this.straight = true;
      }
   }
   checkWin(){
       //Royal fllush card totals will alwyas equal 60
        let isRoyal 

        console.log('Two pair'+ this.twoPair)
        console.log('3x'+ this.threeOfAKind)
        console.log('flush'+ this.flush)
        console.log('straight'+ this.straight)
        console.log('fullhouse'+ this.fullHouse)
        // console.log('straight'+ this.straight)

        for(let i =0; i < this.playerHand.length; i++){
            isRoyal += parseInt(poker.playerHand[i].getAttribute('value'))
        }

       if(this.flush ===true && this.straight === true && isRoyal === 60){
           alert('royal flush')
           this.royalFlush = false
       }
       else if(this.straightFlush){
           alert('straight flush')
           this.straightFlush = false
       }
       else if (this.forOfAKind){
           alert('four of a kind')
           this.forOfAKind = false
       }
       else if(this.fullHouse){
            alert('fullhouse')
            this.fullHouse = false
       }
       else if(this.flush){
           alert('flush')
           this.flush = false
       }
       else if(this.threeOfAKind){
           alert('three of a kind')
           this.threeOfAKind = false
       }
       else if(this.twoPair){
           alert('two pair')
           this.twoPair = false
       }
   }
}

let poker = new Poker('name')

betBtn.addEventListener('click',function(){
    poker.buildDeck()
    poker.shuffleDeck()
    poker.deal()
    poker.pairsAndFlush()
    betBtn.disabled = true
    dealBtn.disabled = false
})

dealBtn.addEventListener('click', function(){
    poker.discard()
    poker.pairsAndFlush()
    poker.hasStraight()
    poker.checkWin()
    dealBtn.disabled = true
    betBtn.disabled = false
  })


// const isRoyal = parseInt(poker.playerHand.reduce((a,b) => a +b).getAttribute('value'))
