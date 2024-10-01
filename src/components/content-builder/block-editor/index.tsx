import { useSortable } from "@dnd-kit/sortable";
import Carousel from "../carousel";
import { Block } from "../types";
import { CSS } from "@dnd-kit/utilities";
import TiptapEditor from "../tiptap/tiptap";
import { convertStylesStringToObject } from "../../../lib";

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
