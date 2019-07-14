import React from "react";
import "./App.css";
import { css, Global } from "@emotion/core";
import normalize from "emotion-normalize";
import { Card } from "./components/Card";

export const App: React.FC = () => {
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
      <div style={{ display: "flex" }}>
        <Card onClick={console.log}>1</Card>
        <Card onClick={console.log}>5</Card>
        <Card onClick={console.log}>10</Card>
        <Card onClick={console.log}>100</Card>
      </div>
    </div>
  );
};
