import React, { Component } from "react";

import "../style/Highlight.css";

import { ViewportHighlight, SeverityScore } from "../types.js";

interface Props {
  highlight: ViewportHighlight;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  isScrolledTo: boolean;
}

export class Highlight extends Component<Props> {
  render() {
    const { highlight, onClick, onMouseOver, onMouseOut, isScrolledTo } =
      this.props;

    const { rects } = highlight.position;

    var severity = "";
    switch (highlight.info.severity_score) {
      case SeverityScore.LOW:
        severity = "low";
        break;
      case SeverityScore.MID:
        severity = "mid";
        break;
      case SeverityScore.HIGH:
        severity = "high";
        break;
      case SeverityScore.UNSURE:
        severity = "unsure";
        break;
      case SeverityScore.UNREVIEWED:
        severity = "unreviewed";
        break;
    }

    return (
      <div
        className={`Highlight ${isScrolledTo ? "Highlight--scrolledTo" : ""}`}
      >
        <div className="Highlight__parts">
          {rects.map((rect, index) => {
            return (
              <div
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
                key={index}
                style={rect}
                className={`Highlight__${severity}`}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Highlight;
