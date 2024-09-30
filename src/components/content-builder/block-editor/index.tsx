import { useSortable } from "@dnd-kit/sortable";
import Carousel from "../carousel";
import { Block } from "../types";
import { CSS } from "@dnd-kit/utilities";
import TiptapEditor from "../tiptap/tiptap";

const convertStylesStringToObject = (stringStyles: string) =>
  typeof stringStyles === "string"
    ? stringStyles.split(";").reduce((acc, style) => {
        const colonPosition = style.indexOf(":");

        if (colonPosition === -1) {
          return acc;
        }

        const camelCaseProperty = style
            .substring(0, colonPosition)
            .trim()
            .replace(/^-ms-/, "ms-")
            .replace(/-./g, (c) => c.substring(1).toUpperCase()),
          value = style.substring(colonPosition + 1).trim();

        return value ? { ...acc, [camelCaseProperty]: value } : acc;
      }, {})
    : {};

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
      className="relative group/block ring-[1px] ring-transparent hover:ring-blue-400/60 cursor-pointer"
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
          style={{ objectFit: "contain" }}
        />
      )}
      {block.type === "gallery" && <Carousel {...block} />}
    </div>
  );
};

export default BlockEditor;
