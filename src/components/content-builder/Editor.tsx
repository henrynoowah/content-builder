import {
  closestCorners,
  DndContext,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSwappingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from "react-hook-form";
import TiptapEditor from "./tiptap/tiptap";
import { Block, Page, Section } from "./types";
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
const Editor = ({ data, onSubmit }: Params) => {
  const methods = useForm<Page>({
    values: data,
  });

  const { handleSubmit, control } = methods;

  const { fields: sections } = useFieldArray({
    control,
    name: `sections`,
    keyName: "keyId",
  });

  const onSubmitHandler = async (page: Page) => {
    onSubmit && onSubmit(page);
  };

  const containerName = "content-container";

  return (
    <FormProvider {...methods}>
      <form
        style={{
          ...convertStylesStringToObject(data?.style ?? ""),
          containerName,
        }}
        onSubmit={handleSubmit(onSubmitHandler, (err) => console.error(err))}
      >
        {sections.map((section, i) => {
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
            >
              <style>{css}</style>
              <SectionEditor key={section.id} section={section} index={i} />
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
          arrayMove(blocks, originalPos, newPos)
        );
      }}
    >
      <section id={section.id}>
        <SortableContext items={blocks} strategy={rectSwappingStrategy}>
          {blocks?.map((block, i) => (
            <BlockEditor
              key={`block-container-${block.id}-${i}`}
              block={block}
              onChange={(block) => update(i, block)}
            />
          ))}
        </SortableContext>
      </section>
    </DndContext>
  );
};

import { CSS } from "@dnd-kit/utilities";
const BlockEditor = ({
  block,
  onChange,
}: {
  isSorting?: boolean;
  block: Block;
  onChange: (block: Block) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: block.id,
    });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  return (
    <div
      ref={setNodeRef}
      id={block.id}
      style={{
        ...convertStylesStringToObject(block.style ?? ""),
        ...style,
      }}
      onClick={() => {}}
      className="relative group/block ring-[1px] ring-transparent hover:ring-blue-400/60 cursor-pointer"
      {...attributes}
      {...listeners}
    >
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
    </div>
  );
};
