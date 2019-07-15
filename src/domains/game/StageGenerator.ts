import { chunk, shuffle } from "lodash/fp";

export type Stage = {
  numbers: number[];
  answer: number[];
};

export class StageGenerator {
  constructor(
    private sourceSize: number,
    private mergedSize: number,
    private mergeDimensions: number
  ) {
    if (mergedSize * 2 > sourceSize)
      throw new Error("mergedSize should be smaller than half of sourceSize.");
  }

  generateStage(): Stage {
    const numbers = Array.from(Array(this.sourceSize)).map(() =>
      Math.floor(Math.random() * 15)
    );
    const [merging, rest = []] = chunk(this.mergedSize * 2)(shuffle(numbers));
    const answer = chunk(this.mergeDimensions)(shuffle(merging))
      .map(([a, b]) => a + b)
      .concat(rest);

    return {
      numbers,
      answer
    };
  }
}
