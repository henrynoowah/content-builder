import { Block } from "@src/types";

const ImageBlock = (block: Block) => {
  return (
    <img
      key={`section-block-container-${block.id}`}
      src={block.src}
      alt={block.alt}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        objectPosition: "center",
        ...block.style,
      }}
    />
  );
};

export default ImageBlock;
