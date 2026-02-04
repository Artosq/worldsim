function grassRandomGen(){
    // console.log(Math.floor(100*grassNum/(worldSize.X*worldSize.Y)));
    // console.log("TRAWA "+grassNum)
    if(!pause){
    counter+= 0.3;
    Math.floor(counter)
    if(Math.floor(counter)<=365)
    document.getElementById('counter').innerHTML = Math.floor(counter) + 'd';
    else if(Math.floor(counter)>365){
    document.getElementById('counter').innerHTML = Math.floor(Math.floor(counter)/365) +'y '+ Math.floor(counter)%365+'d';
    }

    //document.getElementById('counter').innerHTML = Math.round(counter);
if(RandomInt(0,Math.floor(5*(grassNum+20)/(worldSize.X*worldSize.Y)))==0)
{
    let spawned = false;
    while (!spawned) {
        
        randomX = RandomInt(0,worldSize.X-1);
        randomY = RandomInt(0,worldSize.Y-1);

            spawn('grass',randomX,randomY)
            spawned = true;
    }
}
}
setTimeout(grassRandomGen,tickSpeed)
}



function grassGrowth() {
    if (!pause) {
        // Iterujemy od końca, aby bezpiecznie usuwać martwą trawę
        for (let i = grassList.length - 1; i >= 0; i--) {
            let currentGrass = grassList[i];

            // 1. Sprawdź czy trawa została zjedzona (flaga w polu DOM)
            if (pola[currentGrass.positionX][currentGrass.positionY].grass === false) {
                currentGrass.alive = false;
            }

            // 2. Usuń martwą trawę z listy
            if (!currentGrass.alive) {
                grassList.splice(i, 1);
                continue; // Przejdź do kolejnej trawy
            }

            // 3. Wzrost
            currentGrass.growth += 2;

            if (currentGrass.growth >= currentGrass.growthSpeed) {
                // Sprawdź wolne sąsiednie pola
                let neighbors = [];
                let x = currentGrass.positionX;
                let y = currentGrass.positionY;

                if (x + 1 < worldSize.X && !pola[x + 1][y].grass) neighbors.push({x: x + 1, y: y});
                if (x - 1 >= 0 && !pola[x - 1][y].grass) neighbors.push({x: x - 1, y: y});
                if (y + 1 < worldSize.Y && !pola[x][y + 1].grass) neighbors.push({x: x, y: y + 1});
                if (y - 1 >= 0 && !pola[x][y - 1].grass) neighbors.push({x: x, y: y - 1});

                if (neighbors.length > 0) {
                    // Losuj jedno z dostępnych wolnych pól
                    let target = neighbors[RandomInt(0, neighbors.length - 1)];
                    spawn('grass', target.x, target.y);
                    currentGrass.growth = 0; // Reset wzrostu
                } else {
                    // Jeśli nie ma miejsca, opcjonalnie zablokuj wzrost lub zabij trawę
                    // currentGrass.alive = false; 
                }
            }
        }
    }
    setTimeout(grassGrowth, tickSpeed);
}
grassGrowth();