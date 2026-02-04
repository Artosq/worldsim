// Zakładając, że Twoje pola mają id w formacie "X_Y"
$(document).on('click', '[id*="_"]', function() {
    // 1. Pobierz współrzędne z ID klikniętego elementu
    const id = $(this).attr('id'); // np. "5_10"
    const coords = id.split('_');
    const x = parseInt(coords[0]);
    const y = parseInt(coords[1]);

    // 2. Znajdź agenta, który jest w tym miejscu
    // Musisz mieć listę wszystkich herbi, np. tablicę herbiList


    let pickedEntity = entityList.find(e => e.positionX == x && e.positionY == y && e.alive && e != picked);
    console.log(pickedEntity)
    if(!pickedEntity)
    pickedEntity = entityList.find(e => e.positionX >= x-1 && e.positionX <= x+1 && e.positionY >= y-1 && e.positionY <= y+1 && e.alive && e != picked);

    //e => e.positionX === x && e.positionY === y && e.alive

    if (pickedEntity) {

        if(picked){
        //$(pola[picked.positionX][picked.positionY]).removeClass("picked");
        removeMarks();
        $('#entityInfoHolo').removeClass('carni');
        $('#entityInfoHolo').removeClass('herbi')
        }
        picked = pickedEntity;
        //$(pola[picked.positionX][picked.positionY]).addClass("picked");
        if(picked.species == "herbi")
        $('#entityInfoHolo').addClass('herbi')
        else
        $('#entityInfoHolo').addClass('carni')
    } else {
        if(picked)
        picked = false
        removeMarks();
    }
});

function refreshPicked(){
    if(picked){
        if(picked.alive){
        document.querySelectorAll('.cell').forEach(el => {el.classList.remove('picked');el.classList.remove('parent');el.classList.remove('child');el.classList.remove('sibling');});
        if(markMode == 'lifePath'){
        lifePath();
        }
        if(markMode == 'sightArea'){
            if(picked.species == 'herbi') sightArea(4)
            else if(picked.species == 'carni') sightArea(6)
        }
        $(pola[picked.positionX][picked.positionY]).addClass("picked");
        if(picked.family.parent){
            if(picked.family.parent.alive)
            $(pola[picked.family.parent.positionX][picked.family.parent.positionY]).addClass("parent");
            else picked.family.parent = false; 
        }

        if(picked.family.children){
        for(let i = 0; i < picked.family.children.length; i++){
            if(picked.family.children[i].alive)
            $(pola[picked.family.children[i].positionX][picked.family.children[i].positionY]).addClass("child");
            else picked.family.children.splice(i,1)
            }
        }

        if(picked.family.siblings){
        for(let i = 0; i < picked.family.siblings.length; i++){
            if(picked.family.siblings[i].alive)
            $(pola[picked.family.siblings[i].positionX][picked.family.siblings[i].positionY]).addClass("sibling");
            else picked.family.siblings.splice(i,1)
            }
        }

        // console.log('Statystyki:');
        // console.log('Głód:', picked.hunger);
        // console.log('Prędkość:', picked.speed);
        // console.log('Pozycja:', picked.positionX, picked.positionY);
        document.getElementById('entityInfoText').innerHTML = "Alive: "+picked.alive
        +"<br> Hunger: "+picked.hunger
        +"pkt. <br> Age: "+countAge()
        +"<br> Speed: "+picked.speed;
    }else{
        if(picked.family.children[0])
        {picked = picked.family.children[0];
        console.log("przeszło na dziecko!");
        }
        else if (picked.family.siblings[0])
        {picked = picked.family.siblings[0];
        console.log("przeszło na rodzeństwo!");
        }
        else if (picked.family.parent)
        {picked = picked.family.parent;
        console.log("przeszło na rodzica!");
        }
        else {picked = false; console.log("przeszło na nikogo :(");};
        removeMarks();
        }
    }   
    requestAnimationFrame(refreshPicked);
}
refreshPicked();

function countAge(){
    let age = Math.floor(counter-picked.born);
    if(age<=365)
    return `${age}d`;
    if(age>365){
    return `${Math.floor(age/365)}y ${age%365}d`;
    }
}

function sightArea(radius){
    if(picked.positionX != pickedOpti.X || picked.positionY != pickedOpti.Y || markMode != pickedOpti.mode){
        pickedOpti.X = picked.positionX;
        pickedOpti.Y = picked.positionY;
        pickedOpti.mode = picked.markMode;
        document.querySelectorAll('.cell').forEach(el => {el.classList.remove('marked')});
        for (let i = picked.positionX-radius; i <= picked.positionX + radius; i++) {
            for (let j = picked.positionY-radius; j <= picked.positionY+radius; j++) {
            if (!pola[i] || !pola[i][j]) continue;
            $(pola[i][j]).addClass("marked");
            }
        }
    }
}

function lifePath(){
    if(picked.positionX != pickedOpti.X || picked.positionY != pickedOpti.Y || markMode != pickedOpti.mode){
        pickedOpti.X = picked.positionX;
        pickedOpti.Y = picked.positionY;
        pickedOpti.mode = picked.markMode;
        document.querySelectorAll('.cell').forEach(el => {el.classList.remove('marked')});
        for(let i = 0; i<picked.path.length-1;i++){
        let cell = picked.path[i];
        $(cell).addClass("marked");
        }
    }
}

function removeMarks(){
    document.querySelectorAll('.cell').forEach(el => {el.classList.remove('marked');el.classList.remove('picked');el.classList.remove('parent');el.classList.remove('child');el.classList.remove('sibling');});
}