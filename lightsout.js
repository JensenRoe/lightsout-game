import Timer from './timer.js'

const height = 5;
const width = 5;
const restartBtn = document.querySelector( '#restart-game-button' ); //button to restart game
const lightsOutBoard = document.querySelector( '#lightsout-board'); //lightsoutboard
const timerDisplay = document.querySelector( '#timer' ) //timer above game
var timer = new Timer()

//sets the grid and style attributes for row and col, making them into a grid shape
function setupGrid () {
  const squares = document.querySelectorAll( '.lightsout-square' );
  for (let i = 0; i < squares.length; i++) {
    const row = Math.floor( i / height ) + 1;
    const col = i % height + 1;
    squares[i].style.gridRowStart = row;
    squares[i].style.gridColumnStart = col;
    squares[i].addEventListener( 'click' , function(){ toggleSquareClick( row , col ); });
  }
  restartBtn.addEventListener( 'click', restartBtnClick );
  lightsOutBoard.addEventListener( 'click' , startGameTimer );

}
//sets up the board for a game of lights out, chooses a random # of squares to begin lit
function setupGame ()
{
  var ranTotalToggled = Math.floor(Math.random() * 10) + 1;
  console.log(ranTotalToggled)
  for(var index = 0 ; index < ranTotalToggled ; index++)
  {
    var ranRow = Math.floor(Math.random() * 5) + 1;
    var ranCol = Math.floor(Math.random() * 5) + 1;
    console.log(ranRow + "row")
    console.log(ranCol + "col")
    toggleSquare( ranRow , ranCol );
  }
}
//gets square and returns it
function getSquare ( row, col ) {
  var squareToReturn = document.querySelector(".lightsout-square" +
                                `[style*="grid-row-start: ${row}"]` +
                                `[style*="grid-column-start: ${col}"]`);
  return squareToReturn
}
//places adjacent squares in array minus null off board squares
function getAdjacentSquares ( row, col ) {
  return [
    getSquare( row , col ),
    getSquare( row-1 , col ),
    getSquare( row+1 , col ),
    getSquare( row , col-1 ),
    getSquare( row , col+1 )
  ].filter( ( sqr ) => sqr !== null );
}

function toggleSquare ( row , col ) 
{
  var square = getSquare( row , col )
  square.classList.toggle( 'js-lightsout-square-on' );
}
//toggles all squares adjacent to clicked square, also checks for win condition after click
function toggleSquareClick ( row , col )
{
  var squareList = getAdjacentSquares( row , col )
  for(var index = 0 ; index < squareList.length ; index++)
  {
    squareList[index].classList.toggle( 'js-lightsout-square-on' );
  }
  var toggledSquares = document.querySelectorAll( ".js-lightsout-square-on" )
  //if win condition is met
  if (toggledSquares.length == 0)
  {
    var elapsedTime = timer.getElapsedTime()
    var elapsedTimeString = ""+elapsedTime[0]+" minutes "+elapsedTime[1]+" seconds."
    alert( "You win after: " + elapsedTimeString )
    restartBtnClick()
  }
}

function restartBtnClick ( event )
{
  var squaresToReset = document.querySelectorAll( ".js-lightsout-square-on");
  for(var index = 0 ; index < squaresToReset.length ; index++ )
  {
    squaresToReset[index].classList.toggle( 'js-lightsout-square-on' )
  }
  setupGame()
  timer.reset()
}

function startGameTimer( event )
{
  timer.start()
  var timerUpdate = setInterval(updateTimerDisplay,1000) //updating clock every second
}

function updateTimerDisplay()
{
  var elapsedTime = timer.getElapsedTime()
  var elapsedTimeString = ""+elapsedTime[0]+"  min  "+elapsedTime[1]+"  sec"
  console.log(elapsedTimeString)
  timerDisplay.innerHTML = elapsedTimeString
}

setupGrid();
setupGame();