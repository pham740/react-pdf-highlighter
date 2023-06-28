import React, { Component } from "react";
import { MenuItem2 } from "@blueprintjs/popover2";

import { Info, SeverityScore, UserProblematic } from "../types";

import "../style/SeverityScoreItem.css";

interface Props {
  color: string;
  text: string;
  onOpen: () => void;
  onConfirm: (info: Info) => void;
}

export class SeverityScoreItem extends Component<Props> {
  handleClick = (event: any) => {
    const { onOpen, onConfirm } = this.props;

    event.preventDefault();

    const severity_score = event.target.innerText.toUpperCase();

    onOpen();
    onConfirm({
      model_problematic: false,
      user_problematic: UserProblematic.YES,
      severity_score:
        SeverityScore[severity_score as keyof typeof SeverityScore],
    });
  };

  render() {
    const { color, text } = this.props;

    return (
      <MenuItem2
        key={text}
        onClick={(event) => this.handleClick(event)}
        popoverProps={{ usePortal: true }}
        shouldDismissPopover={true}
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
