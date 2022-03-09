import WorldleSolution from './WorldleSolution';

const SHARE_SNIPPET_REGEXP = /Wordle (?<gameNumber>[\d]+)/;

class WorldleRecap {
  constructor(gameIndex, guesses) {
    this.solution = new WorldleSolution(gameIndex);
    this.guesses = guesses;
    Object.freeze(this);
  }

  static fromShareText(sharedSnippet) {
    const [header, ...blocks] = sharedSnippet.split(/[\n]+/)
    const { gameNumber }  = header.match(SHARE_SNIPPET_REGEXP).groups;
    const gameIndex = new Number(gameNumber);
    const guesses = blocks.map((guess) => {
      return guess
        .replaceAll('⬛', 1)
        .replaceAll('⬜', 1)
        .replaceAll('🟨', 2)
        .replaceAll('🟩', 3)
        .split('')
        .map(Number);
    });
    return new this(gameIndex, guesses)
  }
}

export default WorldleRecap;
