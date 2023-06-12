import React, { Component } from "react";
import { Button, Intent } from "@blueprintjs/core";

interface Props {
  id: string;
  onClick: (id: string) => void;
}

export class HighlightPopup extends Component<Props> {
  render() {
    const { id, onClick } = this.props;

    return (
      <Button
        key={id}
        icon="cross"
        text="Delete?"
        intent={Intent.DANGER}
        onClick={() => onClick(id)}
      />
    );
  }
}

export default HighlightPopup;
