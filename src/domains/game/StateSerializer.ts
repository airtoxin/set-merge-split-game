import { Stage } from "./StageGenerator";
import * as t from "io-ts";
import { isRight } from "fp-ts/lib/Either";

export type SerializeFormat = {
  normal?: {
    stageNumber: number;
    stage: Stage;
  };
  hard?: {
    stageNumber: number;
    stage: Stage;
  };
};

const Deserializer = t.type({
  normal: t.union([
    t.undefined,
    t.type({
      stageNumber: t.number,
      stage: t.type({
        numbers: t.array(t.number),
        answer: t.array(t.number)
      })
    })
  ]),
  hard: t.union([
    t.undefined,
    t.type({
      stageNumber: t.number,
      stage: t.type({
        numbers: t.array(t.number),
        answer: t.array(t.number)
      })
    })
  ])
});

export class StateSerializer {
  private KEY = "SET-serialized-state";
  constructor(private localStorage: Storage = window.localStorage) {}

  serialize(state: SerializeFormat): void {
    this.localStorage.setItem(
      this.KEY,
      window.btoa(window.btoa(JSON.stringify(state)))
    );
  }

  serializeMode(
    mode: "normal" | "hard",
    state: SerializeFormat["normal" | "hard"]
  ): void {
    const current = this.deserialize() || {};
    this.serialize({ ...current, [mode]: state });
  }

  deserialize(): SerializeFormat | undefined {
    try {
      const item = this.localStorage.getItem(this.KEY);
      if (item) {
        const deserialized = JSON.parse(window.atob(window.atob(item)));
        if (this.validate(deserialized)) {
          return deserialized;
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  private validate(deserialized: any): deserialized is SerializeFormat {
    return isRight(Deserializer.decode(deserialized));
  }
}
