'use strict'
//select、game、result画面を隠す。title画面を表示
let titleField = document.getElementById("title");

let selectField = document.getElementById("select");
selectField.style.display = 'none';

let gameField = document.getElementById("game");
gameField.style.display = 'none';

let resultField = document.getElementById("result");
resultField.style.display = 'none';

let ochiriField = document.getElementById("ochiri");
let shippoField = document.getElementById("shippo");
ochiriField.style.display = 'none';
shippoField.style.display = 'none';


//title画面

//あそぶボタンクリック　title画面を隠してselect画面を出現させる 揺れる犬を止める
function titleClick(e) {
  titleField.style.display = 'none';
  selectField.style.display = 'block';
  titleDogAnimation.cancel();
}

const startButton = document.getElementById("startButton");

startButton.addEventListener('click', titleClick);

//いぬを揺らす
const titleDogImage = document.getElementById("titleDog");
const titleDogAnimation = titleDogImage.animate(
  [
    { transform: 'rotate(0deg)' }, 
    { transform: 'rotate(10deg)' } ,
  ],
  {
    duration: 1000, 
    iterations: Infinity,
  }
);

// あそぶボタン
let state = false;
startButton.addEventListener('mouseover', titleMouseover);
startButton.addEventListener('mouseout', titleMouseover);

function titleMouseover() {
  if(state) {
  startButton.classList.add('buttonOff');
  startButton.classList.remove('buttonOn');
} else {
  startButton.classList.add('buttonOn');
  startButton.classList.remove('buttonOff');
}
state = ! state
}

//水玉
const colors = ["#ffdbdb","#ffdbed","#ffdbff","#eddbff","#dbdbff","#dbedff","#abffff","#abffed","#adffdb","#edffdb","#ffffab","#ffeddb"];

const div = document.createElement("div");
div.innerText="";
div.setAttribute("class","dots");
document.getElementById("title").appendChild(div);
let randomDotsStop;

const randomNum = num => Math.floor(Math.random() * num);

function randomDots() {
  let dotSize = randomNum(500);
  div.style.height = dotSize + "px";
  div.style.width = dotSize + "px";
  div.style.backgroundColor = colors[randomNum(12)];
  div.style.transform = randomNum(12);
  div.style.opacity = Math.random();
  div.style.top = randomNum(window.innerHeight) - dotSize + "px";
  div.style.left = randomNum(window.innerWidth) - dotSize + "px";
}

randomDotsStop = setInterval(randomDots,1000);

//データを削除するでローカルストレージクリア
document.getElementById("clear").addEventListener('click',function clear() {
  localStorage.clear();
  location.reload();
});



//select画面

//難易度選択後、game画面に難易度表示、いぬ出現
let degreeOfDifficulty;

function selectGameHide() {
  selectField.style.display = 'none';
  gameField.style.display = 'block';
}

function dogStyle(h, w) {
  document.getElementById("gameDog").style.height = h + "px";
  document.getElementById("gameDog").style.width = w + "px";
}

const selectImg = (id, imgSrc) => document.getElementById(id).src = imgSrc;


const gameMap = document.getElementById("gameMap");
const body = document.querySelector("body");

function degreeOfDifficultyClick(e) {
  gameMap.style.backgroundColor = "rgba(0, 0, 0, .01)";
  body.style.backgroundColor = "rgba(0, 0, 0, .5)"; 
  degreeOfDifficulty = e.target.getAttribute("class") 
  if(degreeOfDifficulty === "easy") {
    dogStyle(64, 192);
    selectGameHide();
  } else if (degreeOfDifficulty === "normal") {
    selectImg("gameDegreeOfDifficulty", "normal.png")
    selectImg("gameDog", "normalDog.png")
    dogStyle(32, 96);
    selectGameHide();
  } else if (degreeOfDifficulty === "difficult") {
    selectImg("gameDegreeOfDifficulty", "difficult.png")
    selectImg("gameDog", "shortDog.png")
    dogStyle(32, 32);
    selectGameHide();
  }
}

document.querySelectorAll("img").forEach(imgElm => imgElm.addEventListener('click', degreeOfDifficultyClick));


//select画面もどるをクリックしたら
function selectBackButtonClick(e) {
  document.getElementById("selectBackButton").innerText = "あそんであげて";
  document.getElementById("cryDog").src = "cryDog.png";
}

