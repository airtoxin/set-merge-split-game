import React, { useState } from "react";
import { TitleScene } from "./TitleScene";
import { GameScene } from "./GameScene";

export const SceneSwitcher: React.FunctionComponent = () => {
  const [scene, setScene] = useState<"title" | "game">("title");
  const [shouldLoad, setShouldLoad] = useState(false);

  switch (scene) {
    case "title":
      return (
        <TitleScene
          onClickStart={() => {
            setScene("game");
          }}
          onClickLoad={() => {
            setShouldLoad(true);
            setScene("game");
          }}
        />
      );
    case "game":
      return <GameScene shouldLoad={shouldLoad} />;
  }
};
