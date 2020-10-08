const reelContainers = document.querySelectorAll('.reel-container')

// class Casino  {
//     constructor(name){
//         this.name = name
//         this.playerCredit = 0
//         this.card = ""
//         this.deck = []
//     }
//     // Creates cards with suit. Suits are labeled (s =spade c=clubs h=heart d=dimond)
//     // Cards have id of suit
//     buildCards(suit){
//         for(let i=2; i < 15; i++){
//             // Builds cards 2-10 and sets their value
//             if(i < 11){
//                 const card = document.createElement('img');
//                 card.setAttribute('value',`${i}`);
//                 card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
//                 this.deck.push(card)
              
//             }
//             else if(i > 10 && i < 14){ 
//                 //Builds cards J, Q, K and set their value to 10
//                 const card = document.createElement('img');
//                 card.setAttribute('value',`10`);
//                 card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
//                 this.deck.push(card)
//             } else { 
//                 // builds the Ace and sets its value to 11
//                 const card = document.createElement('img');
//                 card.setAttribute('value',`11`);
//                 card.setAttribute('src',`./assests/blackjack/${i}${suit}.png`);
//                 this.deck.push(card)
//             }
            
//         }
//     }
//       // Builds a full 52card deck and puts them in the deck array.
//       buildDeck(suit){
//         this.buildCards('s')
//         this.buildCards('c')
//         this.buildCards('h')
//         this.buildCards('d')

//     }
//     // Shuffles the deck of cards 
//     shuffleDeck(deck) {
//         for(let i = this.deck.length -1; i > 0; i--){
//             //Shuffling around each index to make sure random everytime.
//             const j = Math.floor(Math.random() * i)
//             const temp = this.deck[i]
//             this.deck[i] = this.deck[j]
//             this.deck[j] = temp
//         }
//     }

// }

class Slot {
    constructor(){
            this.reel1 = []
        
    }
    buildReel(){
        for(let i = 1; i <= 3; i++){
            for(let j =1; j<=3; j++){
                let reel1 = document.createElement('img')
                reel1.setAttribute('src',`./assests/slot/${j}.png` )
                reel1.setAttribute('value',j )
                this.reel1.push(reel1)
                for(let k=1; k<=3;k++){
                    let reel2 = document.createElement('img')
                    reel2.setAttribute('src',`./assests/slot/${k}.png` )
                    reel2.setAttribute('value',k )
                    this.reel1.push(reel2)
                }
                let reel2 = document.createElement('img')
                    reel2.setAttribute('src',`./assests/slot/${i}.png` )
                    reel2.setAttribute('value',i )
                    this.reel1.push(reel2)
            }
        }
    }
    randomReel(reel){
        for(let i = reel.length -1; i > 0; i--){
            //Shuffling around each index to make sure random everytime.
            const j = Math.floor(Math.random() * i)
            const temp = reel[i]
            reel[i] = reel[j]
            reel[j] = temp
        }
    }
    displayRandom(){
        for(let i =0; i<reelContainers.length; i++){
            console.log(slot.reel1[i])
            // let randomNum  = Math.floor(Math.random()* slot.reel1.length)
            reelContainers[i].innerHTML = ''
            console.log()
            reelContainers[i].appendChild(slot.reel1[i])
            
        }
    }

}


const slot = new Slot('Slot machine')
slot.buildReel()
slot.buildReel()
slot.randomReel(slot.reel1)
slot.displayRandom()

