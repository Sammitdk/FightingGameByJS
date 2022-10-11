const play = document.getElementById('play')
const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')
const player1Div = document.getElementById('player1Div')
const player2Div = document.getElementById('player2Div')

class Player{
    constructor(heal,chance){
        this.heal = 100
        this.chance = true
    }
}

function clearButton(){
    play.innerHTML = `<input type="text" id="player1Input">
    <input type="text" id="player2Input">
    <button onClick="submitPlayer()" style="background-color: white;">Go</button>`
}

function submitPlayer() {
    if(player1Input.value && player2Input.value != ''){
        player1.innerText = player1Input.value
        player2.innerText = player2Input.value
        play.innerHTML = ''
        player1Obj = new Player(100,true)
        player2Obj = new Player(100,false)
        scoreUpdate()
        gameStarted()
    }else{
        alert('Please enter player name')
    }
}

function scoreUpdate() {
    player1Div.innerHTML += `<center>
    <h3 id = "heal1">
        Heal : ${player1Obj.heal}
    </h3>
    </center>`

    player2Div.innerHTML += `<center>
    <h3 id = "heal2">
        Heal : ${player2Obj.heal}
    </h3>
    </center>`
}

function gameStarted() {
    const p = document.getElementById('heal1')
    const q = document.getElementById('heal2')
    play.innerHTML = `<h2> Attack </h2>`

    function keyboardInput(input) {
        if(input.key == 'q' && player1Obj.chance == true){
            document.getElementById('attack').play()
            player2Obj.heal += -Math.floor(Math.random() * 10)
            player1Obj.chance = false
            player2Obj.chance = true
            if(player2Obj.heal < 0){
                player2Obj.heal =  0
            }
            document.getElementById('heal2').innerHTML =  `Heal : ${player2Obj.heal}`
        }else if(input.key == 'e' && player1Obj.chance == true){
            document.getElementById('heal').play()
            player1Obj.chance = false
            player2Obj.chance = true
            player1Obj.heal +=  Math.floor(Math.random() * 10)
            if(player1Obj.heal > 100){
                player1Obj.heal =  100
            }
            document.getElementById('heal1').innerHTML =  `Heal : ${player1Obj.heal}`
        }
        else if(input.key == 'p' && player2Obj.chance == true){
            document.getElementById('attack').play()
            player2Obj.chance = false
            player1Obj.chance = true
            player1Obj.heal += -Math.floor(Math.random() * 10)
            if(player1Obj.heal < 0){
                player1Obj.heal =  0
            }
            document.getElementById('heal1').innerHTML =  `Heal : ${player1Obj.heal}`
        }
        else if(input.key == 'i' && player2Obj.chance == true){
            document.getElementById('heal').play()
            player2Obj.chance = false
            player1Obj.chance = true
            player2Obj.heal +=  Math.floor(Math.random() * 10)
            if(player2Obj.heal > 100){
                player2Obj.heal =  100
            }
            document.getElementById('heal2').innerHTML =  `Heal : ${player2Obj.heal}`
        }
        play.innerHTML = `
            <h2> ${player1Obj.chance ? `${player1.innerText} chance` : `${player2.innerText} chance`} </h2>
        `
        if(player1Obj.heal == 0){
            play.innerHTML = `<h2 style="color: green;"> ${player2.innerText} wins</h2>`
            document.removeEventListener('keydown',keyboardInput)
        }

        if(player2Obj.heal == 0){
            play.innerHTML = `<h2 style="color: green;"> ${player1.innerText} wins</h2>`
            document.removeEventListener('keydown',keyboardInput)
        }
    }
    document.addEventListener('keydown',keyboardInput)
}
