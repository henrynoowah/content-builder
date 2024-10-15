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
        className="nwcb-w-full nwcb-h-fit nwcb-aspect-square nwcb-object-contain"
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

      <div className="nwcb-grid nwcb-grid-cols-2 nwcb-gap-4">
        <div className="nwcb-flex nwcb-gap-2 nwcb-text-sm">
          <p>W: </p>
          <input
            type="number"
            className="nwcb-w-full nwcb-rounded focus-within:nwcb-outline-none"
            onChange={(e) => {
              onChange?.({
                ...style,
                maxWidth: `${e.target.value}px`,
              });
            }}
          />
          <button
            type="button"
            className="nwcb-w-full nwcb-rounded focus-within:nwcb-outline-none"
            onClick={(e) => {
              onChange?.({
                ...style,
                maxWidth: `100%`,
              });
            }}
          >
            Fill
          </button>
        </div>
        <div className="nwcb-flex nwcb-gap-2 nwcb-text-sm">
          <p>H: </p>
          <input
            type="number"
            className="nwcb-w-full nwcb-rounded focus-within:nwcb-outline-none"
            onChange={(e) => {
              onChange?.({
                ...style,
                minHeight: `${e.target.value}px`,
              });
            }}
          />
        </div>
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
      </div> */}
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
