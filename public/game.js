
import {entity} from "./entities.js"
import { healthbar } from "./healthbar.js"
import {collisionInit} from "./world.js"
var playerInfo = {id:"", posX: Math.random() * 1000, posY: Math.random()*540, sizeH: 20, sizeW: 20, nickname: null,color:"red",colorName:"white",health:20}
var players = {}
var zombies = []
function init(){
    
    window.addEventListener('keydown',e =>{
        switch (e.keyCode) {
            
            case 68:
                // player1 move right
                playerInfo.posX += 10
                playerUpdate()
                break;
            case 65:
                // player1 move left
                playerInfo.posX -= 10
                playerUpdate()
                break;
            case 83:
                // player1 move down
                playerInfo.posY += 10
                playerUpdate()
                
                break;
            case 87:
                // player1 move up
                playerInfo.posY -= 10
                playerUpdate()
                break;
            default:
                break;
        }
    },false);
    const nickname = prompt("Nickname :")
    playerInfo.nickname = nickname
    connect()
    
    
    setInterval(() => {
        let c = document.getElementById("frame");
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
        
        
        
        
    }, 1);

    
    

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