'use babel';

export default class RelaxTimeView {

  constructor(controller) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('relax_time');
    this.times = [1, 5, 15, 30, 60];

    for(let time of this.times) {
      const boton = document.createElement('button');
      boton.textContent = time;
      boton.classList.add('boton');

      boton.addEventListener('click', function(e) {
        controller.listener(e.target.textContent);
      })

      this.element.appendChild(boton);
    }
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
