import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { convertJSONToCSS } from "@src/lib";
import type { Block, Page, Section, SectionEditor } from "@src/types";
import { lazy, useRef, useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

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

  const { handleSubmit, control, setValue } = methods;

  const { fields: sections, update: updateSection } = useFieldArray({
    control,
    name: `sections`,
    keyName: "keyId",
  });

  const onSubmitHandler = async (page: Page) => {
    onSubmit && onSubmit(page);
  };

  const containerName = "content-container";

  const [selectedSection, setSelectedSection] = useState<Section>();
  const [selectedBlock, setSelectedBlock] = useState<Block>();

  const updateSectionHandler = (section: Section) => {
    const sectionIndex = sections.findIndex((x) => x.id === section.id);
    updateSection(sectionIndex, section);
  };

  const updateBlockHandler = (block: Block) => {
    if (selectedSectionRef.current && selectedSection) {
      if (selectedBlock) {
        const blockIndex =
          selectedSectionRef.current?.section.blocks?.findIndex(
            (x) => x.id === selectedBlock?.id
          ) ?? 0;

        selectedSectionRef.current.updateBlock(blockIndex, block);
      }
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 250 },
    })
  );

  const selectedSectionRef = useRef<SectionEditor>(null);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;

    const getPosition = (id: UniqueIdentifier) =>
      sections.findIndex((x) => x.id === id);

    const originalPos = getPosition(active.id);
    const newPos = getPosition(over.id);

    if (originalPos !== -1 && newPos !== -1) {
      setValue("sections", arrayMove<Section>(sections, originalPos, newPos));
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        style={{
          ...data?.style,
          containerName,
        }}
        onSubmit={handleSubmit(onSubmitHandler, (err) => console.error(err))}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={sections} strategy={rectSortingStrategy}>
            {sections.map((section, i) => {
              const css = `
                #${section.id} {
                  ${convertJSONToCSS(section.style)}
                }
                @container ${containerName} (max-width: 768px) {
                  #${section.id} {
                    ${convertJSONToCSS(section.style_mobile)}
                }
              `;
              return (
                <div
                  key={`${section.id}`}
                  id={`section-${section.id}`}
                  style={{
                    containerType: "inline-size",
                    containerName: containerName,
                  }}
                  // ? Apply container properties
                  className={
                    selectedSection?.id === section.id
                      ? "nwcb-ring-2 nwcb-ring-inset nwcb-ring-blue-400"
                      : ""
                  }
                >
                  <style>{css}</style>
                  <SectionEditor
                    ref={
                      i ===
                      sections.findIndex(
                        (section) => section.id === selectedSection?.id
                      )
                        ? selectedSectionRef
                        : undefined
                    }
                    key={`${section.id}`}
                    section={section}
                    index={i}
                    onSectionSelect={setSelectedSection}
                    onBlockSelect={setSelectedBlock}
                  />
                </div>
              );
            })}
          </SortableContext>
        </DndContext>
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
