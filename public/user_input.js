import { playerMoveDown, playerMoveUp } from "./player.js";

export function keyInputInit(playerInfo) {
    window.addEventListener('keydown',e =>{
        console.log(e.keyCode)
        switch (e.keyCode) {
            
            case 68:
                // player1 move right
                break;
            case 65:
                // player1 move left
                break;
            case 83:
                // player1 move down
                playerInfo.posY += 5
                
                break;
            case 87:
                // player1 move up
                playerInfo.posY -= 5
                break;
            default:
                break;
        }
    },false);

}