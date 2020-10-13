//Selectors && Event listeners
const reelContainer1 = document.querySelector('.reel1')
const reelContainer2 = document.querySelector('.reel2')
const reelContainer3 = document.querySelector('.reel3')
const spinBtn = document.querySelector('.spin-container')
const background = document.querySelector('.slot-backgroud')
const playerMoney = document.querySelector('.player-money')

const player={
    money: 1000
}

class Slot {
    constructor(){
            this.reel1 = []
            this.reel2 = []
            this.reel3 = []
            // For 2D reel 
            this.allReels = [this.reel1,this.reel2,this.reel3]
            // Stores correct combination from all three reels in order
            //Might take out?
            this.reelToDisplay = []
        
    }
    buildReel(reel){
        //Builds each slot reel and push them into 3 seperate arrays
        let counter = 0
        while(counter < 4){
            for(let i = 1; i <= 3; i++){
                let tempReel = document.createElement('img')
                tempReel.setAttribute('src',`assests/slot/${i}.png` )
                tempReel.setAttribute('class', 'slot-reel')
                tempReel.setAttribute('value',i )
                reel.push(tempReel)
                    
            }
            counter++
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
    // Creates an array with the reel to display 
        // - might scrap this function
    reelDisplay(array){
        for(let i =0; i <3; i++){
            console.log(array[i])
            this.reelToDisplay.push(array)
        }
    }
    // Displays the correct combonation on screen
    displayRandom(reelContainer, reel){
        let createDiv = document.createElement('div')
        createDiv.setAttribute('class','reel')
        for(let i=0; i< 3; i++){
            reelContainer[i].innerHTML = ''
            reelContainer[i].appendChild(reel[i])
        }
    }

    checkForWin(){
        // Checking if all 3 indexs have the same value
        if((parseInt(this.reel1[0].getAttribute('value'))) ===(parseInt(this.reel2[0].getAttribute('value'))) 
        && (parseInt(this.reel2[0].getAttribute('value'))) ===(parseInt(this.reel3[0].getAttribute('value')))
        ){
            player.money += 150
            playerMoney.innerHTML = player.money
            alert(player.money)
        }
        console.log(this.reel3)
        slot.reel1 = []
        slot.reel2 = []
        slot.reel3 = []
    }
}
//  Event listener and starts game.
const slot = new Slot('Slot machine')
slot.buildReel(slot.reel1)
slot.buildReel(slot.reel2)
slot.buildReel(slot.reel3)
slot.randomReel(slot.reel1)
slot.randomReel(slot.reel2)
slot.randomReel(slot.reel3)
slot.reelDisplay(slot.allReels[0])
slot.reelDisplay(slot.allReels[1])
slot.reelDisplay(slot.allReels[2])
// slot.reelDisplay(slot.displayReel)
// console.log(slot.displayReel)

const test = () =>{
    for(let i=0; i < slot.allReels.length; i++){
        console.log('I am outside'+i)
        for(let k=0; k < 3; k++){
            console.log('I am inside'+i)
            console.log(k)
            console.log(slot.allReels[i][k])
        }
    }
}

console.log(slot.allReels[1])
// test()
// spinBtn.addEventListener('click',function(){
//     player.money -= 50
//     playerMoney.innerHTML = player.money
//     slot.buildReel()
//     slot.randomReel(slot.reel1)
//     slot.randomReel(slot.reel2)
//     slot.randomReel(slot.reel3)
//     slot.displayRandom(slot.reel1,0)
//     slot.displayRandom(slot.reel2,1)
//     slot.displayRandom(slot.reel3,2)
//     slot.checkForWin()
//     console.log(slot.reel1[0],slot.reel2[0],slot.reel3[0])
// })