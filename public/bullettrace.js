export const trace = (c,bulletTraces)=>{
    const bullet = c()
    bullet.beginPath()
       
    bullet.moveTo(bulletTraces.pX, bulletTraces.pY);
    bullet.lineTo(bulletTraces.mX, bulletTraces.mY);
    bullet.strokeStyle = "yellow"
    bullet.stroke()
    
    bullet.closePath()
}