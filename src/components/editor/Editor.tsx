import { Page } from "@src/types";
import { lazy } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { convertStylesStringToObject } from "../../lib";

const SectionEditor = lazy(() => import("./section-editor"));

interface EditorProps {
  data?: Page;
  onChange?: (page: Page) => void;
  onSubmit?: (page: Page) => void;
}

const Editor = ({ data, onSubmit }: EditorProps) => {
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
