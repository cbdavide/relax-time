'use babel';

export default class RelaxTimeView {

  constructor() {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('relax-time');

    // Create message element
    const text_field = document.createElement('input');
    text_field.type = 'number';
    text_field.placeholder = 'Ingresa la cantidad de minutos';
    text_field.classList.add('text_field');
    this.element.appendChild(text_field);
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
