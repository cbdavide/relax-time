'use babel';

import RelaxTimeView from './relax-time-view';
import { CompositeDisposable } from 'atom';

export default {

  relaxTimeView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.relaxTimeView = new RelaxTimeView(state.relaxTimeViewState);
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

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.relaxTimeView.destroy();
  },

  serialize() {
    return {
      relaxTimeViewState: this.relaxTimeView.serialize()
    };
  },

  toggle() {
    console.log('RelaxTime was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
