import { writable } from "svelte/store";

const blankState = {
  rootHighlight: true,
  ventive: false,
  gPreterite: undefined,
  gDurative: undefined,
  gImperative: undefined,
  gPrecative: undefined,
  gVetitive: undefined,
  gVerbalAdjective: undefined,
  gPerfect: undefined
};

const store = writable(blankState);

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
  },
  setVerb: newForms => {
    store.set({ ...blankState, ...newForms });
  }
};

export default state;
