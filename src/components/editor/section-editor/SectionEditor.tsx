import {
  closestCorners,
  DndContext,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arraySwap,
  rectSwappingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { Block, Page, Section } from "@src/types";
import { forwardRef, lazy } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const BlockEditor = lazy(() => import("../block-editor"));

const SectionEditor = forwardRef<
  HTMLDivElement,
  {
    onSectionSelect: (section: Section) => void;
    onBlockSelect: (block: Block) => void;
    section: Section;
    index: number;
  }
>(({ onSectionSelect, onBlockSelect, section, index }, ref) => {
  const { control, setValue } = useFormContext<Page>();
  const { fields: blocks, update } = useFieldArray({
    control,
    name: `sections.${index}.blocks`,
    keyName: "keyId",
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 250 },
      // activationConstraint: { delay: 250, tolerance: 0 },
    })
    // useSensor(TouchSensor),
    // useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) return;

        const getPosition = (id: UniqueIdentifier) =>
          blocks.findIndex((x) => x.id === id);

        const originalPos = getPosition(active.id);

        const newPos = getPosition(over.id);

        setValue(
          `sections.${index}.blocks`,
          arraySwap(blocks, originalPos, newPos)
        );
      }}
    >
      <section
        id={section.id}
        ref={ref}
        onClick={() => {
          onSectionSelect(section);
        }}
      >
        <SortableContext items={blocks} strategy={rectSwappingStrategy}>
          {blocks?.map((block, i) => (
            <BlockEditor
              onBlockSelect={onBlockSelect}
              key={`block-container-${block.id}-${JSON.stringify(block.style)}`}
              block={block}
              onChange={(block) => update(i, block)}
            />
          ))}
        </SortableContext>
      </section>
    </DndContext>
  );
});

export default SectionEditor;
