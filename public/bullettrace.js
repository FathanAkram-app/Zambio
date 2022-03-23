export const trace = (c,bulletTraces)=>{
    const bullet = c()
    bullet.beginPath()
       
    bullet.moveTo(bulletTraces.pX, bulletTraces.pY);
    bullet.lineTo((bulletTraces.mX*2)-8, (bulletTraces.mY*2)-14);
    bullet.strokeStyle = "yellow"
    bullet.stroke()
    
    bullet.closePath()
}