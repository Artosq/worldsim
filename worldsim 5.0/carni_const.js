function carnivoresConst(positionX, positionY, hunger, speed, parent) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.alive = true
    this.hunger = hunger;
    this.speed = speed;
    this.parent = parent
    this.children = [];
    this.born = counter;
    this.species = "carni";
    this.visitedPaths = [];
    this.path = [];
    this.family = {
        children: [],
        siblings: [],
        parent: parent
    }

    if(this.parent){
    if(this.parent.family.children){
        let pChildren = this.parent.family.children;
        for(let i = 0;i<pChildren.length;i++){
            pChildren[i].family.siblings.push(this);
        }
    }
    parent.family.children.push(this);
    }

    this.evalueMove = () => {
    let moved = false;
   if(!pause){
    const directions = [];
    // Punkty dla kierunków
    directions[0] = { id: 0, val: this.sectionEvalue(this.positionX - 6, this.positionX + 6, this.positionY - 6, this.positionY - 1) }; // góra
    directions[1] = { id: 1, val: this.sectionEvalue(this.positionX - 6, this.positionX + 6, this.positionY + 1, this.positionY + 6) }; // dół
    directions[2] = { id: 2, val: this.sectionEvalue(this.positionX - 6, this.positionX - 1, this.positionY - 6, this.positionY + 6) }; // lewo
    directions[3] = { id: 3, val: this.sectionEvalue(this.positionX + 1, this.positionX + 6, this.positionY - 6, this.positionY + 6) }; // prawo

    // Sortujemy kierunki od najlepszego do najgorszego
    directions.sort((a, b) => b.val - a.val);

    let evenMoves = [];
        for(let even = 0; even < 4; even++){
            if(directions[even].val == directions[0].val){
                evenMoves.push(directions[even].id)
            }
        }

    // Próbujemy wykonać ruch w najlepszym możliwym kierunku, który nie jest zablokowany
    for (let i = 0; i < directions.length; i++) {
        let dirId = directions[i].id;
        let nX = this.positionX;
        let nY = this.positionY;
        let isPrayNear = false;

        if(i < evenMoves.length)
        dirId = evenMoves[RandomInt(i,evenMoves.length-1)]

        if (dirId == 0 && this.positionY > 0) nY--;
        else if (dirId == 1 && this.positionY < worldSize.Y - 1) nY++;
        else if (dirId == 2 && this.positionX > 0) nX--;
        else if (dirId == 3 && this.positionX < worldSize.X - 1) nX++;

        // Sprawdzamy czy pole jest wolne
        if (!pola[nX][nY].carni) {
            this.move(nX, nY);
            moved = true;
            break; // Wykonano ruch, wychodzimy z pętli
            
        }
    }
}
    // Jeśli wszystkie 4 kierunki są zablokowane przez inne herbi, czekaj
    if (!moved) {
      if(this.alive==true){
        if(!pause)
        setTimeout(this.evalueMove, tickSpeed);
        else
        setTimeout(this.evalueMove, RandomInt(1,tickSpeed));
        if(!pause)
        this.hunger -= 3; //głodnieje
      }
    }
}

this.sectionEvalue = (Sx, Fx, Sy, Fy) => {
    let score = 0;
    let startX = Math.max(0, Sx);
    let endX = Math.min(worldSize.X - 1, Fx);
    let startY = Math.max(0, Sy);
    let endY = Math.min(worldSize.Y - 1, Fy);

    for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
            if (!pola[i] || !pola[i][j]) continue;
            let cell = pola[i][j];

            for(let path = 0; path < this.visitedPaths.length; path++){
                if((i == this.visitedPaths[path].X) && (j == this.visitedPaths[path].Y)){
                    score -= 10;
                }
            }

            if(this.hunger > 100){
              // STADNOŚĆ: Agent lubi być blisko innych (punkty dodatnie)
            if (cell.grass) score += 2; 

            } else{
             if (cell.herbi) score += 100;
             if (cell.corpse) score += 400;
             // PRZETRWANIE: Trawa jest ważniejsza niż grupa (wyższa waga)
            if (cell.carni) score -= 5; 
            if (cell.grass) score += 1; 
            //score -= 1;
            }
            if (cell.herbi) score += 3;
            if (cell.corpse) score += 10;
            // PRZETRWANIE: Trawa jest ważniejsza niż grupa (wyższa waga)
            // ZAGROŻENIE
            if (cell.carni) score -= 5;
        }
    }
    return score;
}

    this.move = (X, Y) => {
      if(this.alive == true){
        $(pola[this.positionX][this.positionY]).removeClass("carni");
        $(pola[this.positionX][this.positionY]).removeClass("picked");
        pola[this.positionX][this.positionY].carni = false;

        // if(this === picked)
        // $(pola[picked.positionX][picked.positionY]).addClass("markedPath");
    
        this.visitedPaths.push({X: this.positionX, Y: this.positionY})

        if(this.visitedPaths.length > 4)
        this.visitedPaths.splice(0,1);

        this.positionX = X;
        this.positionY = Y;
        $(pola[this.positionX][this.positionY]).addClass("carni");
        pola[this.positionX][this.positionY].carni = true;
        this.path.push(pola[this.positionX][this.positionY])

        if ((pola[this.positionX][this.positionY].corpse)&&(this.hunger<100)) {
            $(pola[this.positionX][this.positionY]).removeClass("corpse");
            pola[this.positionX][this.positionY].corpse = false;
            
            this.hunger += 80; //je
            corpseNum--;

                if(RandomInt(0,20)>17){
                spawn('carni',Math.min(Math.max(this.positionX+RandomInt(-1,1),0),worldSize.X-1),Math.min(Math.max(this.positionY+RandomInt(-1,1),0),worldSize.Y-1), this)
                this.hunger -= 50;
                }

            if(this.hunger>150)
            this.hunger = 150;
        }
        this.hunger -= 1; //głodnieje

        if(this.hunger<1){
    this.alive = false;
    carniNum--;
    $(pola[this.positionX][this.positionY]).removeClass('carni')
    pola[this.positionX][this.positionY].carni = false;
    setTimeout(() => {
        spawn('grass',this.positionX,this.positionY);

        setTimeout(() => {
        spawn('grass',this.positionX+RandomInt(-1,1),this.positionY-1);
        spawn('grass',this.positionX+RandomInt(-1,1),this.positionY+1);
        },tickSpeed*RandomInt(1,2));

        setTimeout(() => {
        spawn('grass',this.positionX+1,this.positionY+RandomInt(-1,1));
        spawn('grass',this.positionX-1,this.positionY+RandomInt(-1,1));
        },tickSpeed*RandomInt(1,3));

    },tickSpeed*RandomInt(2,3));
    }

        if(this.alive == true)
        setTimeout(this.evalueMove, (tickSpeed*this.speed/100));
    }
  }
}