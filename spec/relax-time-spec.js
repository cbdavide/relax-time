'use babel';

import RelaxTime from '../lib/relax-time';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('RelaxTime', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('relax-time');
  });

  describe('when the relax-time:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.relax-time')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'relax-time:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.relax-time')).toExist();

        let relaxTimeElement = workspaceElement.querySelector('.relax-time');
        expect(relaxTimeElement).toExist();

        let relaxTimePanel = atom.workspace.panelForItem(relaxTimeElement);
        expect(relaxTimePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'relax-time:toggle');
        expect(relaxTimePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.relax-time')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'relax-time:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let relaxTimeElement = workspaceElement.querySelector('.relax-time');
        expect(relaxTimeElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'relax-time:toggle');
        expect(relaxTimeElement).not.toBeVisible();
      });
    });
  });
});