document.getElementById("selectBackButton").addEventListener("click" , selectBackButtonClick);

//selectいぬ動く
  const selectLongDogImage = document.getElementById("longDog");
  const selectNormalDogImage = document.getElementById("normalDog");
  const selectShortDogImage = document.getElementById("shortDog");
  function selectDogAnimation(length, action, num1, num2, unit, iterations) { 
    return function() {
      return length.animate(
      [
        { transform: `${action}(${num1}${unit})` }, 
        { transform: `${action}(${num2}${unit})` } ,
      ],
      {
        duration: 1, 
        iterations: iterations,
      }
    );
  }
}

const longDogAnimation = selectDogAnimation(selectLongDogImage, "rotate", 0, 1, "deg", 1000);
document.getElementById("longDog").addEventListener("mousemove", longDogAnimation)

const normalDogAnimation = selectDogAnimation(selectNormalDogImage, "rotate", 0, 10, "deg", 1000);
document.getElementById("normalDog").addEventListener("mousemove", normalDogAnimation)

const shortDogAnimation = selectDogAnimation(selectShortDogImage, "translateY", -50, 50, "px" ,1);
document.getElementById("shortDog").addEventListener("mousemove", shortDogAnimation)



//game画面
const gameStartButton = document.getElementById("gameStart");
const humans = document.getElementsByClassName("human");
const gameDogImage = document.getElementById("gameDog");

function gameImageVisible() {
  for(const human of humans) {
    human.style.display = "block";
  }
  gameDogImage.style.display = "block";
}

//ゲーム開始ボタンをクリック　3秒カウントダウン
function threeSecond() {
  let three = 3;
  const countdownP = document.getElementById("countdown");
  ochiriField.style.display = 'block';
  shippoField.style.display = 'block';
  gameStartButton.style.display = 'none';
  return threeSecondStop = setInterval(() => {
    if(three > 0) {
      countdownP.innerText = three;
      three--;
    } else if (three === 0) {
      gameImageVisible();
      shippoImgAnimate.cancel();
      gameMap.style.backgroundColor = "white";
      body.style.backgroundColor = "#ffffd5";    
      countdownP.innerText = "飼い主に遊んでもらえ！！";
      countdownP.style.top = "40%";
      countdownP.style.left = "17%";
      countdownP.style.fontSize = "70px";
      ochiriField.style.display = 'none';
      shippoField.style.display = 'none';
    }
  }
, 1000);
}

//いぬカウントだうん
  const ochiriImg = document.getElementById("ochiri");
  const shippoImg = document.getElementById("shippo");
  const shippoImgAnimate = shippoImg.animate(
    [
      { transform: 'rotate(0deg)' }, 
      { transform: 'rotate(360deg)' } ,
    ],
    {
      duration: 1000, 
      iterations: Infinity,
    }
  );





//いぬを動かす
let dogY = 480;
let dogX = 576;

function dogMove(e) {
  let key_code = e.keyCode;
  const dogMoveScope  = (max1, max2, max3) => {
    if( key_code === 37 && dogX >= 32 && dogX <= max1) dogX -= 32;
    if( key_code === 39 && dogX >= 0 && dogX <= max2 ) dogX += 32;
    if( key_code === 40 && dogY >= 0 && dogY <= max3 ) dogY += 32;    
  }

  if( key_code === 38 && dogY >= 32 && dogY <= 512) dogY -= 32;

  if(degreeOfDifficulty === "easy") {
    dogMoveScope(992, 960, 448);
  } else if (degreeOfDifficulty === "normal") {
    dogMoveScope(1088, 1056, 480);
  } else if (degreeOfDifficulty === "difficult") {
    dogMoveScope(1152, 1120, 480);
  }
  document.getElementById("gameDog").style.top = dogY + "px";
  document.getElementById("gameDog").style.left = dogX + "px";
}

//飼い主徘徊(4方向)
const randomArr = ["rightUpper","rightLower","leftLower","leftUpper"]
const stepSize = 32;
let human1Y = 0;
let human1X = randomNum(36) * 32;
let human2Y = 0;
let human2X = randomNum(36) * 32;

let direction1 = randomArr[randomNum(4)];
let direction2 = randomArr[randomNum(4)];

