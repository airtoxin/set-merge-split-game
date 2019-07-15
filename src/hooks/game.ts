import { useCallback, useEffect, useMemo, useState } from "react";
import { StageGenerator } from "../domains/game/StageGenerator";
import { partition, pullAll, sum } from "lodash/fp";
import { StageSolver } from "../domains/game/StageSolver";

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

export const useGame = (initialStageNumber: number = 1) => {
  const [stageNumber, setStageNumber] = useState(initialStageNumber);
  const sourceSize = stageNumber * mergeDimensions;
  const mergedSize = stageNumber;
  const [stage, setStage] = useState(
    useMemo(
      () =>
        new StageGenerator(
          sourceSize,
          mergedSize,
          mergeDimensions
        ).generateStage(),
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
  const selectedCards = useMemo(
    () => sourceCards.filter(sc => selectedIds.includes(sc.id)),
    [sourceCards, selectedIds]
  );

  const onSelectSourceCard = useCallback(
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

  const onSelectMergedCard = useCallback(
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

  return {
    stageNumber,
    stage,
    sourceCards,
    selectedCards,
    mergedCards,
    onSelectSourceCard,
    onSelectMergedCard
  };
};
