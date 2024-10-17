import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  rectIntersection,
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
import {
  Block,
  Page,
  Section,
  SectionEditor as SectionEditorContext,
} from "@src/types";
import { forwardRef, lazy, useImperativeHandle, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { snapCenterToCursor } from "@dnd-kit/modifiers";
import { PositionedOverlay } from "@dnd-kit/core/dist/components/DragOverlay/components";

const BlockEditor = lazy(() => import("../block-editor"));

interface SectionEditorProps {
  onSectionSelect: (section: Section) => void;
  onBlockSelect: (block?: Block) => void;
  section: Section;
  index: number;
}

const SectionEditor = forwardRef<SectionEditorContext, SectionEditorProps>(
  ({ onSectionSelect, onBlockSelect, section, index }, ref) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: section.id,
      });

    const style = {
      transition,
      transform: CSS.Translate.toString(transform),
    };

    const { control, watch } = useFormContext<Page>();
    const {
      fields: blocks,
      update,
      replace,
    } = useFieldArray({
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
    const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

    const onDragStart = ({ active }: DragStartEvent) => {
      setActiveId(active.id);
      onSectionSelect(section);
    };

    const onDragEnd = ({ active, over }: DragEndEvent) => {
      if (!over || active.id === over.id) return;

      const getPosition = (id: UniqueIdentifier) =>
        blocks.findIndex((x) => x.id === id);

      const originalPos = getPosition(active.id);

      const newPos = getPosition(over.id);

      const newArr = arraySwap(blocks, originalPos, newPos).map((block, i) => ({
        ...block,
        order: i + 1,
      }));

      // replace(newArr);

      replace(newArr);

      setActiveId(null);
      setSelectedBlock(active.data.current as Block);
    };

    useImperativeHandle(
      ref,
      () => ({
        section: watch(`sections.${index}`),
        selectedBlock,
        updateBlock: (i: number, block: Block) => update(i, block),
      }),
      [selectedBlock]
    );

    const fixCursorSnapOffset: CollisionDetection = (args) => {
      // Bail out if keyboard activated
      if (!args.pointerCoordinates) {
        return rectIntersection(args);
      }
      const { x, y } = args.pointerCoordinates;
      const { width, height } = args.collisionRect;
      const updated = {
        ...args,
        // The collision rectangle is broken when using snapCenterToCursor. Reset
        // the collision rectangle based on pointer location and overlay size.
        collisionRect: {
          width,
          height,
          bottom: y + height / 2,
          left: x - width / 2,
          right: x + width / 2,
          top: y - height / 2,
        },
      };
      return rectIntersection(updated);
    };

    return (
      <section
        ref={setNodeRef}
        id={section.id}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onBlockSelect(undefined);
          }
          onSectionSelect(section);
        }}
        className="nwcb-h-fit"
        style={
          {
            // ...style,
          }
        }
        {...attributes}
        {...listeners}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={fixCursorSnapOffset}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={blocks} strategy={rectSwappingStrategy}>
            {blocks?.map((block, i) => (
              <BlockEditor
                key={`block-container-${block.id}`}
                onSelect={(block) => {
                  onBlockSelect(block);
                  setSelectedBlock(block);
                }}
                block={block}
                onChange={(block) => update(i, block)}
              />
            ))}
          </SortableContext>

          <DragOverlay modifiers={[snapCenterToCursor]}>
            {activeId ? (
              <div className="nwcb-opacity-30">
                <BlockEditor
                  block={blocks.find((x) => x.id === activeId) as Block}
                  onChange={() => {}}
                  onSelect={() => {}}
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </section>
    );
  }
);

export default SectionEditor;
