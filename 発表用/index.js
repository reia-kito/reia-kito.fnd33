'use strict'
//select画面とgame画面を隠す。title画面を表示
let selectField = document.getElementById("select");
selectField.style.display = 'none';
let gameField = document.getElementById("game");
gameField.style.display = 'none';



//title画面あそぶボタンクリック
//title画面を隠してselect画面を出現させる
function titleClick(e) {
  let titleButton = document.getElementById("title");
  titleButton.style.display = 'none';
  selectField.style.display = 'block';
}

document.getElementById("startButton").addEventListener('click', titleClick);


//select画面難易度選択後、game画面に難易度表示、いぬ出現
let degreeOfDifficulty;

function selectGameHide() {
  selectField.style.display = 'none';
  gameField.style.display = 'block';
}

function degreeOfDifficultyClick(e) {
  degreeOfDifficulty = e.target.getAttribute("id") 
  if(degreeOfDifficulty === "shortDog" || degreeOfDifficulty === "easy") {
    selectGameHide();
    document.getElementById("gameDog").style.height = "32px";
    document.getElementById("gameDog").style.width = "32px";
  } else if (degreeOfDifficulty === "normalDog" || degreeOfDifficulty === "normal") {
    document.getElementById("gameDegreeOfDifficulty").src = "image/normal.png";
    document.getElementById("gameDog").src = "image/normalDog.png";
    document.getElementById("gameDog").style.height = "32px";
    document.getElementById("gameDog").style.width = "96px";
    selectGameHide();
  } else if (degreeOfDifficulty === "longDog" || degreeOfDifficulty === "difficult") {
    document.getElementById("gameDegreeOfDifficulty").src = "image/difficult.png";
    document.getElementById("gameDog").src = "image/longDog.png";
    document.getElementById("gameDog").style.height = "64px";
    document.getElementById("gameDog").style.width = "192px";
    selectGameHide();
  }
}

document.querySelectorAll("img").forEach((imgElm) => {
  imgElm.addEventListener('click', degreeOfDifficultyClick);
})


//select画面もどるをクリックしたら
function selectBackButtonClick(e) {
  document.getElementById("selectBackButton").innerText = "あそんであげて";
}

document.getElementById("selectBackButton").addEventListener("click" , selectBackButtonClick);



//game画面
//いぬを動かす
let dogY = 256;
let dogX = 0;

addEventListener("keydown" , dogMove);

function dogMove(e) {
  document.getElementById("gameDog").style.display = 'block';
  document.getElementById("human").style.display = 'block';
  let key_code = e.keyCode;
  console.log(key_code)
  if( key_code === 38 && dogY >= 32 && dogY <= 512) dogY -= 32;//上

  if(degreeOfDifficulty === "shortDog" || degreeOfDifficulty === "easy") {
    if( key_code === 37 && dogX >= 32 && dogX <= 1152) dogX -= 32;//左
    if( key_code === 39 && dogX >= 0 && dogX <= 1120 ) dogX += 32;//右
    if( key_code === 40 && dogY >= 0 && dogY <= 480 ) dogY += 32;//下

  } else if (degreeOfDifficulty === "normalDog" || degreeOfDifficulty === "normal") {
    if( key_code === 37 && dogX >= 32 && dogX <= 1088) dogX -= 32;//左
    if( key_code === 39 && dogX >= 0 && dogX <= 1056) dogX += 32;//右 
    if( key_code === 40 && dogY >= 0 && dogY <= 480 ) dogY += 32;//下

  } else if (degreeOfDifficulty === "longDog" || degreeOfDifficulty === "difficult") {
    if( key_code === 37 && dogX >= 32 && dogX <= 992) dogX -= 32;//左
    if( key_code === 39 && dogX >= 0 && dogX <= 960 ) dogX += 32;//右
    if( key_code === 40 && dogY >= 0 && dogY <= 448 ) dogY += 32;//下

  }


  document.getElementById("gameDog").style.top = dogY + "px";
  document.getElementById("gameDog").style.left = dogX + "px";
}

//飼い主ランダムウォーク徘徊
const randomArr = ["rightUpper","rightLower","leftLower","leftUpper"]
const stepSize = 32;
let humanY = 256;
let humanX = 1152;

let direction = randomArr[Math.floor(Math.random() * 4)];//方向
function humanWalk() {  
  if (direction === "rightUpper" ) {
    if(humanY > 0 &&  humanX < 1120) {
      humanX += stepSize;
      humanY -= stepSize;
    } else {
      direction = randomArr[Math.floor(Math.random() * 4)];
    }
  } else if(direction === "rightLower") {
    if(humanY <= 480 && humanX <= 1120) {
      humanX += stepSize;
      humanY += stepSize;
    } else {
      direction = randomArr[Math.floor(Math.random() * 4)];
    }
  } else if(direction === "leftLower" ) {
    if(humanY <= 480  && humanX >= 32) {
      humanX -= stepSize;
      humanY += stepSize;
    } else {
      direction = randomArr[Math.floor(Math.random() * 4)];
    }
  } else if(direction === "leftUpper" ) {
    if(humanY >= 32 &&  humanX >= 32) {
      humanX -= stepSize;
      humanY -= stepSize;
    } else {
      direction = randomArr[Math.floor(Math.random() * 4)];
    }
  }
  document.getElementById("human").style.left = humanX + "px"
  document.getElementById("human").style.top = humanY + "px"
}

//ゲームを開始する
//setInterval(humanWalk, 35);
addEventListener("keydown" , gameStart);

function gameStart(e) {
  let key_code = e.keyCode;
  if(key_code === 13) {
    setInterval(humanWalk, 35);
  }
}