# ![Slot logo](/assests/faveicon.ico/android-icon-192x192.png) Casino Throw Down
So here is my first project! We got 3 diffrent casino games in line for the users. **Blackjack, 5 Card Poker**

### Why a casino game?
I remember growing up and my grandfather would always be teaching my how to play cards. Plus i have always lived life taking risk. So what better for a first project than to make a casino game remembering my grandfather. I also wanted to challenge myself to build out three games in 6 days

![BlackJack](/assets/blackjackss.png)

![Slots](/assets/slotss.png)

### Technologies used & Code Snippets
* Javascript 
* HTML
* CSS
This function/algorthim is tracking how many times a mulitple appears. What we are doing is counting how many times each number appears in the array including its self and tally each number and storing that in a new array. Then we are couting how many times each times multiples appear. Then we always know pairs and suits
```
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
```

### Shout outs
* I wanna give a shout out to my mentor for always pushing me and menotring me through my journey learning development.


* I got to give a thanks to this medium article for helping me understand shuffling an array more efficiently[Medium](https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb)

### This is not the end
* I am going to continue to build on out this 
casino. I am going to be making the slot machine  ***2D***. As well I am going to go through and improve on all the games UI and overall design.
* Need to still finish out all the betting pay outs
* I am going to add local storage as well as link all the ***JS*** files so that the players money will transfer in game and wont lose any values on reloads.
