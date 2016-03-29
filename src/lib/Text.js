import wordwrap from 'word-wrap';

export const LINE_LENGTH = 34;

export let wrap = text => wordwrap(text, {width: LINE_LENGTH});
export let toLines = text => wrap(text).split('\n');
export let toParagraphs = text => text.split('//');

export let noLines = text => toLines(text).length;
export let noParagraphs = text => toParagraphs(text).length;

export let textMachines = {
  sequence: text => state => {
    let nextState = state === null ? 0 : state + 1;
    return {
      nextState,
      text: text.sequence[nextState]
    };
  }
};

export let makeTextMachine = text => textMachines[text.type](text);

export let getTextMachineForTalker = texts => talker => {
  let text = texts[talker.properties.text];
  return makeTextMachine(text);
};

export let startNewTextFrame = texts => talker => state => {
  let textMachine = getTextMachineForTalker(texts)(talker);

  let {text, nextState: nextModalTextState} = textMachine(state.modalTextState);
  if (text) {
    return { modalState: 'ANIMATING', modalText: wrap(text), modalTextState: nextModalTextState, textStep: 0 };
  } else {
    return { modalState: 'HIDDEN', modalTextState: null, textStep: 0 };
  }
};

export let showFullTextFrame = state => {
  return { modalState: 'HOLD', textStep: (state.modalText.length + 1) };
};

export let stepTextFrameAnimation = state => {
  if (state.textStep == state.modalText.length) {
    return { modalState: 'HOLD', textStep: (state.modalText.length + 1) };
  } else {
    return { textStep: state.textStep + 1 };
  }
};
