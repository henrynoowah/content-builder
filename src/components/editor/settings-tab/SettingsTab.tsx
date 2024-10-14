import { Block, EditorContextProps } from "@src/types";
import { CSSProperties } from "react";

const SettingsTab = ({
  section,
  updateSection,
  block,
  updateBlock,
}: EditorContextProps) => {
  return (
    <div className="nwcb-fixed nwcb-top-0 nwcb-end-0 nwcb-w-80 nwcb-h-full nwcb-bg-slate-100 nwcb-rounded-s-xl nwcb-p-4 nwcb-shadow-lg">
      <div className="nwcb-flex nwcb-flex-col nwcb-gap-4">
        <p className="nwcb-text-lg nwcb-font-medium">{`${section?.id ?? ""} ${
          block ? `/ ${block.id}` : ""
        }`}</p>
        <button
          onClick={() => {
            if (section) {
              updateSection?.({
                ...section,
                style: { ...section.style, gap: "16px" },
              });
            }
          }}
        >
          {section?.id}
        </button>

        <StyleEditor
          style={section?.style}
          onChange={(style) => {
            if (section) {
              updateSection?.({
                ...section,
                style,
              });
            }
          }}
        />
      </div>

      <hr className="nwcb-my-3" />

      <div>Block: {block?.id}</div>

      <button
        onClick={() => {
          if (block) {
            updateBlock?.({
              ...block,
              style: {
                ...block.style,
                backgroundColor: "#5C9D60",
                borderRadius: "24px",
                color: "white",
              },
            });
          }
        }}
      >
        {block?.id}
      </button>

      {block && (
        <BlockSetting
          block={block}
          onChange={(block) => updateBlock?.(block)}
        />
      )}
    </div>
  );
};

export default SettingsTab;

const BlockSetting = ({
  block,
  onChange,
}: {
  block: Block;
  onChange: (block: Block) => void;
}) => {
  switch (block.type) {
    case "html":
      return (
        <>
          <StyleEditor
            style={block.style}
            onChange={(style) => {
              onChange({ ...block, style });
            }}
          />
        </>
      );
    case "gallery":
      return "gallery";
    case "image":
      return <ImageSetting block={block} />;
    default:
      return <></>;
  }
};

const ImageSetting = ({ block }: { block: Block }) => {
  return (
    <div className="nwcb-w-full nwcb-h-full">
      <img
        src={block.src}
        className="nwcb-w-full nwcb-h-fit nwcb-aspect-square"
      />
    </div>
  );
};

const StyleEditor = ({
  style,
  onChange,
}: {
  style?: CSSProperties;
  onChange: (style: CSSProperties) => void;
}) => {
  return (
    <div className="nwcb-flex nwcb-flex-col nwcb-gap-4">
      <p>Layout</p>
      <div>
        <p>Width</p>
        <input
          type="number"
          onChange={(e) => {
            onChange?.({
              ...style,
              maxWidth: `${e.target.value}px`,
            });
          }}
        />
      </div>
      <div>
        <p>Minimum Height</p>
        <input
          type="number"
          onChange={(e) => {
            onChange?.({
              ...style,
              minHeight: `${e.target.value}px`,
            });
          }}
        />
      </div>
      <div>
        <p>Padding</p>
        <input
          type="number"
          onChange={(e) => {
            onChange?.({
              ...style,
              padding: `${e.target.value}px`,
            });
          }}
        />
      </div>
      {/* <div>
        <p>Padding</p>
        <input
          type="number"
          onChange={(e) => {
            onChange?.({
              ...style,
              padding: `${e.target.value}px`,
            });
          }}
        />
      </div>
      <div>
        <p>Border</p>
        <input
          type="text"
          onChange={(e) => {
            onChange?.({
              ...style,
              border: `${e.target.value}`,
            });
          }}
        />
      </div> */}
    </div>
  );
};
