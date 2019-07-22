import { Stage } from "./StageGenerator";

export type SerializeFormat = {
  stageNumber: number;
  stage: Stage;
};

export class StateSerializer {
  private KEY = "SET-serialized-state";
  constructor(private localStorage: Storage = window.localStorage) {}

  serialize(state: SerializeFormat): void {
    this.localStorage.setItem(
      this.KEY,
      window.btoa(window.btoa(JSON.stringify(state)))
    );
  }

  deserialize(): SerializeFormat | undefined {
    try {
      const item = this.localStorage.getItem(this.KEY);
      if (item) {
        return JSON.parse(window.atob(window.atob(item)));
      }
    } catch (e) {
      console.error(e);
    }
  }
}
