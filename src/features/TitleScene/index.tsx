import React, { useMemo } from "react";
import { Button } from "../../components/Button";
import { css } from "emotion";
import { StateSerializer } from "../../domains/game/StateSerializer";

export type Props = {
  onClickStartNormal: () => void;
  onClickLoadNormal: () => void;
  onClickStartHard: () => void;
  onClickLoadHard: () => void;
};

export const TitleScene: React.FunctionComponent<Props> = ({
  onClickStartNormal,
  onClickLoadNormal,
  onClickStartHard,
  onClickLoadHard
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
          color="primary"
          className={css({ marginBottom: "1rem" })}
          onClick={onClickStartNormal}
        >
          Normal
        </Button>
        {deserialized && deserialized.normal && (
          <Button
            color="primary"
            className={css({ marginBottom: "1rem" })}
            onClick={onClickLoadNormal}
            disabled={!deserialized}
          >
            Load Normal
            <br />
            (stage {deserialized.normal.stageNumber})
          </Button>
        )}
        <Button
          color="secondary"
          className={css({ marginBottom: "1rem" })}
          onClick={onClickStartHard}
        >
          Hard
        </Button>
        {deserialized && deserialized.hard && (
          <Button
            color="secondary"
            className={css({ marginBottom: "1rem" })}
            onClick={onClickLoadHard}
            disabled={!deserialized}
          >
            Load Hard
            <br />
            (stage {deserialized.hard.stageNumber})
          </Button>
        )}
      </div>
    </>
  );
};
