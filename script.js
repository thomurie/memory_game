"use strict";

const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
let selected;
let counter = 0;
let score = 0;
const scoreElm = document.querySelector(".score");

let clicks = 0;
function handleCardClick(event) {
  score++;
  scoreElm.innerHTML = `Score: ${score}`;
  const color = Array.from(event.target.classList)[0];
  for (let child of Array.from(game.children)) {
    console.log(child.classList);
  }
  // only change 2 cards
  if (counter === 0) {
    if (Array.from(event.target.classList)[1] === "match") {
      console.log("Picked");
      counter = 0;
    } else {
      event.target.style.backgroundColor = color;
      event.target.classList.add("picked");
      selected = event.target;
      counter++;
    }
  } else if (counter === 1) {
    event.target.style.backgroundColor = color;
    counter++;
    if (
      Array.from(selected.classList)[0] ===
      Array.from(event.target.classList)[0]
    ) {
      if (Array.from(event.target.classList)[1] === "picked") {
        counter = 1;
        console.log("picked twice, no match");
      } else {
        console.log("match");
        selected.classList.toggle("match");
        selected.classList.remove("picked");
        event.target.classList.toggle("match");
        event.target.classList.remove("picked");
        counter = 0;
        selected = null;
      }
    } else {
      setTimeout(() => {
        for (let child of Array.from(game.children)) {
          if (Array.from(child.classList)[1] === "match") {
            null;
          } else if (Array.from(child.classList)[1] === "picked") {
            child.classList.remove("picked");
            child.style.backgroundColor = "white";
          } else {
            child.style.backgroundColor = "white";
          }
        }
        counter = 0;
      }, 1000);
    }
  }
}
// when the DOM loads
createDivsForColors(shuffledColors);
