import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import "./App.css";
import { css, Global } from "@emotion/core";
import normalize from "emotion-normalize";
import { Card } from "./components/Card";
import { store } from "./store";
import { StageGenerator } from "./domains/game/StageGenerator";
import { CardContainer } from "./components/CardContainer";
import { sum, pullAll, partition } from "lodash/fp";
import { StageSolver } from "./domains/game/StageSolver";

const toSourceCard = (num: number): SourceCard => ({
  id: Math.random(),
  num
});

type SourceCard = {
  id: number;
  num: number;
};

type MergedCard = {
  id: number;
  sources: SourceCard[];
};

const mergeDimensions = 2;

export const App: React.FC = () => {
  const [stageNumber, setStageNumber] = useState(1);
  const sourceSize = stageNumber * mergeDimensions;
  const mergedSize = stageNumber;
  const [stage, setStage] = useState(
    useMemo(
      () => new StageGenerator(sourceSize, mergedSize, mergeDimensions).generateStage(),
      [] // eslint-disable-line react-hooks/exhaustive-deps
    )
  );
  const [sourceCards, setSourceCards] = useState<SourceCard[]>(
    useMemo(
      () => stage.numbers.map(toSourceCard),
      [] // eslint-disable-line react-hooks/exhaustive-deps
    )
  );
  const [mergedCards, setMergedCards] = useState<MergedCard[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const selectSourceCard = useCallback(
    (sourceCard: SourceCard) => () => {
      if (selectedIds.includes(sourceCard.id)) {
        setSelectedIds(pullAll([sourceCard.id])(selectedIds));
      } else {
        const ids = selectedIds.concat([sourceCard.id]);
        if (ids.length !== mergeDimensions) {
          setSelectedIds(ids);
        } else {
          const [selected, nextSource] = partition<SourceCard>(sc =>
            ids.includes(sc.id)
          )(sourceCards);
          setMergedCards(
            mergedCards.concat([
              {
                id: Math.random(),
                sources: selected
              }
            ])
          );
          setSourceCards(nextSource);
          setSelectedIds([]);
        }
      }
    },
    [sourceCards, mergedCards, selectedIds]
  );

  const selectMergedCard = useCallback(
    (mergedCard: MergedCard) => () => {
      setSourceCards(sourceCards.concat(mergedCard.sources));
      setMergedCards(mergedCards.filter(mc => mc.id !== mergedCard.id));
    },
    [sourceCards, mergedCards]
  );

  useEffect(() => {
    const m = mergedCards.map(mc => sum(mc.sources.map(s => s.num)));
    const isSolved = new StageSolver(stage).isSolved(
      sourceCards.map(sc => sc.num).concat(m)
    );
    if (isSolved) {
      const nextStageNumber = stageNumber + 1;
      const nextStage = new StageGenerator(
        nextStageNumber * mergeDimensions,
        nextStageNumber,
        mergeDimensions
      ).generateStage();
      setStageNumber(nextStageNumber);
      setStage(nextStage);
      setSourceCards(nextStage.numbers.map(toSourceCard));
      setMergedCards([]);
      setSelectedIds([]);
    }
  }, [stage, sourceCards, mergedCards, stageNumber]);

  return (
    <Provider store={store}>
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
                  backgroundColor: selectedIds.includes(sc.id) ? "#52BCDE" : ""
                }}
                onClick={selectSourceCard(sc)}
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
              <Card key={mc.id} onClick={selectMergedCard(mc)}>
                {sum(mc.sources.map(s => s.num))}
              </Card>
            ))}
          </CardContainer>
        </div>
      </div>
    </Provider>
  );
};
