import { mergeAttributes, Node } from "@tiptap/core";
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

const DragHandle = ({}: NodeViewProps) => {
  return (
    <NodeViewWrapper className="flex p-2 my-2 rounded-lg bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_10px_20px_rgba(0,0,0,0.1)]">
      <div
        className="flex-none relative w-4 h-4 mt-1 mr-2 cursor-grab bg-no-repeat bg-contain bg-center"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 16%22%3E%3Cpath fill-opacity=%220.2%22 d=%22M4 14c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM2 6C.9 6 0 6.9 0 8s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6C.9 0 0 .9 0 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z%22 /%3E%3C/svg%3E')",
        }}
        contentEditable={false}
        draggable="true"
        data-drag-handle
      />
      <NodeViewContent className="flex-1" />
    </NodeViewWrapper>
  );
};

const DraggableItem = Node.create({
  name: "draggableItem",

  group: "block",

  content: "block+",

  draggable: true,

  parseHTML() {
    return [
      {
        tag: 'div[data-type="draggable-item"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "draggable-item" }),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(DragHandle);
  },
});
export default DraggableItem;
