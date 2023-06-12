import React, { Component } from "react";

import "../style/Highlight.css";

import { LTWHP, SeverityScore } from "../types.js";

interface Props {
  position: {
    boundingRect: LTWHP;
    rects: Array<LTWHP>;
  };
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  sentence_info: {
    severity_score: string;
  };
  isScrolledTo: boolean;
}

export class Highlight extends Component<Props> {
  render() {
    const {
      position,
      onClick,
      onMouseOver,
      onMouseOut,
      sentence_info,
      isScrolledTo,
    } = this.props;

    const { rects } = position;

    var severity = "";
    switch (sentence_info.severity_score) {
      case SeverityScore.LOW:
        severity = "low";
        break;
      case SeverityScore.MID:
        severity = "mid";
        break;
      case SeverityScore.HIGH:
        severity = "high";
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
