export const healthbar = (v,c)=>{
    const healthbarContext = c()
    healthbarContext.beginPath()
    healthbarContext.fillStyle = "red"
    healthbarContext.fillRect(10,10,20,v*10)
    healthbarContext.strokeRect(10,10,20,200)
    healthbarContext.closePath()
}