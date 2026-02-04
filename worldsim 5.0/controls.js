    $('#chart').hide();
    $('.guiBottom').hide();
    $('#counter').hide();


      $(document).on('keydown', function(event) {
    if (event.key.toLowerCase() === 'e') {
      $('#entityInfo').toggle("normal");
      if(gui) gui = false
      else gui = true
    } else if (event.key.toLowerCase() === 'q') {
      $('#chart').toggle("normal");
    }else if(event.key.toLowerCase()=== 'w'){
      $('#controls').toggle("normal");
      $('#counter').toggle("normal");
    }else if(event.key.toLowerCase()=== 'r'){
      if(markMode == 'sightArea') markMode = 'lifePath'
      else markMode = 'sightArea'
    }else if(event.key === ' '){
      pauseGame();
    }else if(event.keyCode == 37||event.key.toLowerCase() == 'a'){
      slowTick();
    }else if(event.keyCode == 39||event.key.toLowerCase() == 'd'){
      fastTick();
    }
});


$('#slow').click(slowTick)

$('#fast').click(fastTick)

$('#pause').click(pauseGame)

function slowTick(){
  if(tickSpeed<=1500){
    if( tickSpeed == 10) tickSpeed = 80;
    else if(tickSpeed==80) tickSpeed = 150;
    else if(tickSpeed==150) tickSpeed = 300;
    else if(tickSpeed==300) tickSpeed = 900;
    else if(tickSpeed==900) tickSpeed = 1500;
    else if(tickSpeed==900) tickSpeed = 1500;
  }
}
function fastTick(){
  if(tickSpeed>=60){
    if(tickSpeed==1500) tickSpeed = 900;
    else if(tickSpeed==900) tickSpeed = 300;
    else if(tickSpeed==300) tickSpeed = 150;
    else if(tickSpeed==150) tickSpeed = 80;
    else if(tickSpeed==80) tickSpeed = 10;
}
}
function pauseGame(){
  if(pause==true) pause = false
  else pause = true
}