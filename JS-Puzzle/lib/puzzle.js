// Select all the tiles
const tiles = document.querySelectorAll('td');

// Check if a tile has an empty neighbour
const canMove = (tile) => {
  const tileColumn = tile.cellIndex;
  const tileRow = tile.parentElement.rowIndex;
  const emptyTile = document.querySelector('.empty');
  const emptyTileColumn = emptyTile.cellIndex;
  const emptyTileRow = emptyTile.parentElement.rowIndex;

  return (tileColumn === emptyTileColumn && tileRow === emptyTileRow + 1) ||
    (tileColumn === emptyTileColumn && tileRow === emptyTileRow - 1) ||
    (tileRow === emptyTileRow && tileColumn === emptyTileColumn + 1) ||
    (tileRow === emptyTileRow && tileColumn === emptyTileColumn - 1);
};

// Move the tile
const moveTile = (element) => {
  // Select the empty place
  const emptyTile = document.querySelector('.empty');
  emptyTile.innerHTML = element.innerHTML;
  emptyTile.classList.remove('empty');
  element.innerHTML = '';
  element.classList.add('empty');
};

// Check if the player wins
const checkIfPlayerWins = () => {
  const currentTiles = document.querySelectorAll('td');
  const tilesArray = Array.from(currentTiles);
  const tilesValues = tilesArray.map((tile) => Number.parseInt(tile.innerHTML, 10))
                                .filter((value) => !Number.isNaN(value));
  const tilesValuesAsString = tilesValues.join(',');
  // if sorted in ascending order, the player wins
  const winningValues = tilesValues.sort((a, b) => a - b);
  const winningValuesAsString = winningValues.join(',');
  if (tilesValuesAsString === winningValuesAsString) {
    alert('You won!');
  }
}

// Add event listener on each tile
tiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    if (canMove(tile)) {
      moveTile(tile);
      checkIfPlayerWins();
    }
  });
});
