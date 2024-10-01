import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { convertStylesStringToObject } from "../../../lib";
import { lazy } from "react";
import { Block } from "@src/types";

const Carousel = lazy(() => import("@src/components/carousel"));

const TiptapEditor = lazy(() => import("../tiptap/tiptap"));

const BlockEditor = ({
  block,
  onChange,
}: {
  isSorting?: boolean;
  block: Block;
  onChange: (block: Block) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: block.id,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      id={block.id}
      style={{
        ...convertStylesStringToObject(block.style ?? ""),
        ...style,
      }}
      onClick={() => {}}
      className="nwcb-relative group/block nwcb-ring-[1px] nwcb-ring-transparent hover:nwcb-ring-blue-400/60 nwcb-cursor-pointer"
      {...attributes}
      {...listeners}
    >
      {block.type === "html" && (
        <TiptapEditor
          key={`section-block-container-${block.id}`}
          content={block.content}
          onUpdate={(value) => {
            onChange({ ...block, content: value });
          }}
        />
      )}
      {block.type === "image" && (
        <img
          key={`section-block-container-${block.id}`}
          src={block.src}
          alt={block.alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
      )}
      {block.type === "gallery" && <Carousel {...block} />}
    </div>
  );
};

export default BlockEditor;
