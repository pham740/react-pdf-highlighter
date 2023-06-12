import React, { Component } from "react";
import { MenuItem2 } from "@blueprintjs/popover2";

import { SentenceInfo, SeverityScore } from "../types";

import "../style/SeverityScoreItem.css";

interface Props {
  color: string;
  text: string;
  onOpen: () => void;
  onConfirm: (sentence_info: SentenceInfo) => void;
}

export class SeverityScoreItem extends Component<Props> {
  handleClick = (event: any) => {
    const { onOpen, onConfirm } = this.props;

    event.preventDefault();

    let severity_score = "";
    switch (event.target.innerText) {
      case "Low":
        severity_score = SeverityScore.LOW;
        break;
      case "Medium":
        severity_score = SeverityScore.MID;
        break;
      case "High":
        severity_score = SeverityScore.HIGH;
        break;
    }

    onOpen();
    onConfirm({
      model_problematic: false,
      user_problematic: true,
      severity_score: severity_score,
    });
  };

  render() {
    const { color, text } = this.props;

    return (
      <MenuItem2
        key={text}
        onClick={(event) => this.handleClick(event)}
        text={
          <div>
            <span aria-hidden="true" className="SeverityScore__span bp4-icon">
              <svg width="16" height="16" viewBox="0 0 16 16" role="img">
                <circle cx="8" cy="8" r="8" fill={color} />
              </svg>
            </span>
            {text}
          </div>
        }
      />
    );
  }
}

export default SeverityScoreItem;