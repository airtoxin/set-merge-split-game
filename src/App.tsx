import React from "react";
import { css as globalCss, Global } from "@emotion/core";
import { css } from "emotion";
import normalize from "emotion-normalize";
import { Card } from "./components/Card";
import { CardContainer } from "./components/CardContainer";
import { useGame } from "./hooks/game";
import color from "color";

export const App: React.FC = () => {
  const {
    stageNumber,
    sourceCards,
    selectedCards,
    mergedCards,
    answerCards,
    links,
    solved,
    onSelectSourceCard,
    onSelectMergedCard
  } = useGame(1);

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
      <div>
        <h2>Stage {stageNumber}: Make sets of</h2>
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
        <h2>Source sets</h2>
        <CardContainer>
          {sourceCards.map(sc => (
            <Card
              key={sc.id}
              style={{
                backgroundColor: selectedCards.map(sc => sc.id).includes(sc.id)
                  ? "#52BCDE"
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
        <h2>Merged sets</h2>
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
              {mc.num}
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
          <h2>Stage {stageNumber} CLEAR</h2>
        </div>
      )}
    </div>
  );
};
