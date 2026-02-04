        let tickSpeed = 300;
        let counter = 0;

        let pause = false;
        let gui = false;
        let picked = false;
        let markMode = 'lifePath';
        
        let cellSize = Math.floor(window.innerWidth/100);
        let worldSize = {
            X : Math.floor(window.innerWidth/cellSize)-2,
            Y : Math.floor((window.innerHeight)/cellSize)-1
        };

        let herbivoreCount = 30;
        let carnivoreCount = 0; 
        let grassCount = 200;

        let entityList = [];
        const grassList = [];
        const pola = [];
        
        let grassNum = 0;
        let corpseNum = 0;
        let carniNum = 0;
        let herbiNum = 0;

        const pickedOpti = {
            X: 0,
            Y: 0,
            mode: ""
        }
        
    function worldGen(x,y){
    document.write("<div class = 'container' id='container'>");
    for(let i = 0; i < y; i++){
        for(let z = 0; z < x; z++){
        //$("<div class = 'cell' id='"+z+"_"+i+"'></div>").append($('body'));
        document.write("<div class='cell' id='"+z+"_"+i+"'></div>");
        document.getElementById(z+"_"+i).style.width = cellSize + "px";
        document.getElementById(z+"_"+i).style.height = cellSize + "px";
    }
    }
  }
  worldGen(worldSize.X,worldSize.Y);

    function cellAssign(x,y){
    for(let i = 0; i < x; i++){
        pola[i] = [];
        for(let z = 0; z < y; z++){
        pola[i][z] = document.getElementById(i+'_'+z);
        pola[i][z].grass = false;
        pola[i][z].corpse = false;
        pola[i][z].herbi = false;
        pola[i][z].carni = false;
    }
    }
  }
  cellAssign(worldSize.X,worldSize.Y);

    document.getElementById('container').style.width = (worldSize.X * (cellSize))+"px";