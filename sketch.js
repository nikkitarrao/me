//define variables
var gameStarted = false;
var gameIsOver = false;
var time = 15;
var score = 0;
var pixelFont, popupImage, icon1, icon2, icon3, icon4;
let randomIcon = []; // a random icon is chosen
var chosenIcon;
var trackTime;
var song;
var icons = [];
var index = [];
var randomIndexChosen, randomIndexMatch;
var highScore = 0;
let currentCharacter = 0;
let currentCharacter2 = 0;
let string = "quick click";
let string2 = "game over!";

function preload() {
  pixelFont = loadFont("game/ka1.ttf");
  popupImage = loadImage("game/popup.png");
  icon1 = loadImage("game/icon1.png");
  icon2 = loadImage("game/icon2.png");
  icon3 = loadImage("game/icon3.png");
  icon4 = loadImage("game/icon4.png");
  song = loadSound("game/daisy-bell.mp3");
  randomIcon = [icon1, icon2, icon3, icon4];
}

function setup() {
  createCanvas(450, 400);
  //song.onended(() => {
  //  song.play();
  // }); //having the song play again after it finishes
}

function draw() {
  background("#008083");

  //typewriter effect
  let currentString = string.substring(0, currentCharacter);
  currentCharacter += 0.1;

  if (gameStarted) {
    startGame();
    textSize(15);
    text("time left: " + time, 20, 20);
    text("score: " + score, 20, 40);
  } else if (gameIsOver) {
    image(popupImage, -50, -70, 550, 550);
    let currentString2 = string2.substring(0, currentCharacter2);
    currentCharacter2 += 0.1;
    textSize(45);
    textFont(pixelFont);
    text(currentString2, width / 10, 180);
    textSize(18);
    textFont("Courier New");
    text("Press SpaceBar to start a new game", 42, 220);
    text("High Score: " + highScore, 150, 250);
  } else {
    image(popupImage, -50, -70, 550, 550);
    textSize(45);
    textFont(pixelFont);
    text(currentString, width / 11, 170);
    textSize(20);
    textFont("Courier New");
    text("Click screen and then", 90, 210);
    text("Press SpaceBar to start", 80, 230);
  }
}

function keyPressed() {
  //start game
  if (key === " " && !gameStarted) {
    gameStarted = true;
    trackTime = millis(); // store the current time in ms
    song.playMode("restart");
    song.play();
    generateIcons();
  }
}

function mousePressed() {
  if (gameStarted) {
    var matchClicked = false;
    let timePassed = millis() - trackTime;
    for (let i = 0; i < icons.length; i++) {
      if (dist(icons[i].x, icons[i].y, mouseX, mouseY) < 40 && icons[i].match) {
        matchClicked = true;
        console.log(timePassed);
        trackTime = millis(); //reset
        score += 2; //adding to the score
        // bonus time
        if (timePassed <= 1000) {
          time += 3;
        } else if (timePassed <= 3000) {
          time += 1;
        } else if (timePassed > 3001) {
          time = time;
        }
        generateIcons();
        break;
      }
    }
    if (!matchClicked) {
      //misclick penalty
      time -= 10;
    }
  }
}

//function to generate icons
function generateIcons() {
  trackTime = millis(); // store the current time in ms
  icons = []; // clear
  index = [0, 1, 2, 3]; //reset

  randomIndexChosen = floor(random(index.length)); // random index
  chosenIcon = randomIcon[randomIndexChosen]; // choose icon based on index

  //ensure that the matching icons appears
  let matchingIcon = createIcon(chosenIcon, true);

  //store icon in the array
  icons[0] = matchingIcon;

  for (let i = 1; i < score + 2; i++) {
    //avoid reusing the matching icon
    do {
      randomIndexMatch = floor(random(index.length));
    } while (randomIndexMatch === randomIndexChosen);

    let icon = createIcon(randomIcon[randomIndexMatch], false);

    icons[i] = icon;
  }
}

//create icon method
function createIcon(iconImage, match) {
  let newIcon = {
    //new icon object per icon
    x: random(0, width - 40), // random x position
    y: random(120, height - 40), // random y position
    image: iconImage,
    match: match,
  };
  return newIcon;
}

//starts the game
function startGame() {
  //countdown
  if (frameCount % 60 == 0 && time > 0) {
    time--;
  }
  //generating the top message, which the player has to find
  image(popupImage, 120, -30, 200, 200);

  // Display the chosen icon only
  if (chosenIcon) {
    image(chosenIcon, 200, 40, 40, 40); // Display the chosen icon
  }
  //displaying the high score
  if (score >= highScore) {
    highScore = score;
  }

  //display other icons in reverse order so that the matching icon is never covered up
  for (let i = icons.length - 1; i >= 0; i--) {
    image(icons[i].image, icons[i].x, icons[i].y, 40, 40);
  }

  //ending game
  if (time <= 0) {
    gameOver();
  }
}

//resetting the game when there is game over
function gameOver() {
  gameIsOver = true;
  gameStarted = false;
  score = 0;
  time = 15;
  song.stop();
}
