//Selectors && Event listeners
const reelContainers = document.querySelectorAll('.reel-container')
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
        
    }
    buildReel(){
        //Builds each slot reel and push them into 3 seperate arrays
        for(let i = 1; i <= 3; i++){
            for(let j =1; j<=3; j++){
                let reel1 = document.createElement('img')
                reel1.setAttribute('src',`./assests/slot/${j}.png` )
                reel1.setAttribute('class', 'slot-reel')
                reel1.setAttribute('value',j )
                this.reel1.push(reel1)
                for(let k=1; k<=3;k++){
                    let reel2 = document.createElement('img')
                    reel2.setAttribute('src',`./assests/slot/${k}.png` )
                    reel2.setAttribute('class', 'slot-reel')
                    reel2.setAttribute('value',k )
                    this.reel2.push(reel2)
                }
                let reel3 = document.createElement('img')
                    reel3.setAttribute('src',`./assests/slot/${i}.png` )
                    reel3.setAttribute('class', 'slot-reel')
                    reel3.setAttribute('value',i )
                    this.reel3.push(reel3)
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
const slot = new Slot('Slot machine')
spinBtn.addEventListener('click',function(){
    player.money -= 50
    playerMoney.innerHTML = player.money
    slot.buildReel()
    slot.randomReel(slot.reel1)
    slot.randomReel(slot.reel2)
    slot.randomReel(slot.reel3)
    slot.displayRandom(slot.reel1,0)
    slot.displayRandom(slot.reel2,1)
    slot.displayRandom(slot.reel3,2)
    slot.checkForWin()
    console.log(slot.reel1[0],slot.reel2[0],slot.reel3[0])
})
