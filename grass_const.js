function grassConst(positionX, positionY, growth, growthSpeed) {
  this.positionX = positionX;
  this.positionY = positionY;
  this.growth = growth;
  this.growthSpeed = growthSpeed;
  this.alive = true; // Flaga kontrolna
  this.species = "grass";
  //this.id = grass.length -1;
// Kod wykona się tylko wtedy, gdy pole faktycznie istnieje w pamięci

//   this.growing = () => {
//     if(!pause){
//   // Sprawdzenie czy pole obiektu w ogóle istnieje w tablicy
// if (!pola[this.positionX] || !pola[this.positionX][this.positionY]) {
//     this.alive = false;
//     pola[this.positionX][this.positionY].grass = false;
//     return;
// }

// // Sprawdź, czy flaga grass na polu nie została skasowana przez coś innego
// if (pola[this.positionX][this.positionY].grass === false) {
//     this.alive = false;
// }

//   this.growth = this.growth + 2;

//   if (this.growth >= this.growthSpeed) {
//     // 2. Sprawdź, czy w ogóle jest jakiekolwiek wolne miejsce obok (ściana lub inna trawa)
//     let canGrow = false;
//     if (this.positionX + 1 < worldSize.X && !pola[this.positionX + 1][this.positionY].grass) canGrow = true;
//     else if (this.positionX - 1 >= 0 && !pola[this.positionX - 1][this.positionY].grass) canGrow = true;
//     else if (this.positionY + 1 < worldSize.Y && !pola[this.positionX][this.positionY + 1].grass) canGrow = true;
//     else if (this.positionY - 1 >= 0 && !pola[this.positionX][this.positionY - 1].grass) canGrow = true;

//     if (!canGrow) {
//       // Brak wolnych pól wokół - zatrzymaj rośnięcie tego obiektu na stałe
//       this.alive = false;
//       return; 
//     }

//     // 3. Skoro wiemy, że jest wolne miejsce, losuj do skutku
//     let spawned = false;
    
//     while (!spawned) {
//       let random = RandomInt(1, 4);

//       if (random == 1 && this.positionX < worldSize.X-1 && !pola[this.positionX + 1][this.positionY].grass) {
//         spawn('grass', this.positionX + 1, this.positionY);
//         spawned = true;
//       } 
//       else if (random == 2 && this.positionX > 0 && !pola[this.positionX - 1][this.positionY].grass) {
//         spawn('grass', this.positionX - 1, this.positionY);
//         spawned = true;
//       } 
//       else if (random == 3 && this.positionY < worldSize.Y-1 && !pola[this.positionX][this.positionY + 1].grass) {
//         spawn('grass', this.positionX, this.positionY + 1);
//         spawned = true;
//       } 
//       else if (random == 4 && this.positionY > 0 && !pola[this.positionX][this.positionY - 1].grass) {
//         spawn('grass', this.positionX, this.positionY - 1);
//         spawned = true;
//       }
//     }

//     this.growth = 0;
//   }
// }
//   // 4. Kolejny krok pętli tylko jeśli trawa nadal żyje (ma klasę i ma miejsce)
//   if (this.alive) {
//     setTimeout(this.growing, tickSpeed);
//   }
// }
}