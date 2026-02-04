function herbivoresConst(positionX, positionY, hunger, speed, parent) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.alive = true
    this.hunger = hunger;
    this.speed = speed;
    this.parent = parent;
    this.children = [];
    this.born = counter;
    this.species = "herbi";
    this.visitedPaths = [];
    this.path = [];
    this.family = {
        children: [],
        siblings: [],
        parent: parent
    }

    if(this.parent){
    if(parent.family.children){
        let pChildren = parent.family.children;
        for(let i = 0;i<pChildren.length;i++){
            this.family.siblings.push(pChildren[i]);
            pChildren[i].family.siblings.push(this);
        }
    }
    parent.family.children.push(this);
    }

    this.evalueMove = () => {
    let moved = false;
    if(!pause){
        // if(!this.alive){
        //     herbiNum--;
        // }

    const directions = [];
    // Punkty dla kierunków
    directions[0] = { id: 0, val: this.sectionEvalue(this.positionX - 4, this.positionX + 4, this.positionY - 4, this.positionY - 1) }; // góra
    directions[1] = { id: 1, val: this.sectionEvalue(this.positionX - 4, this.positionX + 4, this.positionY + 1, this.positionY + 4) }; // dół
    directions[2] = { id: 2, val: this.sectionEvalue(this.positionX - 4, this.positionX - 1, this.positionY - 4, this.positionY + 4) }; // lewo
    directions[3] = { id: 3, val: this.sectionEvalue(this.positionX + 1, this.positionX + 4, this.positionY - 4, this.positionY + 4) }; // prawo

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
        let isGrassNear = false;

        if(i == 0)
        dirId = evenMoves[RandomInt(i,evenMoves.length-1)]

        if (dirId == 0 && this.positionY > 0) nY--;
        else if (dirId == 1 && this.positionY < worldSize.Y - 1) nY++;
        else if (dirId == 2 && this.positionX > 0) nX--;
        else if (dirId == 3 && this.positionX < worldSize.X - 1) nX++;

        // Sprawdzamy czy pole jest wolne
        if (!pola[nX][nY].herbi) {

            if (this.positionX + 1 < worldSize.X && pola[this.positionX + 1][this.positionY].grass) isGrassNear = true;
            if (this.positionX > 0 && pola[this.positionX - 1][this.positionY].grass) isGrassNear = true;
            if (this.positionY + 1 < worldSize.Y && pola[this.positionX][this.positionY + 1].grass) isGrassNear = true;
            if (this.positionY > 0 && pola[this.positionX][this.positionY - 1].grass) isGrassNear = true;
                
            if((pola[nX][nY].grass)||(!isGrassNear)){
            this.move(nX, nY);
            moved = true;
            break; // Wykonano ruch, wychodzimy z pętli
            }
        }
        //console.log('isGrassNear: '+ isGrassNear)
    }

        if (this.positionX + 1 < worldSize.X && pola[this.positionX + 1][this.positionY].carni) this.die();
        if (this.positionX > 0 && pola[this.positionX - 1][this.positionY].carni) this.die();
        if (this.positionY + 1 < worldSize.Y && pola[this.positionX][this.positionY + 1].carni) this.die();
        if (this.positionY > 0 && pola[this.positionX][this.positionY - 1].carni) this.die();

        if(this.hunger<1)
        this.die();
}
    // Jeśli wszystkie 4 kierunki są zablokowane przez inne herbi, czekaj
    if (!moved) {
      if(this.alive){
        if(!pause){
        setTimeout(this.evalueMove, tickSpeed);
        this.hunger -= 20; //głodnieje
        }
        else
        setTimeout(this.evalueMove, RandomInt(1,tickSpeed));

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
            if(this.hunger > 50){
                
              // STADNOŚĆ: Agent lubi być blisko innych (punkty dodatnie)
            if (cell.herbi) score += 5;
            if (cell.grass) score -= 5; 
            } else{


             if (cell.herbi) score -= 10;
             // PRZETRWANIE: Trawa jest ważniejsza niż grupa (wyższa waga)
            if (cell.grass) score += 100; 
            score -= 1;
            }

            // PRZETRWANIE: Trawa jest ważniejsza niż grupa (wyższa waga)
            if (cell.grass) score += 5; 
            
            // ZAGROŻENIE
            if (cell.carni) score -= 200;

            if (cell.corpse) score -= 50;
        }
    }
    return score;
}

    this.move = (X, Y) => {
      if(this.alive){
        $(pola[this.positionX][this.positionY]).removeClass("herbi");
        //$(pola[this.positionX][this.positionY]).removeClass("picked");
        pola[this.positionX][this.positionY].herbi = false;
        
        // if(this === picked)
        // $(pola[picked.positionX][picked.positionY]).addClass("markedPath");
    
        this.visitedPaths.push({X: this.positionX, Y: this.positionY})

        if(this.visitedPaths.length > 4)
        this.visitedPaths.splice(0,1);

        this.positionX = X;
        this.positionY = Y;
        $(pola[this.positionX][this.positionY]).addClass("herbi");
        pola[this.positionX][this.positionY].herbi = true;
        this.path.push(pola[this.positionX][this.positionY])

        if ((pola[this.positionX][this.positionY].grass)&&(this.hunger<80)) {
            $(pola[this.positionX][this.positionY]).removeClass("grass");
            pola[this.positionX][this.positionY].grass = false;
            this.hunger += 20; //je
            grassNum--;
            if(this.hunger>100)
            this.hunger = 100;

            if((counter-this.born)>50)
            if(this.hunger>95){
                if(RandomInt(0,10)>7){
                spawn('herbi',Math.min(Math.max(this.positionX+RandomInt(-1,1),0),worldSize.X-1),Math.min(Math.max(this.positionY+RandomInt(-1,1),0),worldSize.Y-1), this);
                this.hunger -= 40;
                } else {
                    this.hunger -= 5;
                }
            }
        }
        this.hunger -= 1; //głodnieje

        if(this.alive)
        setTimeout(this.evalueMove, tickSpeed*(2-(this.hunger/60))*(speed/100));
    }
  }
  this.die = () => {
    this.alive = false;
    $(pola[this.positionX][this.positionY]).removeClass('herbi');
    pola[this.positionX][this.positionY].herbi = false;
    entityList = entityList.filter(h => h !== this); // USUWASZ Z LISTY
    if((RandomInt(0,100)>99)&&(this.hunger<1)) spawn('carni',this.positionX,this.positionY)
    else spawn('corpse',this.positionX,this.positionY)
  }
}