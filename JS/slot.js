//Selectors && Event listeners
const reelContainers = document.querySelectorAll('.reel-container')
const spinBtn = document.querySelector('.spin-container')
const background = document.querySelector('.slot-backgroud')
const playerMoney = document.querySelector('.player-money')


function createReels(reel,value){
    reel = document.createElement('img')
    reel.setAttribute('src',`assests/slot/${value}.png` )
    reel.setAttribute('class', 'slot-reel')
    reel.setAttribute('value',value )
    console.log(reel)
}

let realImgOne;
let realImgTwo;
let realImgThree;

createReels(realImgOne,1)
createReels(realImgOne,2)
createReels(realImgOne,3)






const player={
    money: 1000
}

class Slot {
    constructor(){
        this.reelImgOne = ""
        this.reelImgTwo = ""
        this.reelImgThree = ""
        this.reel1 = []
        this.reel2 = []
        this.reel3 = []
        
    }
    //Set ups reel with img and value
    buildReelImg(reel, value){
        reel = document.createElement('img')
        reel.setAttribute('src',`assests/slot/${value}.png` )
        reel.setAttribute('class', 'slot-reel')
        reel.setAttribute('value',value )
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
    displayRandom(array, postion){
            reelContainers[postion].innerHTML = ''
            reelContainers[postion].appendChild(array[0])
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
// const slot = new Slot('Slot machine')
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
