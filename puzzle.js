var rows = 3;
var columns = 3;

var curTile; // tile to be moved
var otherTile; // tile with which target tile will swap with
// otherTile - 08.jpg

var turns = 0;

var imgOrder = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

//var imgOrder = ["3", "1", "7", "4", "0", "5", "6", "8", "2"];

window.onload = function() { // loads tiles when page loads
  alert("Welcome to the Pokemon Slide Puzzle.\nNote: Only the bottom-right tile can be swapped with any of it's adjacent tiles.");
  for (let r=0; r<rows; r++) {
    for (let c=0; c<columns; c++) {
      
      // <img id="1-1">
      let tile = document.createElement("img");
      tile.id = r.toString() + "-" + c.toString(); // gives location of tile on board
      tile.src = imgOrder.shift() + ".jpg";  // assigns image source from array, removes it from array

      // DRAG FUNCITONS
      tile.addEventListener("dragstart", dragStart); //click a tile to drag
      tile.addEventListener("dragover", dragOver);   //moving tile around while clicked
      tile.addEventListener("dragenter", dragEnter); //dragging tile onto another one
      tile.addEventListener("dragleave", dragLeave); //dragged tile leaving potential position
      tile.addEventListener("drop", dragDrop);       //drag tile over another and drop i.e release click
      tile.addEventListener("dragend", dragEnd);     //swapping 2 tiles

      document.getElementById("board").append(tile); //adds tiles in board in html

    }
  }
}

function dragStart() {
  curTile = this; //"this" refers to tile being dragged
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {
  
}

function dragDrop() {
  otherTile = this; //"this" refers to tile being dropped on
}

function dragEnd() {

  // IF NOT BLANK TILE DON'T SWAP
  if (!otherTile.src.includes("8.jpg")) {
    return;
  }

  // TO GET COORDINATES OF TILES
  let curCoordinates = curTile.id.split("-"); //"0-0" -> ["0", "0"]
  let r = parseInt(curCoordinates[0]); //row number of current tile
  let c = parseInt(curCoordinates[1]);

  let otherCoordinates = otherTile.id.split("-");
  let r2 = parseInt(otherCoordinates[0]);
  let c2 = parseInt(otherCoordinates[1]);

  // TO CHECK FOR ADJACENCY WITH BLANK TILE
  let moveLeft = (r == r2) && (c2 == c-1); // same row to the left
  let moveRight = (r == r2) && (c2 == c+1); // same row to the right
  let moveUp = (c == c2) && (r2 == r-1); // same column & above
  let moveDown = (c == c2) && (r2 == r+1); // same column & bottom

  let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

  // SWAPPING ACTION
  if (isAdjacent) {
    let curImg = curTile.src;
    let otherImg = otherTile.src;

    curTile.src = otherImg;
    otherTile.src = curImg;

    turns = turns + 1;
    document.getElementById("turns").innerText = turns;
  }
}
