import React, { useMemo } from "react";
import { Button } from "../../components/Button";
import { css } from "emotion";
import { StateSerializer } from "../../domains/game/StateSerializer";

export type Props = {
  onClickStart: () => void;
  onClickLoad: () => void;
};

export const TitleScene: React.FunctionComponent<Props> = ({
  onClickStart,
  onClickLoad
}) => {
  const deserialized = useMemo(() => new StateSerializer().deserialize(), []);

  return (
    <>
      <h1>SETS</h1>

      <div
        className={css({
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        })}
      >
        <Button
          className={css({ marginBottom: "1rem" })}
          onClick={onClickStart}
        >
          Start
        </Button>
        <Button
          className={css({ marginBottom: "1rem" })}
          onClick={onClickLoad}
          disabled={!deserialized}
        >
          Load Game
          <br />
          {deserialized && `(Stage ${deserialized.stageNumber})`}
        </Button>
      </div>
    </>
  );
};
