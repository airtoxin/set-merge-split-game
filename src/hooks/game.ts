import { useCallback, useEffect, useMemo, useState } from "react";
import { StageGenerator } from "../domains/game/StageGenerator";
import { partition, pullAll, sortBy, sum } from "lodash/fp";
import { StageSolver } from "../domains/game/StageSolver";

const toCard = (num: number): Card => ({
  id: Math.random(),
  num
});

type Card = {
  id: number;
  num: number;
};

type MergedCard = Card & {
  sources: Card[];
};

const sortByNum = <T extends { num: number }>(cards: T[]) =>
  sortBy(c => c.num, cards);

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
  const answerCards = useMemo(() => stage.answer.map(toCard), [stage]);
  const [sourceCards, setSourceCards] = useState<Card[]>(
    useMemo(
      () => stage.numbers.map(toCard),
      [] // eslint-disable-line react-hooks/exhaustive-deps
    )
  );
  const [mergedCards, setMergedCards] = useState<MergedCard[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const selectedCards = useMemo(
    () => sourceCards.filter(sc => selectedIds.includes(sc.id)),
    [sourceCards, selectedIds]
  );
  const solved = useMemo(
    () =>
      new StageSolver(stage).isSolved(
        sourceCards.concat(mergedCards).map(c => c.num)
      ),
    [stage, sourceCards, mergedCards]
  );

  const onSelectSourceCard = useCallback(
    (sourceCard: Card) => () => {
      if (selectedIds.includes(sourceCard.id)) {
        setSelectedIds(pullAll([sourceCard.id])(selectedIds));
      } else {
        const ids = selectedIds.concat([sourceCard.id]);
        if (ids.length !== mergeDimensions) {
          setSelectedIds(ids);
        } else {
          const [selected, nextSource] = partition<Card>(sc =>
            ids.includes(sc.id)
          )(sourceCards);
          setMergedCards(
            mergedCards.concat([
              {
                id: Math.random(),
                num: sum(selected.map(s => s.num)),
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

  const links = useMemo(() => {
    const links: [Card, MergedCard][] = [];

    const ans = [...answerCards];
    for (const mc of mergedCards) {
      const idx = ans.findIndex(a => a.num === mc.num);
      if (idx !== -1) {
        const [card] = ans.splice(idx, 1);
        links.push([card, mc]);
      }
    }

    return links;
  }, [answerCards, mergedCards]);

  const onSelectMergedCard = useCallback(
    (mergedCard: MergedCard) => () => {
      setSourceCards(sourceCards.concat(mergedCard.sources));
      setMergedCards(mergedCards.filter(mc => mc.id !== mergedCard.id));
    },
    [sourceCards, mergedCards]
  );

  useEffect(() => {
    if (solved) {
      setTimeout(() => {
        const nextStageNumber = stageNumber + 1;
        const nextStage = new StageGenerator(
          nextStageNumber * mergeDimensions,
          nextStageNumber,
          mergeDimensions
        ).generateStage();
        setStageNumber(nextStageNumber);
        setStage(nextStage);
        setSourceCards(nextStage.numbers.map(toCard));
        setMergedCards([]);
        setSelectedIds([]);
      }, 1000);
    }
  }, [solved]);

  return {
    stageNumber,
    sourceCards: sortByNum(sourceCards),
    selectedCards: sortByNum(selectedCards),
    mergedCards: sortByNum(mergedCards),
    answerCards: sortByNum(answerCards),
    links,
    solved,
    onSelectSourceCard,
    onSelectMergedCard
  };
};
