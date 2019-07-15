import { Stage } from "./StageGenerator";
import { isEqual, sortBy, identity, sum, isEmpty } from "lodash/fp";

export class StageSolver {
  constructor(private stage: Stage) {}

  isSolved(mergedNumbers: number[]): boolean {
    const sorter = sortBy(identity);
    return isEqual(sorter(mergedNumbers), sorter(this.stage.answer));
  }

  solve(): number[][] {
    const results = this.searchAbsoluteSetsLoop();
    if (isEmpty(results.remainingAnswers)) return results.absoluteSets;

    const bruteForceResults = this.searchBruteForce(
      results.candidates,
      results.remainingAnswers
    );

    return results.absoluteSets.concat(bruteForceResults);
  }

  private searchAbsoluteSetsLoop(): {
    absoluteSets: number[][];
    candidates: number[];
    remainingAnswers: number[];
  } {
    const ass: number[][] = [];
    let cands = [...this.stage.numbers];
    let anss = [...this.stage.answer];
    while (1) {
      const {
        absoluteSets,
        candidates,
        remainingAnswers
      } = this.searchAbsoluteSets(cands, anss);
      ass.push(...absoluteSets);
      cands = candidates;
      anss = remainingAnswers;
      if (isEmpty(absoluteSets)) break;
    }

    return {
      absoluteSets: ass,
      candidates: cands,
      remainingAnswers: anss
    };
  }

  private searchAbsoluteSets(
    candidates: number[],
    remainingAnswers: number[]
  ): {
    absoluteSets: number[][];
    candidates: number[];
    remainingAnswers: number[];
  } {
    const absoluteSets: number[][] = [];
    const resultCandidates = [...candidates];
    const resultRemainingAnswers = [...remainingAnswers];

    for (let i = 0; i < candidates.length; i++) {
      let foundSet: null | number[] = null;
      search: {
        for (const remainingAnswer of resultRemainingAnswers) {
          if (
            candidates.findIndex(c => remainingAnswer - candidates[i] === c) !==
            -1
          ) {
            if (foundSet) break search; // 既にセットが見つかっているならばセットの構築に複数の可能性がある場合なので処理をスキップする
            foundSet = [candidates[i], remainingAnswer - candidates[i]];
          }
        }
        if (foundSet) {
          absoluteSets.push(foundSet);
          const ans = sum(foundSet);
          for (const f of foundSet) {
            candidates.splice(candidates.indexOf(f), 1);
          }
          resultRemainingAnswers.splice(resultRemainingAnswers.indexOf(ans), 1);
        }
      }
    }

    return {
      absoluteSets,
      candidates: resultCandidates,
      remainingAnswers: resultRemainingAnswers
    };
  }

  private searchBruteForce(
    candidates: number[],
    remainingAnswers: number[]
  ): number[][] {
    // TODO
    return [];
  }
}
