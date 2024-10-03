import { SuggestionProps } from "@tiptap/suggestion";
import { Component } from "react";

export class CommandsView extends Component<SuggestionProps> {
  state = {
    selectedIndex: null,
  };

  componentDidUpdate(oldProps: SuggestionProps) {
    if (this.props.items !== oldProps.items) {
      this.setState({
        selectedIndex: 0,
      });
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === "ArrowUp") {
      this.upHandler();
      return true;
    }

    if (event.key === "ArrowDown") {
      this.downHandler();
      return true;
    }

    if (event.key === "Enter") {
      this.enterHandler();
      return true;
    }

    return false;
  }

  upHandler() {
    this.setState({
      selectedIndex:
        ((this.state.selectedIndex || 0) + this.props.items.length - 1) %
        this.props.items.length,
    });
  }

  downHandler() {
    this.setState({
      selectedIndex:
        this.state.selectedIndex === null
          ? 0
          : ((this.state.selectedIndex || 0) + 1) % this.props.items.length,
    });
  }

  enterHandler() {
    this.selectItem(this.state.selectedIndex);
  }

  selectItem(index: number | null) {
    const item = this.props.items[index || 0];

    if (item) {
      this.props.command(item);
    }
  }

  render(): React.ReactNode {
    const { items } = this.props;

    return (
      <div
        style={{
          backgroundColor: "#1F2937",
          border: "1px solid gray",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          overflow: "hidden",
        }}
      >
        {items.map((item, index) => {
          return (
            <button
              type="button"
              style={{
                width: "100%",
                padding: "4px 8px",
                textAlign: "start",
                border: "none",
                fontSize: 12,
                ...(index === this.state.selectedIndex
                  ? { backgroundColor: "#FFFFFF", color: "black" }
                  : { backgroundColor: "transparent", color: "white" }),
              }}
              {...item.attrs}
              key={index}
              onClick={() => this.selectItem(index)}
            >
              {item.element || item.title}
            </button>
          );
        })}
      </div>
    );
  }
}
