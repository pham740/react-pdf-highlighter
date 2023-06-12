import React, { Component } from "react";
import { Classes, Menu, MenuDivider } from "@blueprintjs/core";
import { MenuItem2 } from "@blueprintjs/popover2";

import { SentenceInfo, SeverityScoreColor } from "../types";
import { SeverityScoreItem } from "./SeverityScoreItem";

import "../style/Tip.css";

interface State {
  compact: boolean;
}
interface Props {
  onConfirm: (sentence_info: SentenceInfo) => void;
  onOpen: () => void;
  onUpdate?: () => void;
}

export class Tip extends Component<Props, State> {
  state: State = {
    compact: true,
  };

  // for TipContainer
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  render() {
    const { onConfirm, onOpen } = this.props;

    return (
      <Menu className={Classes.ELEVATION_3}>
        <MenuItem2
          icon="highlight"
          text="Add highlight"
          onClick={() => {
            // onOpen();
            this.setState({ compact: false });
          }}
          children={
            <>
              <MenuDivider title="Select severity score" />
              <SeverityScoreItem
                color={SeverityScoreColor.LOW}
                text="Low"
                onOpen={onOpen}
                onConfirm={onConfirm}
              />
              <SeverityScoreItem
                color={SeverityScoreColor.MID}
                text="Medium"
                onOpen={onOpen}
                onConfirm={onConfirm}
              />
              <SeverityScoreItem
                color={SeverityScoreColor.HIGH}
                text="High"
                onOpen={onOpen}
                onConfirm={onConfirm}
              />
            </>
          }
        />
      </Menu>
    );
  }
}

export default Tip;
