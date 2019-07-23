import React, { useEffect, useMemo } from "react";
import { useGame } from "../../hooks/game";
import { css } from "emotion";
import { css as globalCss, Global } from "@emotion/core";
import normalize from "emotion-normalize";
import { CardContainer } from "../../components/CardContainer";
import { Card } from "../../components/Card";
import color from "color";
import { StateSerializer } from "../../domains/game/StateSerializer";

export type Props = {
  shouldLoad: boolean;
  isHardMode: boolean;
};

export const GameScene: React.FunctionComponent<Props> = ({
  shouldLoad,
  isHardMode
}) => {
  const loaded = useMemo(() => new StateSerializer().deserialize(), []);
  const mode = useMemo(() => (isHardMode ? "hard" : "normal"), []); // eslint-disable-line
  const dimension = isHardMode ? 3 : 2;

  const {
    stageNumber,
    sourceCards,
    selectedCards,
    mergedCards,
    answerCards,
    links,
    solved,
    stage,
    onSelectSourceCard,
    onSelectMergedCard
  } = useGame(dimension, shouldLoad && loaded ? loaded[mode] : undefined);

  useEffect(() => {
    new StateSerializer().serializeMode(mode, { stageNumber, stage });
  }, [mode, stageNumber, stage]);

  return (
    <div
      className={css({
        userSelect: "none",
        textAlign: "center"
      })}
    >
      <Global
        styles={globalCss`
          ${normalize}
          html, body {
            padding: 0;
            margin: 0;
          }
        `}
      />
      <h2 className={css({ color: isHardMode ? "#de5271" : "#52bcde" })}>
        {isHardMode ? "ハードモード" : "ノーマルモード"} ステージ {stageNumber}
      </h2>
      <div>
        <h3>つくる数</h3>
        <CardContainer>
          {answerCards.map(ans => (
            <Card
              key={ans.id}
              style={{
                backgroundColor: links.find(([a]) => a.id === ans.id)
                  ? color("#ffccff")
                      .rotate(links.findIndex(([a]) => a.id === ans.id) * 77)
                      .hex()
                  : ""
              }}
            >
              {ans.num}
            </Card>
          ))}
        </CardContainer>
      </div>
      <div>
        <h3>もとになる数</h3>
        <CardContainer>
          {sourceCards.map(sc => (
            <Card
              key={sc.id}
              style={{
                backgroundColor: selectedCards.map(sc => sc.id).includes(sc.id)
                  ? isHardMode
                    ? "#de5271"
                    : "#52BCDE"
                  : ""
              }}
              onClick={onSelectSourceCard(sc)}
            >
              {sc.num}
            </Card>
          ))}
        </CardContainer>
      </div>
      <div>
        <h3>つくった数</h3>
        <CardContainer>
          {mergedCards.map(mc => (
            <Card
              key={mc.id}
              onClick={onSelectMergedCard(mc)}
              style={{
                backgroundColor: links.find(([_, m], i) => m.id === mc.id)
                  ? color("#ffccff")
                      .rotate(links.findIndex(([_, a]) => a.id === mc.id) * 77)
                      .hex()
                  : ""
              }}
            >
              <div>
                <div
                  className={css({
                    fontSize: "0.5rem"
                  })}
                >
                  {mc.sources.map(s => s.num).join("+")}
                </div>
                {mc.num}
              </div>
            </Card>
          ))}
        </CardContainer>
      </div>

      {solved && (
        <div
          className={css`
            position: absolute;
            top: 30vh;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            color: red;
            transform: rotate(-30deg);
            font-size: 2rem;
          `}
        >
          <h2>ステージ {stageNumber} クリア</h2>
        </div>
      )}
    </div>
  );
};
