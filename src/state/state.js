import { writable } from "svelte/store";

const store = writable({
  rootHighlight: true,
  ventive: true,
  gPreterite: undefined,
  gDurative: undefined,
  gVerbalAdjective: undefined
});

const state = {
  subscribe: store.subscribe,
  toggleRootHighlighting: () => {
    store.update(items => ({ ...items, rootHighlight: !items.rootHighlight }));
  },
  toggleVentive: () => {
    store.update(items => ({ ...items, ventive: !items.ventive }));
  },
  updateVerb: newForms => {
    store.update(items => ({ ...items, ...newForms }));
  }
};

export default state;
