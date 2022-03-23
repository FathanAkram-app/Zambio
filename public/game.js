
import { trace } from "./bullettrace.js"
import {entity} from "./entities.js"
import { healthbar } from "./healthbar.js"
import {collisionInit} from "./world.js"
var playerInfo = {id:"", posX: Math.random() * 1000, posY: Math.random()*540, sizeH: 20, sizeW: 20, nickname: null,color:"red",colorName:"white",health:20}
var players = {}
var zombies = []
var bulletTrace = {}
var keydowns = []

var moveUp = null
var moveDown = null
var moveRight = null
var moveLeft = null
function keyInit() {
    window.addEventListener('keydown',e =>{
        if (e.repeat) {
            return
        }
        
        switch (e.keyCode) {
            
            
            case 68:
                // player1 move right
                keydowns.push(68)
                moveRight = setInterval(mR,100)
                break;
            case 65:
                // player1 move left
                keydowns.push(65)
                moveLeft = setInterval(mL,100)
                break;
            case 83:
                // player1 move down
                keydowns.push(83)
                moveDown = setInterval(mD, 100);
                break;
            case 87:
                // player1 move up
                keydowns.push(87)
                moveUp = setInterval(mU, 100);
                break;
            default:
                break;
        }
        
    },false);
    window.addEventListener('keyup', (e)=>{
        delete keydowns[keydowns.indexOf(e.keyCode)]
        switch (e.keyCode) {
            case 68:
                // player1 move right
                clearInterval(moveRight);
                break;
            case 65:
                // player1 move left
                clearInterval(moveLeft);
                break;
            case 83:
                // player1 move down
                clearInterval(moveDown);
                break;
            case 87:
                // player1 move up
                clearInterval(moveUp);
                break;
            default:
                break;
        }
        // console.log(e.keyCode)

    })
}
function init(){
    keyInit()
    
    
    const nickname = prompt("Nickname :")
    playerInfo.nickname = nickname
    connect()
    let c = document.getElementById("frame");
    
    
    setInterval(() => {
        
        let context = ()=> c.getContext("2d")
        context().clearRect(0,0,c.width, c.height)
        if (playerInfo.health > 0) {
            for (const i in players) {
                if (players[i].nickname != playerInfo.nickname) {
                    entity(players[i],context)
                }
            }
            for (const i in zombies) {
                entity(zombies[i], context)
            }
            healthbar(playerInfo.health,context)
            entity(playerInfo,context)
            collisionInit(context)
        }else{
            playerInfo.health = 20
            alert("you died")
            window.location.reload()
        }
        if (bulletTrace != {}) {
            trace(context,bulletTrace)
        }
    }, 1);

    c.addEventListener("mousedown", (e)=>{
        bulletTrace = {pX: playerInfo.posX, pY:playerInfo.posY ,mX:e.clientX,mY:e.clientY}
        shoot()
        console.log(playerInfo)
        console.log(e)
    })

    

}
function shoot() {
    
    setTimeout(() => {
        bulletTrace = {}

    }, 500);

}
const socket = io()
function connect(){
    
    socket.on("connect", () => {
        socket.emit("join", playerInfo)
        socket.on("playerInit", (p,id)=>{
            players = p
            players[id].id = id 
            playerInfo.id = id
        })
        console.log("connected")
        socket.on("aPlayerUpdate", (playersInfo)=>{
            playerInfo = playersInfo[playerInfo.id]
            players = playersInfo
            
        })


        
        socket.on("addZombie", (z)=>{
            zombies = z
        })

        
    });
}

function playerUpdate() {
    players[playerInfo.id] = playerInfo
    socket.emit("updatePlayer",playerInfo)
}

init()


function mU() {
    console.log("mU")
    if (keydowns[keydowns.indexOf(87)] == 87) {
        playerInfo.posY -= 2
        playerUpdate()
    }
    
}

function mD() {
    if (keydowns[keydowns.indexOf(83)] == 83) {
        playerInfo.posY += 4
        playerUpdate()
    }else{
        clearInterval(mD);
    }
    
}
    


function mR() {
    if (keydowns[keydowns.indexOf(68)] == 68) {
        playerInfo.posX += 4
        playerUpdate()

    }else{
        clearInterval(mR);
    }
}


function mL() {
    if (keydowns[keydowns.indexOf(65)] == 65) {
        playerInfo.posX -= 4
        playerUpdate()
    }else{
        clearInterval(mL);
    }
}
    
