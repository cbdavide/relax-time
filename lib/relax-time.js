'use babel';

import RelaxTimeView from './relax-time-view';
import GifDisplay from './gif-display';
import giphy from './GiphyAPI';
import { CompositeDisposable } from 'atom';


export default {

  relaxTimeView: null,
  gifDisplay: null,
  modalPanel: null,
  gifModalPanel: null,
  subscriptions: null,

  activate() {
    this.relaxTimeView = new RelaxTimeView(this);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.relaxTimeView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'relax-time:toggle': () => this.toggle()
    }));
  },

  listener(time) {
    this.modalPanel.hide();
    setTimeout(()=> {

      giphy()
      .then(json => {
        this.createGifModalPanel(json.data.image_url);
      })
      .catch(err => {
        console.log(err);
      })

    }, time * 1);
  },

  createGifModalPanel(url) {
    this.gifDisplay = new GifDisplay(url, this);

    this.gifModalPanel = atom.workspace.addModalPanel({
      item: this.gifDisplay.getElement(),
      visible: true
    });
  },

  closeGif() {
    this.gifModalPanel.destroy();
  },

  deactivate() {
    this.modalPanel.destroy();
    this.gifModalPanel.destroy();
    this.subscriptions.dispose();
    this.relaxTimeView.destroy();
    this.gifDisplay.destroy();
  },

  toggle() {
    this.modalPanel.show()
  }
};
