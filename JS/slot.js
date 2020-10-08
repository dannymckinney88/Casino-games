//Selectors && Event listeners
const reelContainers = document.querySelectorAll('.reel-container')
const spinBtn = document.querySelector('.spin-container')
const background = document.querySelector('.slot-backgroud')







class Slot {
    constructor(){
            this.reel1 = []
            this.reel2 = []
            this.reel3 = []
        
    }
    buildReel(){
        for(let i = 1; i <= 4; i++){
            for(let j =1; j<=4; j++){
                let reel1 = document.createElement('img')
                reel1.setAttribute('src',`./assests/slot/${j}.png` )
                reel1.setAttribute('value',j )
                this.reel1.push(reel1)
                for(let k=1; k<=4;k++){
                    let reel2 = document.createElement('img')
                    reel2.setAttribute('src',`./assests/slot/${k}.png` )
                    reel2.setAttribute('value',k )
                    this.reel2.push(reel1)
                }
                let reel2 = document.createElement('img')
                    reel2.setAttribute('src',`./assests/slot/${i}.png` )
                    reel2.setAttribute('value',i )
                    this.reel3.push(reel1)
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
            reelContainers[i].innerHTML = ''
            console.log()
            reelContainers[i].appendChild(slot.reel1[i])
            
        }
        
      
    }

    checkForWin(){
        if((parseInt(this.reel1[0].getAttribute('value'))) ===(parseInt(this.reel2[0].getAttribute('value'))) 
        && (parseInt(this.reel2[0].getAttribute('value'))) ===(parseInt(this.reel1[0].getAttribute('value')))
        ){
            alert('you win')
        }
        console.log(this.reel1)
        slot.reel1 = []
    }
    changeBackground(){
        const randomNum = Math.floor(Math.random()*3 +1)
        background.setAttribute('src',`/assests/slot/bg${randomNum}.jpg`)
    }

}


const slot = new Slot('Slot machine')
spinBtn.addEventListener('click',function(){
    slot.buildReel()
    slot.randomReel(slot.reel1)
    slot.randomReel(slot.reel2)
    slot.randomReel(slot.reel3)
    slot.displayRandom()
    slot.checkForWin()
    slot.changeBackground()
})


// console.log(parseInt(slot.reel1[0].getAtrribute('value')))
