// var prizeMoney = [
//   1,
//   5,
//   10,
//   25,
//   50,
//   75,
//   100,
//   200,
//   300,
//   400,
//   500,
//   750,
//   1000,
//   5000,
//   10000,
//   25000,
//   50000,
//   75000,
//   100000,
//   200000,
//   300000,
//   400000,
//   500000,
//   750000,
//   1000000
// ];
// var prizeMoney = [0.05, 0.2, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5, 3.0, 5.0, 7.5, 10.0, 12.5, 15.0, 20.0, 25.0, 50.0, 75.0, 100.0, 125.0, 150.0, 200.0];

// prizeMoney = getBoxAmounts(prizes)
function getBoxAmounts() {
  if (prizes) {
    console.log(prizes);
    var prizeMoney = prizes;
  }
  else {
    var prizeMoney = [0.05, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 5.0, 7.5, 10.0, 12.5, 15.0, 20.0, 25.0, 40.0, 50.0, 60.0, 75.0, 100.0, 125.0, 150.0, 200.0];
  }
  return prizeMoney;
}
prizeMoney = getBoxAmounts()
console.log(`prizeMoney = ${prizeMoney}`);
//amounts for jumbotrons
var largest = prizeMoney[21];
console.log(`largest = ${largest }`);
var secondLargest = prizeMoney[20];
console.log(`secondLargest = ${secondLargest}`);
var yayValue = prizeMoney[3];
console.log(`yayValue = ${yayValue}`);
// Initialize an empty array to hold the selected values.
let selectedValues = [];
// Initialize the number of boxes
let boxNumber = 1;

// Initialize the number of turns
let turnNumber = 0;

let initialBoxSelected = false;
let bankerHasAnOffer = false;

const gameTable = document.getElementById("game-board");
const valueTable = document.getElementById("money-table");
let gameBox = document.getElementsByClassName("game-box");
let valueBox = document.getElementsByClassName("value-box");
const dealButton = document.getElementById("deal-button");
const noDealButton = document.getElementById("no-deal-button");

const mappingFunctionToValueTable = function(val) {
  let newCell = document.createElement("div");
  newCell.textContent = "$" + val.toLocaleString();
  newCell.setAttribute("class", "value-box");
  newCell.classList.add("col-md-5");
  valueTable.appendChild(newCell);
};

const mappingFunctionToGameBox = function(val) {
  let newCell = document.createElement("div");
  newCell.style.fontSize = "30px";
  newCell.textContent = boxNumber;
  newCell.setAttribute("class", "game-box");
  newCell.classList.add("col-md-2");
  newCell.setAttribute("id", val);
  gameTable.appendChild(newCell);
  boxNumber++;
};

// Initialize the various display elements
let turnNumberDisplay = document.getElementById("turn-number");
let messageDisplay = document.getElementById("message-display");
let initialBoxDisplay = document.getElementById("initial-box-display");
let modalDisplay = document.getElementById("modal-display");
messageDisplay.innerText =
  "Choose your initial box. This box will determine your fate in this game!";

//Shuffle values in prizeMoney array
function getShuffledArray(arr) {
  let newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr;
}

// Set randomized prize money into values on Game Board
let randomPrizeMoney = getShuffledArray(prizeMoney);
randomPrizeMoney.forEach(function(item) {
  mappingFunctionToGameBox(item);
});

// Adding Event Listener on each game box to listen for click event
const allowClicksToOpenGameBox = function() {
  for (i = 0; i < gameBox.length; i++) {
    gameBox[i].addEventListener("click", clickBox);
  }
};

allowClicksToOpenGameBox();

// Map game values onto the Values Table at the side
prizeMoney.forEach(function(item) {
  mappingFunctionToValueTable(item);
});

// Setting a function to call when Box is clicked.
function clickBox() {
  // Check whether box is already opened. If opened, do not allow the player to click on it again.
  if (initialBoxSelected === false) {
    this.classList.add("player-box");
    this.classList.remove("game-box");
    initialBoxItem = document.createElement("div");
    initialBoxItem.textContent = this.textContent;
    initialBoxItem.setAttribute("class", "initial-box");
    initialBoxItem.classList.add("col-md-12", "slide-in-blurred-tr");
    initialBoxItem.setAttribute("id", this.id);
    initialBoxDisplay.appendChild(initialBoxItem);
    messageDisplay.innerText =
      "You have chosen box number " +
      this.textContent +
      " as your initial box. Choose 5 boxes to open.";
    chooseInitialBox();
  } else if (
    this.classList.contains("opened-box") ||
    this.classList.contains("player-box")
  ) {
    messageDisplay.innerText =
      "This box is already opened! Please choose another box!";
  } else {
    // Convert string to number
    numberString = this.id;
    numberValue = parseFloat(numberString);
    // Add selected value to selected value array
    selectedValues.push(numberValue);
    // Add commas for thousands seperator
    this.innerText = "$" + numberString.toLocaleString();
    this.style.fontSize = "25px";
    this.classList.add("opened-box", "puff-in-center");
    this.classList.remove("game-box");
    messageDisplay.innerText =
      "The box you opened has got $" + numberString.toLocaleString() + " in it.";
    // Increment the Turn Number every time a box is clicked.
    turnNumber++;
    turnNumberDisplay.innerText = turnNumber;
    // Cancelling out the opened box on the value table
    for (i = 0; i < valueBox.length; i++) {
      if (this.innerText === valueBox[i].innerText) {
        valueBox[i].classList.add("strike-box");
      }
    }
    // Showing jumbotrons for various amounts chosen
    if (numberValue === 750) {
      console.log(`numberValue === 750 >>> open-750.gif: case value = ${750} ${numberValue === 750}`);
      jumbotronDisplayOpenForValue();
      jumbotronDisplayImage.src = "../static/open-750.gif";
    } else if (numberValue === 1) {
      jumbotronDisplayOpenForValue();
      jumbotronDisplayImage.src = "../static/yay.gif";
    } else if (numberValue < yayValue ) {
      console.log(`numberValue < yayValue  >>> yay.gif: case value = ${numberValue} < ${yayValue} ${numberValue < yayValue}`);
      jumbotronDisplayOpenForValue();
      jumbotronDisplayImage.src = "../static/yay.gif";
    } else if (numberValue === secondLargest) {
      console.log(`numberValue === secondLargest >>> 500000.gif: case value = ${secondLargest} ${numberValue === secondLargest}`);
      jumbotronDisplayOpenForValue();
      jumbotronDisplayImage.src = "../static/500000.gif";
    } else if (numberValue === largest) {
      console.log(`numberValue === largest >>> facepalm.gif: case value = ${largest} ${numberValue === largest}`);
      jumbotronDisplayOpenForValue();
      jumbotronDisplayImage.src = "../static/facepalm.gif";
    }
    checkGame();
  }
}

