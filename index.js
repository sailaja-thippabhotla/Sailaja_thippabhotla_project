const getSlope = (x1, x2, y1, y2) => {
    return (y2 - y1) / (x2 - x1);
}


var m = 1.8;
var c = 0;


var Background;
var mainCar;
var oppositeCar;
var RoadImage1;
var RoadImage2;
var RoadImage3;
var RoadImage4;
var oppositeCar2;
var oppositeCar3;
var mainMenu;
var instrScreen;
var loseScreen;
var winScreen;


var oppositeCarLeftImage;
var oppositeCar2LeftImage;
var oppositeCar3LeftImage;

var oppositeCarRightImage;
var oppositeCar2RightImage;
var oppositeCar3RightImage;

var count1;
var count2;
var count3;

var finishLineImage;


var mainCarLeft;
var mainCarRight;

var finished = true;



var Pole;

var countTotal;
var moveFinished = true;
var countCalls;
var speed;
var speed2;
var speed3;
var poleSpeed;
var gamePlaySpeed;
var slowSpeed;

var leftObstacleArr = [oppositeCarLeftImage, oppositeCar2LeftImage, oppositeCar3LeftImage];
var middleObstacleArr = [oppositeCar, oppositeCar2, oppositeCar3];
var rightObstacleArr = [oppositeCarRightImage, oppositeCar2RightImage, oppositeCar3RightImage];

var leftObstacle;
var middleObstacle;
var rightObstacle;

var obstacles = [leftObstacle, middleObstacle, rightObstacle];

var centerCar;
var carCount;
var finish;

var obstacle2Flag = false;
var obstacle3Flag = false;

var count;
var left = true;
var mouseTimer;
var clickEve;
var roadImageArr = [RoadImage1, RoadImage2, RoadImage3, RoadImage4];

var timeRemaining = 20;
var looseFlag = 0;
var acceleraiton = 1;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight

var initRoadImage;

var finishPos;
var switchScreen;


var pressHoldEvent = new CustomEvent("pressHold");

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
    return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

var leftSwipe = false;
var rightSwipe = false;

