const pokerCards = document.querySelectorAll('.card')
const pokerCardContainer = document.querySelectorAll('.card-container')
const cardsToDiscard = document.querySelectorAll('input')
const dealBtn = document.querySelector('.deal-btn')
console.log(pokerCardContainer)

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
        
    }
}

let poker = new Poker('name')
poker.buildDeck()
// for(let i=0; i<poker.deck.length;i++){
//     console.log(poker.deck[i])
// }
// console.log(poker.deck)
poker.shuffleDeck()
poker.deal()

function test () {
    for(let i=0; i<5;i++){
        console.log(poker.playerHand[i])
       
    }
    console.log('-----------------------------------------------------------------')
}


// console.log(poker.playerHand)
// console.log(poker.playerHand)
// console.log(poker.deck)

// console.log(cardsToDiscard[0])
// console.log(dealBtn)
//Listening for checked values and getting that id back
function discard() {
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
dealBtn.addEventListener('click', function(){
  discard()
   
test()
       
})

//Checking for win condtions 
// get all values from img attribute, loop through and check each element against each other
// add each index and save value into new array
// then check how many times each number sequence appears
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



let totals = []
let flushArray = []

for(let i = 0; i< poker.playerHand.length; i++){
    let temp= 0
    let temp2= 0
    for(let j = 0; j< poker.playerHand.length; j++){
        if(parseInt(poker.playerHand[i].getAttribute('value')) === parseInt(poker.playerHand[j].getAttribute('value'))){
            temp ++
        }
        if(poker.playerHand[i].getAttribute('value') === poker.playerHand[j].getAttribute('value') ){
            temp2++
        }
        // console.log(parseInt(poker.playerHand[i].getAttribute('value')))
    }
    flushArray.push(temp2)
    totals.push(temp)
    temp = 0
    
}
let pairs;
let threeOfAKind;
let fourOfAKind;
let flush;
console.log(flushArray)
for(let i=0; i < totals.length; i++){
    if(totals[i] === 2){
        pairs++
    }
    if(totals[i] === 3){
        threeOfAKind++
    }
    if(totals[i] === 4){
        forOfAKind++
    }
    if(flushArray[i] === 5){
        flush++
    }
}
console.log(totals)
let isStraight = false
function isConsecutive (max,min){
    if(max - min +1 ===5){
        isStraight = true
    }
}

isConsecutive(6,2)
console.log(isStraight)