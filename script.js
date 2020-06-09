let main = document.querySelector('.main');
let score = 0;
let level = 0;
let gamespeed = 400;
let playfield = [
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
   [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
];
let figures = {
    o : [
        [1 , 1],
        [1 , 1],
    ],
    i : [
        [0 , 1 , 0 , 0 , 0],
        [0 , 1 , 0 , 0 , 0],
        [0 , 1 , 0 , 0 , 0],
        [0 , 1 , 0 , 0 , 0],
    ],
    s : [
       [0 , 1 , 1],
       [1 , 1 , 0],
       [0 , 0 , 0], 
    ],
    z : [
       [1 , 1 , 0],
       [0 , 1 , 1],
       [0 , 0 , 0], 
    ],
    l : [
       [1 , 0 , 0],
       [1 , 1 , 1],
       [0 , 0 , 0],  
    ],
    j : [
       [0 , 0 , 1],
       [1 , 1 , 1],
       [0 , 0 , 0],
    ],
    t : [
       [1 , 1 , 1],
       [0 , 1 , 0],
       [0 , 0 , 0],  
    ]

}
let activeTetro = {
    j : 4,
    i : 0,
    shape: getNewTetro()
};
 


function draw (){
    let mainInnerHtml = '';
    for(let i = 0 ;i < playfield.length;i++){
        for(let j = 0 ; j <playfield[i].length;j++){
            if(playfield[i][j] === 1){
            mainInnerHtml += '<div class ="cell movingCell"></div>'
        }else if(playfield[i][j] === 2){
            mainInnerHtml += '<div class ="cell fixedCell"></div>'
        }
        else {
            mainInnerHtml += '<div class ="cell"></div>'
        }
      }
    }
    main.innerHTML = mainInnerHtml
}

function removePrevposition(){
    for (let i = 0; i < playfield.length; i++) {
        for (let j = 0; j < playfield[i].length; j++){
            if(playfield[i][j] === 1){
                playfield[i][j] = 0
            }
        }
    }
}
function getNewTetro(){
    const posibleFigures = 'ijloszt'
    const rand = Math.floor(Math.random()* 7)
    return figures[posibleFigures[rand]]
}

function addActiveTetro (){
    removePrevposition()
   for (let i = 0; i < activeTetro.shape.length; i++) {
     for (let j = 0; j < activeTetro.shape[i].length; j++) {
        if(activeTetro.shape[i][j]){
            playfield[activeTetro.i + i][activeTetro.j + j] = activeTetro.shape[i][j]
            activeTetro.shape[i][j]
         
     }
      
   }
  }
}

function hasCollisions (){
   for (let i = 0; i < activeTetro.shape.length; i++) {
       for (let j = 0; j < activeTetro.shape[i].length; j++) {
           if(activeTetro.shape[i][j] === 1 && 
            (playfield[activeTetro.i + i] === undefined ||
            playfield[activeTetro.i +i][activeTetro.j +j] === undefined ||
            playfield[activeTetro.i +i][activeTetro.j +j] === 2)){
               return true 
           }
        }
   }
  return false
}
 function rotateTetro(){
     const prevTetroPos = activeTetro.shape;
     activeTetro.shape = activeTetro.shape[0].map((el,i) => activeTetro.shape.map((e) => e[i]).reverse());
     if(hasCollisions()){
         activeTetro.shape = prevTetroPos;
     }
 }





function removeFullLine(){
    let canRemove = true
    for(let i = 0 ;i < playfield.length;i++){
        for(let j = 0 ; j <playfield[i].length;j++){
            if(playfield[i][j] !== 2){
              canRemove = false
              break;
            }
        }
        if(canRemove){
            playfield.splice(i , 1)
            playfield.splice(0 ,0, [0,0,0,0,0,0,0,0,0,0])
            score += 10;
            document.getElementById('score').innerText = score
            if(score === 50 || score === 100){
                gamespeed -= 100
                level +=1
                document.getElementById('level').innerText = level 
            }
        }
        canRemove = true;
    }
}

function fixTetro(){
    for(let i = 0 ;i < playfield.length;i++){
        for(let j = 0 ; j <playfield[i].length;j++){
          if(playfield[i][j] === 1){
            playfield[i][j] = 2   
          }
        }
    }
    removeFullLine()
    
}
function moveDown(){
    activeTetro.i += 1
    if(hasCollisions()){
    activeTetro.i -= 1
    fixTetro();
    activeTetro.shape = getNewTetro();
    activeTetro.j = Math.floor((10 - activeTetro.shape[0].length)/2)
    activeTetro.i = 0
    }

    }


document.onkeydown = function(e){
   if(e.keyCode === 37){
    activeTetro.j -=1
    if(hasCollisions()){
        activeTetro.j += 1
        }
   }else if(e.keyCode === 39){
    activeTetro.j +=1
    if(hasCollisions()){
        activeTetro.j -= 1
        }
   }else if(e.keyCode === 40){
    moveDown()
   }else if(e.keyCode === 38){
       rotateTetro()
   }
   addActiveTetro();
   draw()
   

}
addActiveTetro();
draw();
function startGame(){
    moveDown()
    addActiveTetro();
    draw();
    setTimeout(startGame,gamespeed)
    reset ()
}
setTimeout(startGame,gamespeed);

function reset (){
    if(playfield[1][4] === 2 || playfield[1][3] === 2 || playfield[1][5] === 2 ){
        alert('game over')
           if(confirm('Do you want to play again')){
               playfield = [
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
                [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ],
             ];
          }
        }
        
    
}