class ElementParser {
  #id;
  constructor(id) {
    this.#id = id;
  }
  parse() {
    return document.getElementById(this.#id);
  }
}

class ElementRemover {
  #element;
  constructor(element) {
    this.#element = element;
  }
  remove() {
    this.#element.style.display = "none";
  }
}

export {ElementParser, ElementRemover};