'use babel';

export default class GifDisplay {

  constructor(url, controller) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('gif_display');
    //Create img element
    const gif = document.createElement('img');
    gif.src = url;
    gif.classList.add('gif');

    gif.addEventListener('click', (e) => {
      controller.closeGif();
    });

    this.element.appendChild(gif);
  }

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
