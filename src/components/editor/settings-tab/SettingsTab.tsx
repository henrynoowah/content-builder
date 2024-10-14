import { convertJSONToCSS, convertStylesStringToObject } from "@src/lib";
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
            const style = `gap: 16px; ${section?.style}`;
            if (section) {
              updateSection?.({
                ...section,
                style,
              });
            }
          }}
        >
          {section?.id}
        </button>
        <div className="nwcb-flex">
          <p>Padding</p>
          <input
            type="number"
            onChange={(e) => {
              if (!section) return;
              let style = convertStylesStringToObject(
                section?.style ?? ""
              ) as CSSProperties;

              style.padding = `${e.target.value}px`;

              updateSection?.({
                ...section,
                style: convertJSONToCSS(style as any),
              });
            }}
          />
        </div>
      </div>

      <hr className="nwcb-my-3" />

      <div>Block: {block?.id}</div>

      {block && <BlockSetting block={block} />}

      <button
        onClick={() => {
          const style = `background-color: #5C9D60; border-radius: 24px; color: white; ${block?.style}`;
          if (block) {
            updateBlock?.({
              ...block,
              style,
            });
          }
        }}
      >
        {block?.id}
      </button>
    </div>
  );
};

export default SettingsTab;

const BlockSetting = ({ block }: { block: Block }) => {
  switch (block.type) {
    case "html":
      return "HTMKL";
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
