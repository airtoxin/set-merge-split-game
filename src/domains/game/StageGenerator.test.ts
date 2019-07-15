import "jest";
import { StageGenerator } from "./StageGenerator";
import { sum } from "lodash";

describe("StageGenerator", () => {
  it("stage を生成すること", () => {
    const generated = new StageGenerator(2, 1).generateStage();
    expect(generated.answer).toEqual([sum(generated.numbers)]);
  });
});
