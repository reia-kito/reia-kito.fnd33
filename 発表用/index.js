'use strict'
//select、game、result画面を隠す。title画面を表示
let titleField = document.getElementById("title");

let selectField = document.getElementById("select");
selectField.style.display = 'none';

let gameField = document.getElementById("game");
gameField.style.display = 'none';

let resultField = document.getElementById("result");
resultField.style.display = 'none';


//title画面

//あそぶボタンクリック　title画面を隠してselect画面を出現させる 揺れる犬を止める
function titleClick(e) {
  titleField.style.display = 'none';
  selectField.style.display = 'block';
  titleDogAnimation.cancel();
}

document.getElementById("startButton").addEventListener('click', titleClick);

//いぬを揺らす
const titleDogImage = document.getElementById("titleDog");
const titleDogAnimation = titleDogImage.animate(
  [
    { transform: 'rotate(0deg)' }, 
    { transform: 'rotate(10deg)' } ,
  ],
  {
    fill: 'backwards',
    duration: 1000, 
    iterations: Infinity,
  }
);

// あそぶボタン
let stat = false;
document.getElementById("startButton").addEventListener('mouseover', titleMouseover);
document.getElementById("startButton").addEventListener('mouseout', titleMouseover);
function titleMouseover() {
  if(stat) {
  document.getElementById("startButton").classList.add('off');
  document.getElementById("startButton").classList.remove('on');
  
} else {
  document.getElementById("startButton").classList.add('on');
  document.getElementById("startButton").classList.remove('off');
  
}
stat = ! stat
}


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

function degreeOfDifficultyClick(e) {
  degreeOfDifficulty = e.target.getAttribute("id") 
  if(degreeOfDifficulty === "longDog" || degreeOfDifficulty === "easy") {
    dogStyle(64, 192);
    selectGameHide();
    degreeOfDifficulty = "easy"
  } else if (degreeOfDifficulty === "normalDog" || degreeOfDifficulty === "normal") {
    document.getElementById("gameDegreeOfDifficulty").src = "image/normal.png";
    document.getElementById("gameDog").src = "image/normalDog.png";
    dogStyle(32, 96);
    selectGameHide();
    degreeOfDifficulty = "normal"
  } else if (degreeOfDifficulty === "shortDog" || degreeOfDifficulty === "difficult") {
    document.getElementById("gameDegreeOfDifficulty").src = "image/difficult.png";
    document.getElementById("gameDog").src = "image/shortDog.png";
    dogStyle(32, 32);
    selectGameHide();
    degreeOfDifficulty = "difficult"
  }
}

document.querySelectorAll("img").forEach((imgElm) => {
  imgElm.addEventListener('click', degreeOfDifficultyClick);
})


//select画面もどるをクリックしたら
function selectBackButtonClick(e) {
  document.getElementById("selectBackButton").innerText = "あそんであげて";
  document.getElementById("cryDog").src = "image/cryDog.png";
}

document.getElementById("selectBackButton").addEventListener("click" , selectBackButtonClick);



//game画面

//ゲーム開始ボタンをクリック　3秒カウントダウン
function threeSecond() {
  let three = 3;
  function inner() {
    if(three > 0) {
      document.getElementById("countdown").innerText = three;
      three--;
    } else if (three === 0) {
      document.getElementById("countdown").innerText = "飼い主に遊んでもらえ！！";
    }
  }
  return threeSecondStop = setInterval(inner, 1000);
}


//いぬを動かす
let dogY = 480;
let dogX = 576;

function dogMove(e) {
  let key_code = e.keyCode;
  if( key_code === 38 && dogY >= 32 && dogY <= 512) dogY -= 32;

  if(degreeOfDifficulty === "easy") {
    if( key_code === 37 && dogX >= 32 && dogX <= 992) dogX -= 32;
    if( key_code === 39 && dogX >= 0 && dogX <= 960 ) dogX += 32;
    if( key_code === 40 && dogY >= 0 && dogY <= 448 ) dogY += 32;    

  } else if (degreeOfDifficulty === "normal") {
    if( key_code === 37 && dogX >= 32 && dogX <= 1088) dogX -= 32;
    if( key_code === 39 && dogX >= 0 && dogX <= 1056) dogX += 32; 
    if( key_code === 40 && dogY >= 0 && dogY <= 480 ) dogY += 32;

  } else if (degreeOfDifficulty === "difficult") {
    if( key_code === 37 && dogX >= 32 && dogX <= 1152) dogX -= 32;
    if( key_code === 39 && dogX >= 0 && dogX <= 1120 ) dogX += 32;
    if( key_code === 40 && dogY >= 0 && dogY <= 480 ) dogY += 32;

  }
  document.getElementById("gameDog").style.top = dogY + "px";
  document.getElementById("gameDog").style.left = dogX + "px";
}

