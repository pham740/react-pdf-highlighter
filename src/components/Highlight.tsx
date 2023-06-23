import React, { Component } from "react";

import "../style/Highlight.css";

import { ViewportHighlight } from "../types.js";

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
    const { severity_score } = highlight.info;
    const { isActive } = highlight;

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
                className={`Highlight__${severity_score.toLowerCase()}${
                  isActive ? "__active" : ""
                }`}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Highlight;