//飼い主錬成
for(let i = 1; i < 5; i++) {
  const humanImage = document.createElement("img");
  humanImage.setAttribute("id",`human${i}`);
  humanImage.setAttribute("class","human");
  humanImage.setAttribute("src", "human.png");
  document.getElementById("gameMap").appendChild(humanImage);  
}


function humanWalk() {  
  if (direction1 === "rightUpper" ) {
    if(human1Y > 0 &&  human1X < 1120) {
      human1X += stepSize;
      human1Y -= stepSize;
    } else {
      direction1 = randomArr[randomNum(4)];
    }

  } else if(direction1 === "rightLower") {
    if(human1Y <= 480 && human1X <= 1120) {
      human1X += stepSize;
      human1Y += stepSize;
    } else {
      direction1 = randomArr[randomNum(4)];
    }

  } else if(direction1 === "leftLower" ) {
    if(human1Y <= 480  && human1X >= 32) {
      human1X -= stepSize;
      human1Y += stepSize;
    } else {
      direction1 = randomArr[randomNum(4)];
    }

  } else if(direction1 === "leftUpper" ) {
    if(human1Y >= 32 &&  human1X >= 32) {
      human1X -= stepSize;
      human1Y -= stepSize;
    } else {
      direction1 = randomArr[randomNum(4)];
    }

  }
  
    if (direction2 === "rightUpper" ) {
    if(human2Y > 0 && human2X < 1120) {
      human2X += stepSize;
      human2Y -= stepSize;
    } else {
      direction2 = randomArr[randomNum(4)];
    }

    } else if(direction2 === "rightLower") {
    if(human2Y <= 480 &&human2X <= 1120) {
      human2X += stepSize;
      human2Y += stepSize;
    } else {
      direction2 = randomArr[randomNum(4)];
    }

  } else if(direction2 === "leftLower" ) {
    if(human2Y <= 480  &&human2X >= 32) {
      human2X -= stepSize;
      human2Y += stepSize;
    } else {
      direction2 = randomArr[randomNum(4)];
    }

  } else if(direction2 === "leftUpper" ) {
    if(human2Y >= 32 && human2X >= 32) {
      human2X -= stepSize;
      human2Y -= stepSize;
    } else {
      direction2 = randomArr[randomNum(4)];
    }

  }

  document.getElementById("human1").style.left = human1X + "px"
  document.getElementById("human1").style.top = human1Y + "px"
  document.getElementById("human2").style.left = human2X + "px"
  document.getElementById("human2").style.top = human2Y + "px"
}


// 飼い主上から落ちてくる
let human3Y = 0;
let human3X = randomNum(36) * 32;
let human4Y = 0;
let human4X = randomNum(36) * 32;

function humanFallDraw() {
  document.getElementById("human3").style.left = human3X + "px"
  document.getElementById("human3").style.top = human3Y + "px"
  document.getElementById("human4").style.left = human4X + "px"
  document.getElementById("human4").style.top = human4Y + "px"
}

function humanFall() {
  if(human3Y < 512) {
    human3Y += stepSize;
    humanFallDraw();
  } else {
    human3X = randomNum(36) * 32;
    human3Y = 0;
    humanFallDraw();
  }  
  
  if(human4Y < 512) {
    human4Y += stepSize;
    humanFallDraw();
  } else {
    human4X = randomNum(36) * 32;
    human4Y = 0;
    humanFallDraw();
  }  
}

//30秒カウントダウン　30秒後飼い主ストップ、result画面へ
//ゲーム時間だけいぬが動ける
let time = 10;
let walkStop;
let fallStop;
let countStop;
let threeSecondStop;
function countdown() {
  if(time > 0) {
    addEventListener('keydown' , dogMove);
    time--;
    document.getElementById("time").innerText = time;
  } else {
    clearInterval(walkStop);
    clearInterval(fallStop);
    clearInterval(countStop);
    clearInterval(randomDotsStop);
    clearInterval(threeSecondStop);  
    resultCollection();
    gameField.style.display = 'none';
    resultField.style.display = 'block';
    document.getElementById("scoreResult").innerText = resultScore;  
  }
}


//徘徊、落下、カウントダウン開始

document.getElementById("gameStart").addEventListener('click', gameStart);
document.getElementById("gameStart").addEventListener('click', threeSecond);

function gameStart() { 
  return setTimeout(() => {
    if(degreeOfDifficulty === "difficult") {
      walkStop = setInterval(humanWalk, 200);
      fallStop = setInterval(humanFall,200);
      
    } else {
      walkStop = setInterval(humanWalk, 400);
      fallStop = setInterval(humanFall,400);

    }

    countStop = setInterval(countdown, 1000);
  }, 3000);
}


