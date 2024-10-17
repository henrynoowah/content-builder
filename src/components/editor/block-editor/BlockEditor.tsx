import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Block } from "@src/types";
import { forwardRef, lazy, useImperativeHandle } from "react";
import { ImageBlock } from "./blocks";
import { twMerge } from "tailwind-merge";
const Carousel = lazy(() => import("@src/components/carousel"));

const TiptapEditor = lazy(() => import("../tiptap/tiptap"));

interface BlockProps {
  block: Block;
  onChange: (block: Block) => void;
  onSelect: (block: Block) => void;
}

const BlockEditor = forwardRef<Block, BlockProps>(
  ({ block, onChange, onSelect }, ref) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: block.id,
      });

    const style = {
      transition,
      transform: CSS.Translate.toString(transform),
    };

    useImperativeHandle(ref, () => block);

    return (
      <div
        ref={setNodeRef}
        id={block.id}
        style={{
          ...style,
        }}
        onClick={() => {
          // TODO - Set Block Context
          onSelect(block);
        }}
        className={twMerge(
          `nwcb-relative group/block nwcb-ring-1 nwcb-ring-transparent hover:nwcb-ring-blue-400 nwcb-cursor-pointer`,
          "focus-within:nwcb-ring-blue-400"
        )}
        {...attributes}
        {...listeners}
      >
        {block.type === "html" && (
          <TiptapEditor
            key={`section-block-container-${block.id}`}
            content={block.content}
            style={block.style}
            onUpdate={(value) => onChange({ ...block, content: value })}
          />
        )}
        {block.type === "image" && (
          <ImageBlock key={`section-block-container-${block.id}`} {...block} />
        )}
        {block.type === "gallery" && <Carousel {...block} />}
      </div>
    );
  }
);

export default BlockEditor;
