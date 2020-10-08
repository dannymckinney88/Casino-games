//Selectors && Event listeners
const reelContainers = document.querySelectorAll('.reel-container')
const spinBtn = document.querySelector('.spin-container')






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
                    this.reel1.push(reel1)
                }
                let reel2 = document.createElement('img')
                    reel2.setAttribute('src',`./assests/slot/${i}.png` )
                    reel2.setAttribute('value',i )
                    this.reel1.push(reel1)
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
            slot.reel1
            
        }
    }

    checkForWin(){
        if((parseInt(this.reel1[0].getAttribute('value'))) ===(parseInt(this.reel1[1].getAttribute('value'))) 
        && (parseInt(this.reel1[1].getAttribute('value'))) ===(parseInt(this.reel1[2].getAttribute('value')))
        ){
            alert('you win')
        }
        this.reel1.shift()
        this.reel1.shift()
        this.reel1.shift()
    }

}


const slot = new Slot('Slot machine')
spinBtn.addEventListener('click',function(){
    slot.displayRandom()
    slot.checkForWin()
})
slot.buildReel()
slot.buildReel()
slot.randomReel(slot.reel1)
slot.displayRandom()
console.log(parseInt(slot.reel1[0].getAttribute('value')))
// console.log(parseInt(slot.reel1[0].getAtrribute('value')))

