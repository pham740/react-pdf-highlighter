import React, { Component } from "react";
import { Button } from "@blueprintjs/core";

interface Props {
  id: string;
  onClick: (id: string) => void;
}

export class GoButton extends Component<Props> {
  render() {
    const { id, onClick } = this.props;

    return (
      <Button
        key={id}
        icon="arrow-top-right"
        text="Go to highlight"
        onClick={() => onClick(id)}
      />
    );
  }
}

export default GoButton;
