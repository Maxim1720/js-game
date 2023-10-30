class CounterOutputer {
    #element;
    
    constructor(props){
        this.#element = props.counterElement;
    }

    updateValue(){
        this.#element.innerHTML = 
        Number(this.#getValue())+1;
    }

    #getValue(){
        return this.#element.innerHTML;
    }
}

export {CounterOutputer};