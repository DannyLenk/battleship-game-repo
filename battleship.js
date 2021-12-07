"use strict"

let view = {
   displayMessage: function(msg) {
      document.querySelector('#messageArea').innerHTML = msg;
   },
   displayHit: function(location) {
      document.getElementById(location).setAttribute('class', 'hit');
      this.displayMessage("HIT!");
   },
   displayMiss: function(location) {
      document.getElementById(location).setAttribute('class', 'miss');
      this.displayMessage("You missed.");
   }
};

let model = {
   boardSize: 7,
   shipSize: 3,
   shipsNumber: 3,
   shipsSunk: 0,
   ships: [
      { locations: ['02', '03', '04'], hits: ['', '', ''] },
      { locations: ['50', '51', '52'], hits: ['', '', ''] },
      { locations: ['45', '55', '65'], hits: ['', '', ''] }
   ],

   fire: function(guess) {
      for (let i = 0; i < this.shipsNumber; i++) {
         let ship = this.ships[i];
         let index = ship.locations.indexOf(guess);
         if (index >= 0) {
            ship.hits[index] = 'hit';
            view.displayHit(guess);
            this.isSunk(ship);
            return true;
         }
      }
      view.displayMiss(guess);
      return false;
   },

   isSunk: function(ship) {
      for (let i = 0; i < this.shipSize; i++) {
         if (ship.hits[i] !== 'hit') {
            return false;
         }
      }
      this.shipsSunk++;
      view.displayMessage("You sank my battleship!");
      return true;
   }
};

let controller = {
   guesses: 0,

   processGuess: function(guess) {
      let location = parseGuess(guess);
      if (location) {
         this.guesses++; 
         let hit = model.fire(location);
         console.log(hit);
         if (hit && model.shipsSunk === model.shipsNumber) {
            view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
         }
      }
   }
};

function parseGuess(guess) {
   let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
   const letter = guess.charAt(0);
   const row = alphabet.indexOf(letter);
   const col = guess.charAt(1);

   if (guess === null || guess.length !== 2) {
      alert("Oops, enter a letter and a number on the board");
   } else if (isNaN(row) || isNaN(col)) {
      alert("Oops, that's not on the board");
   } else if ( row < 0 || row >= model.boardSize 
            || col < 0 || col >= model.boardSize ) {
      alert("Oops, that's off the board");
   } else {
      return row + col;
   }
   return null;
}

function init() {
   document.querySelector('#fireButton').addEventListener('click', processClick);
   const guessInput = document.querySelector('#guessInput');
   guessInput.onkeyup = processEnterPress;
}
window.onload = init;

function processClick() {
   const guessInput = document.querySelector('#guessInput');
   const inputValue = guessInput.value;
   controller.processGuess(inputValue);
   guessInput.value = '';
}
function processEnterPress(e) {
   const fireButton = document.querySelector('#fireButton');
   if (e.key === 'Enter') {
      fireButton.click();
      return false;
   }
}


// controller.processGuess('A1');
// controller.processGuess('B1');


// controller.processGuess('A2');
// controller.processGuess('A3');
// controller.processGuess('A4');

// controller.processGuess('F0');
// controller.processGuess('F1');
// controller.processGuess('F2');

// controller.processGuess('E5');
// controller.processGuess('F5');
// controller.processGuess('G5');