//当たったらスコアを増やす
//当たった時のエフェクトと消えるまで
let score = 0;
let resultScore = 0;
const h4 = document.createElement("h4");

function scoreDraw() {
  score++;
  document.getElementById("score").innerText = score;

  h4.innerHTML = "💕";
  document.getElementById("gameMap").appendChild(h4);
  h4.style.position = "absolute";
  h4.style.top = dogY + "px";
  h4.style.left = dogX + "px";
  h4.style.zIndex = "6";
  setTimeout(function deleteEffect() {
    h4.innerHTML = "";
  }, 1000);

}


const easyCollisionDetection = (humanY, humanX) => 
  (humanY >= dogY && humanY <= (dogY + 32) && humanX >= dogX && humanX <= (dogX + 191))

const normalCollisionDetection = (humanY, humanX) => 
  (humanY >= dogY && humanY <= dogY && humanX >= dogX && humanX <= (dogX + 95))


function collisionDetection() {
    if(degreeOfDifficulty === "easy") {
      if(easyCollisionDetection(human1Y, human1X)
        ||easyCollisionDetection(human2Y, human2X)
        ||easyCollisionDetection(human3Y, human3X)
        ||easyCollisionDetection(human4Y, human4X)) {
          scoreDraw();
      } 
    }

    if (degreeOfDifficulty === "normal") {
      if(normalCollisionDetection(human1Y, human1X)
        ||normalCollisionDetection(human2Y, human2X)
        ||normalCollisionDetection(human3Y, human3X)
        ||normalCollisionDetection(human4Y, human4X)) {
          scoreDraw();
      } 
    }

    if (degreeOfDifficulty === "difficult") {
      if(human1X === dogX && human1Y === dogY ) {
        scoreDraw();
      } else if (human2X === dogX && human2Y === dogY) {
        scoreDraw();
      } else if (human3X === dogX && human3Y === dogY) {
        scoreDraw();
      } else if (human4X === dogX && human4Y === dogY) {
        scoreDraw();
      } 
    }
    resultScore = score;
  }
  
  addEventListener('keydown', collisionDetection);

  
 //result画面
  //クリックしたらtitle画面に戻る
  function resultBackButton() {
    resultField.style.display = 'none';
    titleField.style.display = 'block';
    location.reload();
  }
  
  document.getElementById("resultBackButton").addEventListener('click', resultBackButton);
  
  
  //最高得点
  function supremeOverride(level) {
    const phrase = document.createElement("p");
    phrase.innerText="🌞最高得点更新！🌞"
    document.getElementById("result").appendChild(phrase);

    localStorage.setItem(degreeOfDifficulty, score);  
    localStorage[level] = score;

    setInterval(resultBackground,500);
    const resultDogImage1 = document.getElementById("resultDog1");
    const resultDogImage2 = document.getElementById("resultDog2");
    resultDogImage1.animate(
      [
        { transform: 'rotate(0deg)' }, 
        { transform: 'rotate(10deg)' } ,
      ],
      {
        duration: 500, 
        iterations: Infinity,
      }
    );
    resultDogImage2.animate(
      [
        { transform: 'rotate(0deg)' }, 
        { transform: 'rotate(10deg)' } ,
      ],
      {
        duration: 500, 
        iterations: Infinity,
      }
    );
  }  


function scoreTableDraw(idName, level) {
  document.getElementById(idName).innerText = localStorage[level] || 0;
}

function resultCollection() {
  if(degreeOfDifficulty === "easy" && score> (localStorage["easy"] || 0)) {
    supremeOverride("easy")
  } else if (degreeOfDifficulty === "normal" && score > (localStorage["normal"] || 0)) {
    supremeOverride("normal")
  } else if (degreeOfDifficulty === "difficult" && score > (localStorage["difficult"] || 0)) {
    supremeOverride("difficult")
  }
  scoreTableDraw("easyResult", "easy");
  scoreTableDraw("normalResult", "normal");
  scoreTableDraw("difficultResult", "difficult");
}


//result背景色
function resultBackground() {
    const target = document.querySelector("body");
    target.style.transition = "1s";
    target.style.backgroundColor = colors[randomNum(12)];
}




