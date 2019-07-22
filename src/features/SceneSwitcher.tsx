import React, { useState } from "react";
import { TitleScene } from "./TitleScene";
import { GameScene } from "./GameScene";

export const SceneSwitcher: React.FunctionComponent = () => {
  const [scene, setScene] = useState<"title" | "game">("title");
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isHardMode, setIsHardMode] = useState(false);

  switch (scene) {
    case "title":
      return (
        <TitleScene
          onClickStartNormal={() => {
            setScene("game");
          }}
          onClickLoadNormal={() => {
            setShouldLoad(true);
            setScene("game");
          }}
          onClickStartHard={() => {
            setIsHardMode(true);
            setScene("game");
          }}
          onClickLoadHard={() => {
            setShouldLoad(true);
            setIsHardMode(true);
            setScene("game");
          }}
        />
      );
    case "game":
      return <GameScene shouldLoad={shouldLoad} isHardMode={isHardMode} />;
  }
};