//飼い主徘徊(4方向)
const randomArr = ["rightUpper","rightLower","leftLower","leftUpper"]
const stepSize = 32;
let human1Y = 0;
let human1X = 576;

let direction = randomArr[Math.floor(Math.random() * 4)];
function humanWalk() {  
  if (direction === "rightUpper" ) {
    if(human1Y > 0 &&  human1X < 1120) {
      human1X += stepSize;
      human1Y -= stepSize;
    } else {
      direction = randomArr[Math.floor(Math.random() * 4)];
    }
  } else if(direction === "rightLower") {
    if(human1Y <= 480 && human1X <= 1120) {
      human1X += stepSize;
      human1Y += stepSize;
    } else {
      direction = randomArr[Math.floor(Math.random() * 4)];
    }
  } else if(direction === "leftLower" ) {
    if(human1Y <= 480  && human1X >= 32) {
      human1X -= stepSize;
      human1Y += stepSize;
    } else {
      direction = randomArr[Math.floor(Math.random() * 4)];
    }
  } else if(direction === "leftUpper" ) {
    if(human1Y >= 32 &&  human1X >= 32) {
      human1X -= stepSize;
      human1Y -= stepSize;
    } else {
      direction = randomArr[Math.floor(Math.random() * 4)];
    }
  }
  document.getElementById("human1").style.left = human1X + "px"
  document.getElementById("human1").style.top = human1Y + "px"
}

//飼い主上から落ちてくる
let human2Y = 0;
let human2X = 576;

function humanFallDraw() {
  document.getElementById("human2").style.left = human2X + "px"
  document.getElementById("human2").style.top = human2Y + "px"
}

function humanFall() {
  if(human2Y < 512) {
    human2Y += stepSize;
    humanFallDraw();
  } else {
    human2X = Math.floor(Math.random() * 36) * 32;
    human2Y = 0;
    humanFallDraw();
  }  
}

//30秒カウントダウン　30秒後飼い主ストップ、result画面へ
//ゲーム時間だけいぬが動ける
let time = 3;
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
    gameField.style.display = 'none';
    resultField.style.display = 'block';
    resultCollection();
    clearInterval(threeSecondStop);  
    document.getElementById("scoreResult").innerText = resultScore;  
  }
}

//徘徊、落下、カウントダウン開始
document.getElementById("gameStart").addEventListener('click', gameStart);
document.getElementById("gameStart").addEventListener('click', threeSecond);

function gameStart() {
  function inner() {
    walkStop = setInterval(humanWalk, 400);
    fallStop = setInterval(humanFall,400);
    countStop = setInterval(countdown, 1000);
  }
  return setTimeout(inner, 3000);
}


//当たったらスコアを増やす
let score = 0;
let resultScore = 0;
function scoreDraw() {
  score++;
  document.getElementById("score").innerText = score;
}

function collisionDetection() {
    if(degreeOfDifficulty === "easy") {
      if((human1Y >= dogY && human1Y <= (dogY + 32) && human1X >= dogX && human1X <= (dogX + 191))
        ||(human2Y >= dogY && human2Y <= (dogY + 32) && human2X >= dogX && human2X <= (dogX + 191))) {
          scoreDraw();
      } 
    }

    if (degreeOfDifficulty === "normal") {
      if((human1Y >= dogY && human1Y <= dogY && human1X >= dogX && human1X <= (dogX + 95))
        ||(human2Y >= dogY && human2Y <= dogY && human2X >= dogX && human2X <= (dogX + 95))) {
          scoreDraw();
      } 
    }

    if (degreeOfDifficulty === "difficult") {
      if(human1X === dogX && human1Y === dogY ) {
        scoreDraw();
      } else if (human2X === dogX && human2Y === dogY) {
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
  phrase.innerText="最高得点更新！"
  localStorage.setItem(degreeOfDifficulty, score);  
  document.getElementById("result").appendChild(phrase);
  localStorage[level] = score;
}

function scoreTableDraw(idName, level) {
  document.getElementById(idName).innerText = localStorage[level] || 0;
}

function resultCollection() {
  if(degreeOfDifficulty === "easy" && score> (localStorage["easy"] || 0)) {
    supremeOverride("easy", "easyResult")
  } else if (degreeOfDifficulty === "normal" && score > (localStorage["normal"] || 0)) {
    console.log("a")
    supremeOverride("normal", "normalResult")
  } else if (degreeOfDifficulty === "difficult" && score > (localStorage["difficult"] || 0)) {
    supremeOverride("difficult", "difficultResult")
  }
  scoreTableDraw("easyResult", "easy");
  scoreTableDraw("normalResult", "normal");
  scoreTableDraw("difficultResult", "difficult");
}

//データを削除するでローカルストレージクリア
document.getElementById("clear").addEventListener('click',function clear() {
  localStorage.clear();
  location.reload();
});