function handleTouchMove(evt) {
    if (!xDown || !yDown) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
        if (xDiff > 0) {
            moveLeft();
        } else {
            moveRight();
            /* right swipe */
        }
    } else {
        if (yDiff > 0) {
            /* up swipe */
        } else {
            /* down swipe */
        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};


function moveLeft() {

    console.log("enter", mainCarPos.x)

    if (Math.floor(mainCarPos.x) < Math.floor(0.25 * ctx.canvas.width)) {
        console.log('cant go')
        return;
    }
        

    if (Math.floor(mainCarPos.y - oppositeCarPos2.y) > Math.floor(-0.2 * ctx.canvas.height) && Math.floor(mainCarPos.y - oppositeCarPos2.y) < Math.floor(0.125 * ctx.canvas.height) && Math.floor(mainCarPos.x) > Math.floor(0.25 * ctx.canvas.width)) {
        return;
    }

    if (Math.floor(mainCarPos.y - oppositeCarPos.y) > Math.floor(-0.075 * ctx.canvas.height) && Math.floor(mainCarPos.y - oppositeCarPos.y) < Math.floor(0.125 * ctx.canvas.height) && Math.floor(mainCarPos.x) == Math.floor(0.25 * ctx.canvas.width)) {
        return;
    }

    finished = false;

    finalX = mainCarPos.x - (Math.floor(Math.floor(0.4 * ctx.canvas.width)));
    moveFinished = false;

    return;
}

function moveRight() {
    if ((mainCarPos.x+10) >= Math.floor(0.65 * ctx.canvas.width))
        return;
        
    if (Math.floor(mainCarPos.y - oppositeCarPos2.y) > Math.floor(-0.25 * ctx.canvas.height) && Math.floor(mainCarPos.y - oppositeCarPos2.y) < Math.floor(0.125 * ctx.canvas.height) && Math.floor(mainCarPos.x) < Math.floor(0.25 * ctx.canvas.width)) {
        return;
    }

    // console.log()
    if (Math.floor(mainCarPos.y - oppositeCarPos3.y) > Math.floor(-0.15 * ctx.canvas.height) && Math.floor(mainCarPos.y - oppositeCarPos3.y) < Math.floor(0.125 * ctx.canvas.height) && Math.floor(mainCarPos.x) >= Math.floor(0.25 * ctx.canvas.width)) {
        return;
    }
    
    finished = false;
    finalX = mainCarPos.x + Math.floor(Math.floor(0.4 * ctx.canvas.width));
    moveFinished = false;
    // mainCarPos.x += 150;
    return;
}

var polePos;
var polePos3;
var polePos4;
var polePos2;
var oppositeCarPos;
var oppositeCarPos2;
var oppositeCarPos3;
var mainCarPos;
var finalX;
var oppositeCarPosFinal;


function initialiseVariable() {

    count = 0;

    obstacle2Flag = false;
    obstacle3Flag = false;

    left = true;

    looseFlag = 0;

    leftObstacle = leftObstacleArr[0];
    middleObstacle = middleObstacleArr[0];
    rightObstacle = rightObstacleArr[0];


    countTotal = 0;
    countCalls = 0;
    speed = 1;
    speed2 = 1;
    speed3 = 0.5;
    poleSpeed = 1;
    gamePlaySpeed = 2;
    slowSpeed = 3;

    carCount = 0;

    switchScreen = 0;
    polePos = {
        x: 0.3 * ctx.canvas.width,
        y: 0.3875 * ctx.canvas.height,
        width: ctx.canvas.width * 0.11,
        height: ctx.canvas.height * 0.0625
    }

    finishPos = {
        x: 0.33 * ctx.canvas.width,
        y: 0.425 * ctx.canvas.height,
        width: 0.267 * ctx.canvas.width,
        height: ctx.canvas.height * 0.0625
    }

    polePos3 = {
        x: 0.02 * ctx.canvas.width,
        y: 0.5 * ctx.canvas.height,
        width: 0.22 * ctx.canvas.width,
        height: 0.125 * ctx.canvas.height
    }

    polePos4 = {
        x: 0.55 * ctx.canvas.width,
        y: 0.3875 * ctx.canvas.height,
        width: 0.11 * ctx.canvas.width,
        height: ctx.canvas.height * 0.0625
    }

    polePos2 = {
        x: 0.733 * ctx.canvas.width,
        y: 0.5 * ctx.canvas.height,
        width: 0.11 * ctx.canvas.width,
        height: 0.125 * ctx.canvas.height
    }



    oppositeCarPos = {
        x: 0.37 * ctx.canvas.width,
        y: 0.4375 * ctx.canvas.height,
        width: 0.055 * ctx.canvas.width,
        height: 0.03125 * ctx.canvas.height
    }

    oppositeCarPos2 = {
        x: 0.433 * ctx.canvas.width,
        y: 0.4375 * ctx.canvas.height,
        width: 0.055 * ctx.canvas.width,
        height: 0.03125 * ctx.canvas.height
    }

    oppositeCarPos3 = {
        x: 0.5177 * ctx.canvas.width,
        y: 0.4375 * ctx.canvas.height,
        width: 0.055 * ctx.canvas.width,
        height: 0.03125 * ctx.canvas.height
    }

    mainCarPos = {
        x: Math.floor(0.25 * ctx.canvas.width),
        y: Math.floor(0.6875 * ctx.canvas.height),
        width: 0.42 * ctx.canvas.width, 
        height: 0.2375 * ctx.canvas.height
    }

    timeRemaining = 20;

    finalX = mainCarPos.x;

    oppositeCarPosFinal = {
        x: Math.floor(0.4 * ctx.canvas.width),
        y: 0.5 * ctx.canvas.height
    }

}


function imageOnLoad() {
    count++;
    // console.log(count);
    if (count == 11) {
        gameLoop();
    }
}
var firedRight = false;
var firedLeft = false;

window.onkeydown = function (event) {
    
        switch (event.keyCode) {
            case 37:
                if (!firedLeft) {
                    firedLeft = true;
                    moveLeft();
                    
                }
                break; 
            case 39:
                if (!firedRight) {
                    firedRight = true;
                    console.log("called")
                    moveRight();  
                }
                break;
            case 38:
                accelerate();
                break;
        }
}

window.onkeyup = function (event) {
    if (event.keyCode == 39) {
        firedRight = false;
    } else if (event.keyCode == 37) {
        firedLeft = false;
    } else if (event.keyCode == 38) {
        decelerate();
    }
}

const FbPlayableAd = {
    onCTAClick() {
        window.parent.postMessage("onCTAClick", "*");
    },
};


function init() {


    Background = document.getElementById("Background");
    mainCar = document.getElementById("mainCar");
    oppositeCar = document.getElementById("oppositeCar");
    RoadImage1 = document.getElementById("RoadImage1");
    RoadImage2 = document.getElementById("RoadImage2");
    RoadImage3 = document.getElementById("RoadImage3");
    RoadImage4 = document.getElementById("RoadImage4");
    oppositeCar2 = document.getElementById("oppositeCar2");
    oppositeCar3 = document.getElementById("oppositeCar3");
    mainMenu = document.getElementById("mainMenu");
    instrScreen = document.getElementById("instrScreen");
    loseScreen = document.getElementById("loseScreen");
    winScreen = document.getElementById("winScreen");


    oppositeCarLeftImage = document.getElementById("oppositeCarLeftImage");
    oppositeCar2LeftImage = document.getElementById("oppositeCar2LeftImage");
    oppositeCar3LeftImage = document.getElementById("oppositeCar3LeftImage");

    oppositeCarRightImage = document.getElementById("oppositeCarRightImage");
    oppositeCar2RightImage = document.getElementById("oppositeCar2RightImage");
    oppositeCar3RightImage = document.getElementById("oppositeCar3RightImage");

    count1 = document.getElementById('count1');
    count2 = document.getElementById('count2');
    count3 = document.getElementById('count3');

    finishLineImage = document.getElementById("finishLineImage");


    mainCarLeft = document.getElementById("mainCarLeft");
    mainCarRight = document.getElementById("mainCarRight");

    initRoadImage = RoadImage1;

    leftObstacleArr = [oppositeCarLeftImage, oppositeCar2LeftImage, oppositeCar3LeftImage];
    middleObstacleArr = [oppositeCar, oppositeCar2, oppositeCar3];
    rightObstacleArr = [oppositeCarRightImage, oppositeCar2RightImage, oppositeCar3RightImage];



    obstacles = [leftObstacle, middleObstacle, rightObstacle];
    roadImageArr = [RoadImage1, RoadImage2, RoadImage3, RoadImage4];



    Pole = document.getElementById("Pole")

    initialiseVariable();


    //  mainMenu.width = canvas.width;
    centerCar = mainCar;
    gameLoop();

}

function playGame() {
    const button = document.getElementById('play');
    button.style.display = "none";
    switchScreen = 1;
}

function loadInstruction() {
    ctx.drawImage(instrScreen, 0, 0, ctx.canvas.width, ctx.canvas.height);
    setTimeout(function () {
        switchScreen = 8;
        const accelerateButton = document.getElementById('accelerate');
        accelerateButton.style.display = "block";
    }, 2000);
}

function moveObjectInStraightLine(ctx, initPos, finalPos) {
    const m = getSlope(initPos.x, finalPos.x, initPos.y, finalPos.y);

}

function loadIntro() {
    ctx.drawImage(mainMenu, 0, 0, ctx.canvas.width, ctx.canvas.height);
    const playAgain = document.getElementById('play');
    playAgain.style.display = 'block';
}


function renderObstacle(obstacleIdentifier, obsPos) {
    ctx.drawImage(obstacleIdentifier, obsPos.x, obsPos.y, obsPos.width, obsPos.height);
}

function loadGame() {
    // Background
    ctx.drawImage(Background, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    // ctx.translate(240, 400);


    // road    
    // ctx.drawImage(initRoadImage, -305, 215, 1024, 597);
    // ctx.save();

    ctx.drawImage(initRoadImage, -0.68 * ctx.canvas.width, 0.268 * ctx.canvas.height, ctx.canvas.width * 2.27, 0.75 * ctx.canvas.height);
    ctx.save();


    // drawFinish();

    if (finish) {
        drawFinish();
    }

    ctx.drawImage(Pole, polePos.x, polePos.y, polePos.width, polePos.height);

    ctx.drawImage(Pole, polePos3.x, polePos3.y, polePos3.width, polePos3.height);

    ctx.drawImage(Pole, polePos4.x, polePos4.y, polePos4.width, polePos4.height);

    ctx.drawImage(Pole, polePos2.x, polePos2.y, polePos2.width, polePos2.height);

    //obstacle

    ctx.drawImage(leftObstacle, oppositeCarPos.x, oppositeCarPos.y, oppositeCarPos.width, oppositeCarPos.height);
    ctx.save();

    // ctx.drawImage(leftObstacle, oppositeCarPos.x, oppositeCarPos.y, oppositeCarPos.width, oppositeCarPos.height);
    // ctx.save();



    if (!obstacle2Flag)
        window.setTimeout(function () {
            obstacle2Flag = true;
            ctx.drawImage(middleObstacle, oppositeCarPos2.x, oppositeCarPos2.y, oppositeCarPos2.width, oppositeCarPos2.height);
        }, 3000 / gamePlaySpeed);
    else
        ctx.drawImage(middleObstacle, oppositeCarPos2.x, oppositeCarPos2.y, oppositeCarPos2.width, oppositeCarPos2.height);

    if (!obstacle3Flag)
        window.setTimeout(function () {
            obstacle3Flag = true;
            ctx.drawImage(rightObstacle, oppositeCarPos3.x, oppositeCarPos3.y, oppositeCarPos3.width, oppositeCarPos3.height);
        }, 9000 / gamePlaySpeed);
    else
        ctx.drawImage(rightObstacle, oppositeCarPos3.x, oppositeCarPos3.y, oppositeCarPos3.width, oppositeCarPos3.height);
    ctx.save();


    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(String(timeRemaining) + ' sec', 0.5 * ctx.canvas.width, 0.125 * ctx.canvas.height);

    if (looseFlag == 1) {
        // console.log(true);
        ctx.font = "30px Arial";
        ctx.fillText("You Loose", 220, 400);
    } else if (looseFlag == 2) {
        ctx.font = "30px Arial";
        ctx.fillText("You Win", 220, 400);
    }

    ctx.drawImage(mainCar, mainCarPos.x, mainCarPos.y, 0.42 * ctx.canvas.width, 0.2375 * ctx.canvas.height);

    ctx.restore();
}


function youLose() {
    ctx.drawImage(loseScreen, 0, 0, ctx.canvas.width, ctx.canvas.height);
    const playAgain = document.getElementById('playAgain');
    playAgain.style.display = 'block';

    const accel = document.getElementById('accelerate');
    accel.style.display = 'none';
}

function youWin() {
    ctx.drawImage(winScreen, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.font = "bold 38px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    // ctx.fillText('20', 150, 388);
    ctx.fillText(String(30 - timeRemaining), 0.33 * ctx.canvas.width, 0.485 * ctx.canvas.height);
    const playAgain = document.getElementById('playAgain');
    playAgain.style.display = 'block';

    const accel = document.getElementById('accelerate');
    accel.style.display = 'none';
}

function playAgain() {
    location.reload();
    // const playAgain = document.getElementById('playAgain');
    playAgain.style.display = 'none';
}

function staticBack() {
    ctx.drawImage(Background, 0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();

    ctx.drawImage(initRoadImage, -0.68 * ctx.canvas.width, 0.268 * ctx.canvas.height, ctx.canvas.width * 2.27, 0.75 * ctx.canvas.height);
    ctx.save();

    ctx.drawImage(Pole, polePos.x, polePos.y, polePos.width, polePos.height);

    ctx.drawImage(Pole, polePos3.x, polePos3.y, polePos3.width, polePos3.height);

    ctx.drawImage(Pole, polePos4.x, polePos4.y, polePos4.width, polePos4.height);

    ctx.drawImage(Pole, polePos2.x, polePos2.y, polePos2.width, polePos2.height);

    ctx.drawImage(mainCar, mainCarPos.x, mainCarPos.y, 0.42 * ctx.canvas.width, 0.2375 * ctx.canvas.height);

    ctx.restore();
}

function countDown3() {
    staticBack();
    ctx.drawImage(count3, 0.288 * ctx.canvas.width, 0.375 * ctx.canvas.height);
}

function countDown2 () {
    staticBack();
    ctx.drawImage(count2, 0.288 * ctx.canvas.width, 0.375 * ctx.canvas.height);
}

function countDown1() {
    staticBack();
    ctx.drawImage(count1, 0.288 * ctx.canvas.width, 0.375 * ctx.canvas.height);
}

function draw() {

    // ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // loadGame();
    // youWin();

    switch (switchScreen) {
        case 0:
            loadIntro();
            break;
        case 1:
            loadInstruction();
            break;
        case 2:
            loadGame();
            break;

        case 3:
            youLose();
            break;
        case 4:
            youWin();
            break;
        case 5:
            countDown1();
            break;
        case 6:
            countDown2();
            break;
        case 7:
            countDown3();
            break;
        case 8:
            break;
    }

}

var prevTime;
var initScreenTime;
var initTime

function gameLoop(timeStamp) {
    let t = timeStamp;
    if (switchScreen == 8 || switchScreen == 7 || switchScreen == 6 || switchScreen == 5) {
        t = t - initTime;
        let tt = Math.floor(t / 1000);
        if (tt == 0) {
            switchScreen = 7;
        } else if (tt == 1) {
            switchScreen = 6;
        } else if (tt == 2) {
            switchScreen = 5;
        } else {
            switchScreen = 2;
        }
    } else {
        initTime = timeStamp;
    }


    if (switchScreen == 2) {
        timeStamp = timeStamp - initScreenTime;
        let timeR = Math.floor(timeStamp / 1000);

        if (30 - timeR >= 0) {
            timeRemaining = 30 - timeR;
            looseFlag = 0;
        } else {
            if (carCount < 30 && looseFlag == 0) {
                looseFlag = 1;
                switchScreen = 3;
            }
        }
        update();
    } else {
        initScreenTime = timeStamp;
    }

    draw();
    window.requestAnimationFrame(gameLoop);
}
var temp = [];
function collisionDetection1() {

    if (Math.floor(mainCarPos.y - oppositeCarPos.y) <= Math.floor(0.15 * ctx.canvas.height) && currLen == -1 && Math.floor(mainCarPos.y - oppositeCarPos.y) > (Math.floor(0.05 * ctx.canvas.height))) {
        speed = 0;
        speed2 = 4;
        speed3 = 4;
        return true;
    } else {
        speed = 1;
        return false;
    }

}
function collisionDetection2() {
    // console.log(mainCarPos.x);
    if (Math.floor(mainCarPos.y - oppositeCarPos2.y) <= Math.floor(0.15 * ctx.canvas.height) && currLen == 0 && (mainCarPos.y - oppositeCarPos2.y) > (0.05 * ctx.canvas.height)) {
        speed2 = 0;
        speed = 4;
        speed3 = 4;
        return true;
    } else {
        speed2 = 1;
        return false;
    }
}

function collisionDetection3() {

    // console.log((mainCarPos.y-oppositeCarPos3.y));

    // console.log(Math.floor(mainCarPos.x), Math.floor(ctx.canvas.width * 0.65));

    if (Math.floor(mainCarPos.y - oppositeCarPos3.y) <= Math.floor(0.15 * ctx.canvas.height) && currLen == 1 && Math.floor(mainCarPos.y - oppositeCarPos3.y) > Math.floor(0.05 * ctx.canvas.height)) {
        speed3 = 0;
        speed2 = 4;
        speed1 = 4;
        return true;
    } else {
        speed3 = 1;
        return false;
    }

    // if ((mainCarPos.y - oppositeCarPos3.y) <= 120 && (mainCarPos.x >= 295) && (mainCarPos.y - oppositeCarPos3.y) > 40) {
    //     speed3 = 0;
    //     speed2 = 4;
    //     speed1 = 4;

    //     return true;
    // } else {
    //     speed3 = 1;
    //     return false;
    // }
}
var accelerateFn;

function accelerate(event) {
    if (event)
        event.preventDefault();
    // console.log('sdfas');
    acceleraiton = 2;
    slowSpeed = 1;
    accelerateFn = setTimeout((event) => {
        accelerate(event);
    }, 200
    );

}

function decelerate() {
    // console.log('asdfasdf');
    
    acceleraiton = 1;
    slowSpeed = 4;
    clearTimeout(accelerateFn);
}

function updateObstacle1() {
    if (oppositeCarPos.y >= (0.75 * ctx.canvas.height)) {
        let randObstacle = leftObstacleArr[Math.floor(Math.random() * 3)];
        // let randObstacle = oppositeCar3;
        leftObstacle = randObstacle;
        carCount++;
        speed = 1
        oppositeCarPos = {
            x: 0.37 * ctx.canvas.width,
            y: 0.4375 * ctx.canvas.height,
            width: 0.055 * ctx.canvas.width,
            height: 0.03125 * ctx.canvas.height
        }

    }

    oppositeCarPos.y += (0.00125 * ctx.canvas.height) * speed * gamePlaySpeed * acceleraiton;
    oppositeCarPos.x -= ((0.0028 * ctx.canvas.width) * speed * gamePlaySpeed * acceleraiton);

    if (speed) {
        oppositeCarPos.width += (0.00177 * ctx.canvas.width) * speed * gamePlaySpeed * acceleraiton;
        oppositeCarPos.height += (0.001 * ctx.canvas.height) * speed * gamePlaySpeed * acceleraiton;
    }
    speed += 1.8;
}
var o2Ended = false;
var o3Ended = false;
function updateObstacle2() {

    if (oppositeCarPos2.y >= (1.7 * ctx.canvas.height)) {
        let randObstacle = middleObstacleArr[Math.floor(Math.random() * 3)];
        // o2Ended = false;
        middleObstacle = randObstacle;
        speed2 = 1;
        carCount++;
        oppositeCarPos2 = {
            x: 0.433 * ctx.canvas.width,
            y: 0.4375 * ctx.canvas.height,
            width: 0.055 * ctx.canvas.width,
            height: 0.03125 * ctx.canvas.height
        }

    }

    oppositeCarPos2.y += (0.00125 * ctx.canvas.height) * speed2 * gamePlaySpeed * acceleraiton;
    oppositeCarPos2.x -= ((0.00067 * ctx.canvas.width) * speed2 * gamePlaySpeed * acceleraiton)
    if (speed2) {
        oppositeCarPos2.width += (0.00177 * ctx.canvas.width *0.85 ) * speed2 * gamePlaySpeed * acceleraiton;
        oppositeCarPos2.height += (0.001 * ctx.canvas.height *0.85) * speed2 * gamePlaySpeed * acceleraiton;
    }
    speed2 += 1.8;
}

function updateObstacle3() {
    // console.log(o2Ended);


    if (oppositeCarPos3.y >= (1.580 * ctx.canvas.height)) {
        let randObstacle = rightObstacleArr[Math.floor(Math.random() * 3)];
        rightObstacle = randObstacle;
        // o3Ended = true;
        speed3 = 1;
        carCount++;
        oppositeCarPos3 = {
            x: 0.5177 * ctx.canvas.width,
            y: 0.4375 * ctx.canvas.height,
            width: 0.055 * ctx.canvas.width,
            height: 0.03125 * ctx.canvas.height
        }

    }

    // console.log('ypos', 1 * speed3 * gamePlaySpeed * acceleraiton);
    oppositeCarPos3.y += (0.00125 * ctx.canvas.height) * speed3 * gamePlaySpeed * acceleraiton;
    oppositeCarPos3.x += ((0.00111 * ctx.canvas.width) * speed3 * gamePlaySpeed * acceleraiton);
    if (speed3) {
        oppositeCarPos3.width += (0.00177 * ctx.canvas.width) * speed3 * gamePlaySpeed * acceleraiton;
        oppositeCarPos3.height += (0.001 * ctx.canvas.height) * speed3 * gamePlaySpeed * acceleraiton;
    }
    speed3 += 1.8;
}

function leftPoleMove(pos) {
    if (pos.y >= 500) {
        pos = {
            x: 0.3 * ctx.canvas.width,
        y: 0.3875 * ctx.canvas.height,
        width: ctx.canvas.width * 0.11,
        height: ctx.canvas.height * 0.0625
        }
    }
    // console.log(poleSpeed);
    pos.x -= (0.0055 * ctx.canvas.width) * poleSpeed * gamePlaySpeed * acceleraiton;
    pos.y += (0.00125 * ctx.canvas.height) * poleSpeed * gamePlaySpeed * acceleraiton;

    if (poleSpeed) {
        pos.width += (0.0022 * ctx.canvas.width) * poleSpeed * gamePlaySpeed * acceleraiton;
        pos.height += (0.00125 * ctx.canvas.height) * poleSpeed * gamePlaySpeed * acceleraiton;
    }
    return pos;
}

function rightPoleMove(pos) {
    if (pos.y >= 800) {
        pos = {
            x: 0.55 * ctx.canvas.width,
            y: 0.3875 * ctx.canvas.height,
            width: 0.11 * ctx.canvas.width,
            height: ctx.canvas.height * 0.0625
        }
    }

    pos.x += (0.0024 * ctx.canvas.width) * poleSpeed * gamePlaySpeed * acceleraiton;
    pos.y += (0.00125 * ctx.canvas.height) * poleSpeed * gamePlaySpeed * acceleraiton;

    if (poleSpeed * gamePlaySpeed) {
        pos.width += (0.0022 * ctx.canvas.width) * poleSpeed * gamePlaySpeed * acceleraiton;
        pos.height += (0.00125 * ctx.canvas.height) * poleSpeed * gamePlaySpeed * acceleraiton;
    }
    return pos;
}

function updatePole() {
    polePos = leftPoleMove(polePos);
    polePos3 = leftPoleMove(polePos3);

    polePos2 = rightPoleMove(polePos2);
    polePos4 = rightPoleMove(polePos4);


}
var steps;
var currLen = 0;

// var finished = true

function moveVehicle() {

        // console.log(mainCarPos.x, finalX)
        if (Math.floor(mainCarPos.x) != Math.floor(finalX)) {
            if (Math.floor(finalX) < Math.floor(mainCarPos.x)) {
                mainCar = mainCarLeft;
                if (mainCarPos.x <= ((Math.floor(0.25 * ctx.canvas.width) - Math.floor(Math.floor(0.4 * ctx.canvas.width))))) {
                    mainCarPos.x = ((Math.floor(0.25 * ctx.canvas.width) - Math.floor(Math.floor(0.4 * ctx.canvas.width))));
                } else {
                    if (!steps) {
                        let fin = Math.abs(finalX);
                        console.log(mainCarPos.x, fin);
                        for (var i =10; i<=fin; i++) {
                            if (Math.abs(mainCarPos.x + fin) % i == 0) {
                                break;
                            }
                        } 
                        steps = i;
                        if (steps> 20) steps=1;
                        console.log("step",steps);
                        // steps = Math.abs(mainCarPos.x - finalX) / 12;
                    }
                    mainCarPos.x -= (Math.floor(0.4 * ctx.canvas.width) / steps);
                }
            } else {
                if (Math.floor(mainCarPos.x) >= Math.floor(0.65 * ctx.canvas.width)) {
                    mainCarPos.x = Math.floor(0.65 * ctx.canvas.width);
                } else {
                    if (!steps) {
                        let fin = Math.abs(finalX);
                        console.log("div",Math.abs(mainCarPos.x - fin));
                        for (var i =5; i<=fin; i++) {
                            if (Math.abs(mainCarPos.x - fin) % i == 0) {
                                break;
                            }
                        } 
                        steps = i;
                    }
                    console.log("steps", steps)
                    if (steps>20) steps = 1;
                    mainCarPos.x += (Math.floor(0.4 * ctx.canvas.width) / steps);
                }
                mainCar = mainCarRight;
            }
        } else {
            // console.log(Math.floor(mainCarPos.x), Math.floor(Math.floor(0.25 * ctx.canvas.width)))
            finished = true;
            if (Math.floor(mainCarPos.x) == Math.floor((Math.floor(0.25 * ctx.canvas.width) - Math.floor(Math.floor(0.4 * ctx.canvas.width))))) {
                currLen = -1;
                mainCar = mainCarRight;
            } else if (Math.floor(mainCarPos.x) > (Math.floor(Math.floor(0.25 * ctx.canvas.width)) + 10)) {
                currLen = 1;
                mainCar = mainCarLeft;
            } else {
                currLen = 0;
                mainCar = centerCar;
            }
        }
    
}

function drawFinish() {
    ctx.drawImage(finishLineImage, finishPos.x, finishPos.y, finishPos.width, finishPos.height);
}

function updateFinishLine() {
    if (finishPos.y >= (0.75 * ctx.canvas.height)) {
        switchScreen = 4;
        looseFlag = 2;
    }

    finishPos.y += (0.00125 * ctx.canvas.height) * speed3 * gamePlaySpeed;
    finishPos.x -= ((0.0024 * ctx.canvas.width) * speed3 * gamePlaySpeed);
    if (speed3) {
        finishPos.width += (0.0055 * ctx.canvas.width) * speed3 * gamePlaySpeed;
        finishPos.height += (0.001 * ctx.canvas.height) * speed3 * gamePlaySpeed;
    }
}
var tempc;

function update() {

    moveVehicle();

    let collide = collisionDetection1();
    let collide2 = collisionDetection2();
    let collide3 = collisionDetection3();
    countCalls++;
    if (collide || collide2 || collide3) {
        gamePlaySpeed = 0.6;
        acceleraiton = 1.5;
        slowSpeed = 20;
        if (collide) {
            speed2 = 5;
            speed3 = 5;
        } else if (collide2) {
            speed = 5;
            speed3 = 5;
        } else {
            speed = 5;
            speed2 = 5;
        }

    } else {
        gamePlaySpeed = 2;
        speed = speed2 = speed3 = 1;
        slowSpeed = 3;
    }

    if (acceleraiton == 2) {
        slowSpeed = 1;
        countTotal++;
    }

    // console.log(slowSpeed);

    if (countCalls % slowSpeed == 0) {
        countTotal++;
    }

    updateObstacle1();

    if (obstacle2Flag) {
        updateObstacle2();
    }
    if (obstacle3Flag) {
        updateObstacle3();
    }

    // updateFinishLine();

    // console.log(carCount);
    if (tempc != carCount) {
        console.log('car passed:', carCount);
        tempc = carCount;
    }

    if (carCount >= 30) {
        finish = true;
        updateFinishLine()
    }

    updatePole();


    if (countTotal) {
        // console.log(roadImageArr[countTotal % (roadImageArr.length-1)]);
        initRoadImage = roadImageArr[countTotal % (roadImageArr.length)];
    }
}

init();