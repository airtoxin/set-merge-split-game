import React from "react";
import "./App.css";
import { css, Global } from "@emotion/core";
import normalize from "emotion-normalize";
import { Card } from "./components/Card";
import { CardContainer } from "./components/CardContainer";
import { sum } from "lodash/fp";
import { useGame } from "./hooks/game";

export const App: React.FC = () => {
  const {
    stageNumber,
    stage,
    sourceCards,
    selectedCards,
    mergedCards,
    onSelectSourceCard,
    onSelectMergedCard,
  } = useGame(1);

  return (
    <div className="App">
      <Global
        styles={css`
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
          {stage.answer.map((n, i) => (
            <Card key={i}>{n}</Card>
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
                backgroundColor: selectedCards.map(sc => sc.id).includes(sc.id) ? "#52BCDE" : ""
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
            <Card key={mc.id} onClick={onSelectMergedCard(mc)}>
              {sum(mc.sources.map(s => s.num))}
            </Card>
          ))}
        </CardContainer>
      </div>
    </div>
  );
};
