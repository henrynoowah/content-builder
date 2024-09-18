import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import { Block, Page, Section } from "./types";
import { ReactSortable } from "react-sortablejs";
import TiptapEditor from "./tiptap/tiptap";
import { useState } from "react";

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

interface Params {
  data?: Page;
  onChange?: (page: Page) => void;
  onSubmit?: (page: Page) => void;
}

const Editor = ({ data, onChange }: Params) => {
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const methods = useForm<Page>({
    values: data,
  });

  const { handleSubmit, control, setValue, watch } = methods;

  const { fields: sections, update } = useFieldArray({
    control,
    name: `sections`,
    keyName: "keyId",
  });

  const onSubmitHandler = async (page: Page) => {
    const payload = page as Page;
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitHandler, (err) => console.error(err))}
      >
        {sections.map((section, i) => {
          const css = `
                #${section.id} {
                  ${section.style}
                }
                @media (max-width: 768px) {
                  #${section.id} {
                    ${section.style_mobile}
                  } 
                }
              `;
          return (
            <div key={`${section.id}-style`}>
              <style>{css}</style>
              <SectionEditor
                isSorting={isSorting}
                setIsSorting={setIsSorting}
                key={section.id}
                section={section}
                index={i}
              />
            </div>
          );
        })}
      </form>
    </FormProvider>
  );
};

export default Editor;

const SectionEditor = ({
  section,
  index,
  isSorting,
  setIsSorting,
}: {
  section: Section;
  index: number;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
}) => {
  const { control, setValue } = useFormContext<Page>();
  const { fields: blocks, update } = useFieldArray({
    control,
    name: `sections.${index}.blocks`,
    keyName: "keyId",
  });

  return (
    <ReactSortable
      id={section.id}
      // swap={true}
      // forceFallback={true}
      key={section.id}
      // style={{ ...convertStylesStringToObject(section.style ?? '') }}
      animation={150}
      swapThreshold={1}
      list={blocks}
      setList={(blocks) => {
        setValue(`sections.${index}.blocks`, blocks);
      }}
      onChoose={() => setIsSorting(true)}
      onUnchoose={() => setIsSorting(false)}
      onEnd={() => setIsSorting(false)}
      handle=".handle"
    >
      {blocks?.map((block, i) => (
        <BlockEditor
          isSorting={isSorting}
          key={`block-container-${block.id}-${i}`}
          block={block}
          onChange={(block) => update(i, block)}
        />
      ))}
    </ReactSortable>
  );
};

const BlockEditor = ({
  isSorting,
  block,
  onChange,
}: {
  isSorting?: boolean;
  block: Block;
  onChange: (block: Block) => void;
}) => {
  return (
    <div
      id={block.id}
      style={{
        ...convertStylesStringToObject(block.style ?? ""),
      }}
      onClick={() => {}}
      className="relative group/block ring-[1px] ring-transparent hover:ring-blue-400/60 cursor-pointer"
    >
      {isSorting && (
        <span className="absolute start-0 top-0 z-10 w-full h-full bg-gray-300/20" />
      )}
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
      {block.type === "gallery" &&
        block.images.map((image: any) => (
          <div
            key={`section-block-container-${block.id}-${image.alt}`}
            className="w-full relative flex justify-center items-center bg-gray-400"
          >
            <img
              src={image.src}
              alt={image.keyId}
              style={{}}
              className="object-contain"
            />
          </div>
        ))}

      <div className="absolute pointer-events-none -top-5 -start-5 w-10 h-10 rounded-full bg-gray-50 text-blue-400 px-2 py-1 text-sm opacity-0 group-hover/block:opacity-100 flex justify-center items-center">
        <button type="button" className="pointer-events-auto handle">
          |||
        </button>
      </div>
    </div>
  );
};
