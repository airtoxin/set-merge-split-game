import { Stage } from "./StageGenerator";
import { isEqual, sortBy, identity } from "lodash/fp";

export class StageSolver {
  constructor(private stage: Stage) {}

  isSolved(mergedNumbers: number[]): boolean {
    const sorter = sortBy(identity);
    return isEqual(sorter(mergedNumbers), sorter(this.stage.answer));
  }
}
