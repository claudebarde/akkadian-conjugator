import { writable } from "svelte/store";

const store = writable({
  rootHighlight: true,
  ventive: false,
  gPreterite: undefined,
  gDurative: undefined,
  gImperative: undefined,
  gPrecative: undefined,
  gVetitive: undefined,
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
