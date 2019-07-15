import { chunk, shuffle } from "lodash/fp";

export type Stage = {
  numbers: number[];
  answer: number[];
};

export class StageGenerator {
  constructor(private sourceSize: number, private mergedSize: number) {
    if (mergedSize * 2 > sourceSize)
      throw new Error("mergedSize should be smaller than half of sourceSize.");
  }

  generateStage(): Stage {
    console.log("@1", 1);
    const numbers = Array.from(Array(this.sourceSize)).map(() =>
      Math.floor(Math.random() * 15)
    );
    const [merging, rest = []] = chunk(this.mergedSize * 2)(shuffle(numbers));
    const answer = chunk(2)(shuffle(merging))
      .map(([a, b]) => a + b)
      .concat(rest);

    return {
      numbers,
      answer
    };
  }
}
