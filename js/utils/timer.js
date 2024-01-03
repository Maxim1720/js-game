class TimerOutputer {
    #timerElement;
    #currentDate;
  
    constructor(props) {
      this.#timerElement = props.timerElement;
      this.#currentDate = new Date();
      // this.#currentDate = new Date(2023,10,31,15,6,24,0);
    }
  
    update() {
      this.#currentDate = new Date();
    }
  
    setTimeToElementInner() {
      const calculatedDate = this.#getCalculatedDate();
      calculatedDate.setMinutes(calculatedDate.getMinutes() + calculatedDate.getTimezoneOffset());
      this.#timerElement.innerText = calculatedDate.toLocaleTimeString();
    }

    #getCalculatedDate(){
      console.log("now: " + new Date());
      console.log("fixed: " + this.#currentDate);
      return new Date(new Date().getTime() - this.#currentDate.getTime());
    }
  }

  export {TimerOutputer};