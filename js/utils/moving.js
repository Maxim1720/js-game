class MovableElement {
    #element;
    #speed;
    #xdir;
    #ydir;
  
    constructor(props) {
      this.#element = props.element;
      this.#speed = props.speed;
      this.#xdir = 1;
      this.#ydir = 1;
    }
  
    set speed(speed) {
      this.#speed = speed;
    }
  
    get speed() {
      return this.#speed;
    }
  
    get element() {
      return this.#element;
    }
  
    get xdir() {
      return this.#xdir;
    }
  
    get ydir() {
      return this.#ydir;
    }
  
    revertX() {
      this.#xdir *= -1;
    }
    revertY() {
      this.#ydir *= -1;
    }
  }
  
  class ElementMover {
    #movableElement;
    #xDir;
    #yDir;
    constructor(props) {
      this.#movableElement = props.movableElement;
      this.#xDir = this.#yDir = 1;
    }
  
    mvX() {
      this.#movableElement.element.style.marginLeft = this.#mv(
        this.#movableElement.element.style.marginLeft,
        this.#xDir
      );
    }
    mvY() {
      this.#movableElement.element.style.marginTop = this.#mv(
        this.#movableElement.element.style.marginTop,
        this.#yDir
      );
    }
  
    #mv(margin, direction) {
      return (
        Number(this.#getMarginNumberValue(margin)) +
        Number(this.#movableElement.speed) * Number(direction) +
        "px"
      );
    }
  
    #getMarginNumberValue(marginProp) {
      return marginProp.toString()
        ? marginProp.match("-?[0-9]+(.[0-9]+)?")[0]
        : 0;
    }
  
    revertX() {
      this.#xDir *= -1;
    }
    revertY() {
      this.#yDir *= -1;
    }
  }
  
  class BorderConnectionChecker {
    #parent;
    #child;
  
    constructor(parent, child) {
      this.#child = child;
      this.#parent = parent;
    }
  
    xConnected() {
      const childRect = this.#child.getBoundingClientRect();
      const parentRect = this.#parent.getBoundingClientRect();
      return (
        this.#left(childRect) <= this.#left(parentRect) ||
        this.#right(childRect) >= this.#right(parentRect)
      );
    }
  
    yConnected() {
      const childRect = this.#child.getBoundingClientRect();
      const parentRect = this.#parent.getBoundingClientRect();
      return (
        this.#top(childRect) <= this.#top(parentRect) ||
        this.#bottom(childRect) >= this.#bottom(parentRect)
      );
    }
  
    #left(rect) {
      return rect.x;
    }
    #right(rect) {
      return rect.right;
    }
    #top(rect) {
      return rect.y;
    }
    #bottom(rect) {
      return rect.bottom;
    }
  }
  
  class GameBoxMover {
    #elementMover;
    #borderChecker;
    #angleConnectionAction;

    constructor(props) {
      this.#elementMover = props.elementMover;
      this.#borderChecker = props.borderChecker;
      this.#angleConnectionAction = props.angleConnectionAction;
    }
  
    move() {
      this.#changeDirection();
      this.#elementMover.mvX();
      this.#elementMover.mvY();
    }
  
    #changeDirection() {
      let connectCount = 0;
  
      if (this.#borderChecker.xConnected()) {
        console.log("x connected");
        this.#elementMover.revertX();
        connectCount++;
      }
  
      if (this.#borderChecker.yConnected()) {
        console.log("y connected");
        this.#elementMover.revertY();
        connectCount++;
      }
  
      if (connectCount > 1) {
        // counter.innerHTML = Number(counter.innerHTML) + 1;
        this.#angleConnectionAction();
      }
      console.log("connect count = " + connectCount);
    }

    
  }

  export {ElementMover, MovableElement, GameBoxMover, BorderConnectionChecker};