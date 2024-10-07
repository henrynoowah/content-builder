import type { Block, Page, Section } from "@src/types";
import { lazy, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { convertStylesStringToObject } from "../../lib";

const SectionEditor = lazy(() => import("./section-editor"));

interface EditorContextProps {
  section?: Section;
  block?: Block;
  sections?: Section[];
  updateSection?: (section: Section) => void;
  updateBlock?: (block: Block) => void;
}
interface EditorProps {
  children?: ({
    section,
    block,
    sections,
    updateSection,
    updateBlock,
  }: EditorContextProps) => React.ReactNode;
  data?: Page;
  onChange?: (page: Page) => void;
  onSubmit?: (page: Page) => void;
}

const Editor = ({ data, onSubmit, children }: EditorProps) => {
  const methods = useForm<Page>({
    values: data,
  });

  const { handleSubmit, control } = methods;

  const { fields: sections, update: updateSection } = useFieldArray({
    control,
    name: `sections`,
    keyName: "keyId",
  });

  const onSubmitHandler = async (page: Page) => {
    onSubmit && onSubmit(page);
  };

  const containerName = "content-container";

  const [selectedBlock, setSelectedBlock] = useState<Block>();
  const [selectedSection, setSelectedSection] = useState<Section | undefined>(
    undefined
  );

  const updateSectionHandler = (section: Section) => {
    const sectionIndex = sections.findIndex((x) => x.id === section.id);
    updateSection(sectionIndex, section);
  };

  const updateBlockHandler = (block: Block) => {
    if (selectedSection) {
      const sectionIndex = sections.findIndex(
        (x) => x.id === selectedSection.id
      );
      const section = sections.find((x) => x.id === selectedSection.id);
      let newBlocks = section?.blocks ?? [];

      if (selectedBlock) {
        const blockIndex = newBlocks?.findIndex(
          (x) => x.id === selectedBlock?.id
        );
        newBlocks[blockIndex] = block;

        if (section) {
          updateSection(sectionIndex, { ...section, blocks: newBlocks });
        }
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        style={{
          ...convertStylesStringToObject(data?.style ?? ""),
          containerName,
        }}
        onSubmit={handleSubmit(onSubmitHandler, (err) => console.error(err))}
      >
        {sections.map((section, sectionIndex) => {
          const css = `
            #${section.id} {
              ${section.style}
            }
            @container ${containerName} (max-width: 768px) {
              #${section.id} {
                ${section.style_mobile}
              }
            }
          `;
          return (
            <div
              key={`${section.id}-style`}
              id={`section-${section.id}`}
              style={{
                containerType: "inline-size",
                containerName: containerName,
              }} // Apply container properties
              className={
                selectedSection?.id === section.id
                  ? "nwcb-ring-2 nwcb-ring-inset nwcb-ring-blue-400"
                  : ""
              }
            >
              <style>{css}</style>
              <SectionEditor
                key={`${section.id}`}
                // key={`${section.id}-${JSON.stringify(section.blocks)}`}
                section={section}
                index={sectionIndex}
                onSectionSelect={setSelectedSection}
                onBlockSelect={setSelectedBlock}
              />
            </div>
          );
        })}
      </form>

      {children?.({
        section: selectedSection,
        block: selectedBlock,
        updateSection: updateSectionHandler, // Pass updateSection method
        updateBlock: updateBlockHandler,
      })}
    </FormProvider>
  );
};

export default Editor;
