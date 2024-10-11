import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arraySwap,
  rectSwappingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Block, Page, Section } from "@src/types";
import { forwardRef, lazy, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

const BlockEditor = lazy(() => import("../block-editor"));

interface EditorProps {
  onSectionSelect: (section: Section) => void;
  onBlockSelect: (block: Block) => void;
  section: Section;
  index: number;
}
const SectionEditor = forwardRef<Section, EditorProps>(
  ({ onSectionSelect, onBlockSelect, section, index }, ref) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: section.id,
      });

    const style = {
      transition,
      transform: CSS.Transform.toString(transform),
    };

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

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const onDragStart = ({ active }: DragStartEvent) => {
      setActiveId(active.id);
    };

    const onDragEnd = ({ active, over }: DragEndEvent) => {
      if (!over || active.id === over.id) return;

      const getPosition = (id: UniqueIdentifier) =>
        blocks.findIndex((x) => x.id === id);

      const originalPos = getPosition(active.id);

      const newPos = getPosition(over.id);

      setValue(
        `sections.${index}.blocks`,
        arraySwap(blocks, originalPos, newPos)
      );

      setActiveId(null);
    };

    return (
      <section
        ref={setNodeRef}
        id={section.id}
        onClick={() => {
          onSectionSelect(section);
        }}
        className=" nwcb-h-fit"
        style={{
          ...style,
        }}
        {...attributes}
        {...listeners}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={blocks} strategy={rectSwappingStrategy}>
            {blocks?.map((block, i) => (
              <BlockEditor
                onBlockSelect={onBlockSelect}
                key={`block-container-${block.id}-${JSON.stringify(
                  block.style
                )}`}
                block={block}
                onChange={(block) => update(i, block)}
              />
            ))}
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <BlockEditor
                block={blocks.find((x) => x.id === activeId) as Block}
                onChange={() => {}}
                onBlockSelect={() => {}}
              />
            ) : null}
          </DragOverlay>
        </DndContext>
      </section>
    );
  }
);

export default SectionEditor;
