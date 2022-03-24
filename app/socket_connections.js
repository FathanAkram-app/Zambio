
var players = {}
var zombies = []



module.exports = {
    initSocketConnection : io =>{
        setInterval(() => {
            if (zombies.length < 10) {
                const posX = Math.random() * 1920
                const posY = Math.random() * 1080
                zombies.push({posX: posX, posY: posY, sizeH: 10, sizeW: 10, nickname: "zombie" ,color:"blue",colorName:null,health:10})
                io.local.emit("addZombie",zombies)
                console.log("zombie +1")
            }
            for (const i in zombies) {
                const ranges = []
                const pos = []
                
                

                for (const inn in players) {
                    const xRange = Math.abs(players[inn].posX - zombies[i].posX)
                    const yRange = Math.abs(players[inn].posY - zombies[i].posY)
                    ranges.push(xRange+yRange)
                    pos.push({x:players[inn].posX, y:players[inn].posY, player: players[inn]})
                    
                }
                const posP = pos[ranges.indexOf(Math.min(...ranges))]
                if (posP) {
                    const range = Math.abs(zombies[i].posX - posP.x)+Math.abs(zombies[i].posY - posP.y)
                    if (range<350) {
                        if (range<20) {
                            // console.log(players[posP.player.id])
                            // console.log(posP.player)
                            players[posP.player.id].health -= 1
                            io.local.emit("aPlayerUpdate", players)
                            
                        }
                        
                        if (zombies[i].posX > posP.x) {
                            zombies[i] = {...zombies[i], posX:zombies[i].posX - 2.5}
                        }else if (zombies[i].posX < posP.x) {
                            zombies[i] = {...zombies[i], posX:zombies[i].posX + 2.5}
                        }
                        if (zombies[i].posY > posP.y) {
                            zombies[i] = {...zombies[i], posY:zombies[i].posY - 2.5}
                        }else if (zombies[i].posY < posP.y) {
                            zombies[i] = {...zombies[i], posY:zombies[i].posY + 2.5}
                        }
                    }
                    
                }
                
                io.local.emit("addZombie",zombies)
                
                
                
            }
            
        }, 100);
        
        
        io.on("connection", socket => {
            console.log("connection")
            socket.on("join", (player)=>{
                players[socket.id] = player
                players[socket.id].id = socket.id
                socket.emit("playerInit", players,socket.id)
            })

            socket.on("disconnect", ()=>{
                
                delete players[socket.id]
                
            })

            socket.on("gunshot", (bulletTrace)=>{ 
                socket.broadcast.emit("gunshot",{...bulletTrace, mX: bulletTrace.mX, mY: bulletTrace.mY})
                
                
            })
            
            socket.on("updatePlayer", (player)=>{
                players[socket.id] = player
                players[socket.id].id = socket.id
                socket.broadcast.emit("aPlayerUpdate",players)
            })
        })
    }
}