// Function for initial player box selection.
const chooseInitialBox = function() {
  console.log("Initial Box Chosen");
  turnNumber++;
  initialBoxSelected = true;
};

// Initialize the playerDealDecision variable to log whether the player has made a decision or not
let playerDealDecision;

// Add Event Listener to Deal or No Deal Buttons to listen for click
// Set/Toggle the playerDealDecision boolean based on player deal decision
dealButton.onclick = function() {
  if (bankerHasAnOffer === true && turnNumber < 21) {
    playerDealDecision = true;
    const lastBoxToBeOpened = document.getElementsByClassName("initial-box");
    const boxId = lastBoxToBeOpened[0].id;
    acceptedBankerAmountEndGameAndAskToPlayAgain(offerValue, boxId);
    messageDisplay.innerText =
      "Congratulations! You have chosen to sell your box to the banker for $" +
      parseInt(offerValue).toLocaleString();
  } else {
    messageDisplay.innerText = "You chose to switch your box.";
    lastBox = document.getElementsByClassName("game-box");
    playerBox = document.getElementsByClassName("player-box");
    initialBoxItem.innerText = lastBox[0].textContent;
    initialBoxItem.id = lastBox[0].id;
    lastBox[0].classList.add("final-player-box");
    lastBox[0].classList.remove("game-box");
    playerBox[0].classList.add("final-game-box");
    finalGameBox = document.getElementsByClassName("final-game-box");
    finalGameBox[0].classList.remove("player-box");
    endGame();
  }
};

noDealButton.onclick = function() {
  if (bankerHasAnOffer === true && turnNumber < 21) {
    playerDealDecision = false;
    messageDisplay.innerText = "You chose no deal! Please continue choosing!";
  } else {
    messageDisplay.innerText =
      "You did not switch your box. You will keep your original box.";
    endGame();
  }
};

const answerBankerCall = function() {
  modalDisplay.innerText =
    "The banker called! He offered you $" +
    parseInt(offerValue).toLocaleString();
  // Displaying the player message
  $("#playerMessageModal").modal("show");
  bankerHasAnOffer = true;
};

// Create Game Logic
// Check the turn number and give the values based on the turn number.
const checkGame = function() {
  // Reduce the total amount in the array to a single value for easy calculation
  let totalPrizeMoney = prizeMoney.reduce(function(a, b) {
    return a + b;
  });

  let totalSelectedValues = selectedValues.reduce(function(c, d) {
    return c + d;
  });

  if (turnNumber === 0) {
    chooseInitialBox();
  } else if (
    turnNumber === 6 ||
    turnNumber === 10 ||
    turnNumber === 14 ||
    turnNumber === 17 ||
    turnNumber === 19 ||
    turnNumber === 20
  ) {
    // Set the offerValue to be the average remaining value.
    offerValue = (totalPrizeMoney - totalSelectedValues) / (22 - turnNumber);
    console.log(`offerValue = ${offerValue}`);
    showJumbotronWithBankerCall();
  } else if (turnNumber === prizeMoney.length-1) {
    // Set the offerValue to be the average remaining value.
    offerValue = (totalPrizeMoney - totalSelectedValues) / (22 - turnNumber);
    modalDisplay.innerText =
      "The banker called! do you want to switch your boxes?";
    dealButton.innerText = "Switch";
    noDealButton.innerText = "Don't Switch!";
    parseInt(offerValue).toLocaleString();
    // Displaying the player message
    $("#playerMessageModal").modal("show");
    bankerHasAnOffer = true;
  }
};
const endGame = function() {
  messageDisplay.innerText = "Click on the your box to open!";
  const lastBoxToBeOpened = document.getElementsByClassName("initial-box");
  showJumbotronWithWinningPage(
    lastBoxToBeOpened[0].innerText,
    lastBoxToBeOpened[0].id
  );
};
