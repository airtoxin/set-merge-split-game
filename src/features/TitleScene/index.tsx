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
      <h1>ぱねたす</h1>

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
          ノーマル
        </Button>
        {deserialized && deserialized.normal && (
          <Button
            color="primary"
            className={css({ marginBottom: "1rem" })}
            onClick={onClickLoadNormal}
            disabled={!deserialized}
          >
            つづき
            <br />
            (ステージ {deserialized.normal.stageNumber})
          </Button>
        )}
        <Button
          color="secondary"
          className={css({ marginBottom: "1rem" })}
          onClick={onClickStartHard}
        >
          ハード
        </Button>
        {deserialized && deserialized.hard && (
          <Button
            color="secondary"
            className={css({ marginBottom: "1rem" })}
            onClick={onClickLoadHard}
            disabled={!deserialized}
          >
            つづき
            <br />
            (ステージ {deserialized.hard.stageNumber})
          </Button>
        )}
      </div>
    </>
  );
};
