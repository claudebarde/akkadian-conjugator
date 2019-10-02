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
  gParticiple: undefined,
  gPerfect: undefined,
  infoModal: { open: false, verb: undefined, person: undefined },
  activeView: undefined
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
  },
  toggleInfoModal: () => {
    store.update(items => ({
      ...items,
      infoModal: { ...items.infoModal, open: !items.infoModal.open }
    }));
  },
  updateInfoModal: info => {
    store.update(items => ({
      ...items,
      infoModal: { open: info.open, verb: info.verb, person: info.person }
    }));
  },
  updateView: view => {
    store.update(items => ({ ...items, activeView: view }));
  }
};

export default state;
