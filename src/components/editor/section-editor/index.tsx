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
import { Page, Section } from "@src/types";
import { lazy } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const BlockEditor = lazy(() => import("../block-editor"));

const SectionEditor = ({
  section,
  index,
}: {
  section: Section;
  index: number;
}) => {
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
      <section id={section.id}>
        <SortableContext items={blocks} strategy={rectSwappingStrategy}>
          {blocks?.map((block, i) => (
            <BlockEditor
              key={`block-container-${block.id}`}
              block={block}
              onChange={(block) => update(i, block)}
            />
          ))}
        </SortableContext>
      </section>
    </DndContext>
  );
};

export default SectionEditor;
