import { Block, EditorContextProps } from "@src/types";
import { CSSProperties } from "react";

const SettingsTab = ({
  data,
  selectedSection,
  updateSelectedSection,
  selectedBlock,
  updateSelectedBlock,
}: EditorContextProps) => {
  return (
    <div className="nwcb-fixed nwcb-top-0 nwcb-end-0 nwcb-w-80 nwcb-h-full nwcb-bg-slate-100 nwcb-p-4 nwcb-shadow-lg">
      <div className="nwcb-flex nwcb-flex-col nwcb-gap-4">
        <p className="nwcb-text-lg nwcb-font-medium">{`${
          selectedSection?.id ?? ""
        } ${selectedBlock ? `/ ${selectedBlock.id}` : ""}`}</p>
        <button
          onClick={() => {
            if (selectedSection) {
              updateSelectedSection?.({
                ...selectedSection,
                style: { ...selectedSection.style, gap: "16px" },
              });
            }
          }}
        >
          {selectedSection?.id}
        </button>

        <StyleEditor
          style={selectedSection?.style}
          onChange={(style) => {
            if (selectedSection) {
              updateSelectedSection?.({
                ...selectedSection,
                style,
              });
            }
          }}
        />
      </div>

      <hr className="nwcb-my-3" />

      <div>Block: {selectedBlock?.id}</div>

      <button
        onClick={() => {
          if (selectedBlock) {
            updateSelectedBlock?.({
              ...selectedBlock,
              style: {
                ...selectedBlock.style,
                backgroundColor: "#5C9D60",
                borderRadius: "24px",
                color: "white",
              },
            });
          }
        }}
      >
        {selectedBlock?.id}
      </button>

      {selectedBlock && (
        <BlockSetting
          block={selectedBlock}
          onChange={(block) => updateSelectedBlock?.(block)}
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
  const getBlockSettings = () => {
    switch (block.type) {
      case "html":
        return (
          <>
            {/* <StyleEditor
            style={block.style}
            onChange={(style) => {
              onChange({ ...block, style });
              }}
              /> */}
          </>
        );
      case "gallery":
        return "gallery";
      case "image":
        return (
          <>
            {/* <StyleEditor
            style={block.style}
            onChange={(style) => {
              onChange({ ...block, style });
              }}
              /> */}
            <ImageSetting block={block} />;
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <div className="nwcb-flex nwcb-flex-col">
      <div>
        <p>Type</p>

        <select
          onChange={(e) => {
            if (
              e.target.value === "html" ||
              e.target.value === "image" ||
              e.target.value === "gallery"
            )
              onChange({ ...block, type: e.target.value });
          }}
        >
          <option value={"html"}>HTML</option>
          <option value={"image"}>Image</option>
          <option value={"gallery"}>Gallery</option>
        </select>
      </div>
      {getBlockSettings()}
    </div>
  );
};

const ImageSetting = ({ block }: { block: Block }) => {
  return (
    <div className="nwcb-w-fit nwcb-h-fit">
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
          {/* 
            // TODO - width layout 
            // * full
          */}
          <p>W: </p>
          <input
            type="text"
            value={style?.width}
            className="nwcb-w-full nwcb-rounded focus-within:nwcb-outline-none"
            onChange={(e) => {
              onChange?.({
                ...style,
                width: `${e.target.value}px`,
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
          {/* 
            // TODO - height layout 
            // * fit-content
            // * fit-content
          */}
          <p>H: </p>
          <input
            type="text"
            value={style?.height}
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
      <div>
        <p>Grid</p>
        <input
          type="text"
          onChange={(e) => {
            onChange?.({
              ...style,
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
