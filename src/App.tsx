import React from "react";
import { css as globalCss, Global } from "@emotion/core";
import { css } from "emotion";
import normalize from "emotion-normalize";
import { SceneSwitcher } from "./features/SceneSwitcher";

export const App: React.FunctionComponent = () => (
  <div
    className={css({
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
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
            touch-action: manipulation;
            font-family: 'M PLUS Rounded 1c', sans-serif;
          }
        `}
    />
    <SceneSwitcher />
  </div>
);
