
export const entity = (p,c)=>{
    const nickname = p.nickname
    const player = c()
    const posX = p.posX
    const posY = p.posY
    const height = p.sizeH
    const width = p.sizeW
    player.beginPath()
    player.fillStyle = p.color
    player.strokeStyle = "black"
    player.fillRect(posX,posY,height,width)
    player.strokeRect(posX,posY,height,width)
    player.closePath()
    
    if (p.colorName != null) {
        const name = c()
        name.beginPath()
        name.fillStyle = p.colorName
        name.font = "30px Arial";
        name.strokeStyle = "black"
        name.strokeText(nickname, posX-(nickname.length*5), posY-5)
        name.fillText(nickname, posX-(nickname.length*5), posY-5);
        
        name.closePath()
        
    }
    
    
}


