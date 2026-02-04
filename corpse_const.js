function corpseConst(positionX, positionY, decay) {
  this.positionX = positionX;
  this.positionY = positionY;
  this.decay = decay;
  this.decaying = () => {
    if(!pause){
    decay--;
  if(decay<=0){
    corpseNum--;
    $(pola[this.positionX][this.positionY]).removeClass('corpse')
    pola[this.positionX][this.positionY].corpse = false;
    
    setTimeout(() => {
        spawn('grass',this.positionX,this.positionY);

        setTimeout(() => {
        spawn('grass',this.positionX+RandomInt(-1,1),this.positionY-1);
        spawn('grass',this.positionX+RandomInt(-1,1),this.positionY+1);
        },tickSpeed*2);

        setTimeout(() => {
        spawn('grass',this.positionX+1,this.positionY+RandomInt(-1,1));
        spawn('grass',this.positionX-1,this.positionY+RandomInt(-1,1));
    },tickSpeed*3);
  },tickSpeed);
}
    }
if(decay>0)
setTimeout(this.decaying,tickSpeed)
}
}