import { TimerOutputer } from "./utils/timer.js";
import { ElementParser, ElementRemover } from "./utils/element.js";
import { BorderConnectionChecker, ElementMover, MovableElement, GameBoxMover } from "./utils/moving.js";
import { CounterOutputer } from "./utils/counter.js";

const startBtn = new ElementParser("start-btn").parse();
const pauseBtn = new ElementParser("pause-btn").parse();

const timer = new ElementParser("timer").parse();
const counter = new ElementParser("angle-count").parse();

const gameBox = new ElementParser("fly-box").parse();
const place = new ElementParser("game-place").parse();

let step = 2;

gameBox.style.marginLeft = (Math.floor(Math.random()*200)-100) + "px";
gameBox.style.marginTop = (Math.floor(Math.random()*200)-100) + "px" ;

let counterOut = new CounterOutputer({
    counterElement: counter
});

let movableElement = new MovableElement({
  speed: step,
  element: gameBox,
});
let borderChecker = new BorderConnectionChecker(place, gameBox);


let movingElement = new ElementMover({
    movableElement: movableElement
});

let timerOutputer = new TimerOutputer({
    timerElement: timer
});


let gameBoxMover = new GameBoxMover({
    elementMover: movingElement,
    borderChecker: borderChecker,
    angleConnectionAction: ()=>{counterOut.updateValue()}
});

let timeCounterInterval = null;
let gameBoxMoveInterval = null;

startBtn.onclick = () => {
  new ElementRemover(startBtn).remove();
  pauseBtn.style.display = "block";
  timeCounterInterval = setInterval(() => {
    timerOutputer.setTimeToElementInner();
  });
  gameBoxMoveInterval = setInterval(()=>{
    gameBoxMover.move();
  });
};

pauseBtn.onclick = () => {
  clearInterval(timeCounterInterval);
  clearInterval(gameBoxMoveInterval);
  new ElementRemover(pauseBtn).remove();
  startBtn.style.display = "block";
};
