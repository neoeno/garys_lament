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
