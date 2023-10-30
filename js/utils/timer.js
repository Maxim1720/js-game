class TimerOutputer {
    #timerElement;
    #currentDate;
  
    constructor(props) {
      this.#timerElement = props.timerElement;
      this.#currentDate = new Date();
    }
  
    update() {
      this.#currentDate = new Date();
    }
  
    setTimeToElementInner() {
      let betweenDate = new Date(Date.now() - this.#currentDate.getTime());
      this.#timerElement.innerText = String(betweenDate.getMinutes() + ":" + betweenDate.getSeconds());
    }
  }

  export {TimerOutputer};