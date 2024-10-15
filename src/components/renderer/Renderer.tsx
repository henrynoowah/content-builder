import type { Block, Page } from "@src/types";
import { lazy } from "react";
import { Fragment } from "react/jsx-runtime";
import { convertJSONToCSS } from "../../lib";
const Carousel = lazy(() => import("@src/components/carousel"));

interface Params {
  data: Page;
  render?: {
    html?: (block: Block) => React.ReactNode;
    image?: (block: Block) => React.ReactNode;
    gallery?: (block: Block) => React.ReactNode;
  };
}
const Renderer = ({ data, render }: Params) => {
  const containerName = "content-container";
  return (
    <div style={data.style}>
      {data.sections?.map((section) => {
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
          <Fragment key={section.id}>
            <style>{css}</style>
            <section id={section.id}>
              {section.blocks?.map((block) => {
                return (
                  <div key={`block-container-${block.id}`}>
                    {block.type === "html" && (
                      <div
                        style={{
                          ...block.style,
                        }}
                        dangerouslySetInnerHTML={{
                          __html: block.content ?? "",
                        }}
                      />
                    )}
                    {block.type === "image" &&
                      (render?.image ? (
                        render.image(block)
                      ) : (
                        <img
                          key={`section-block-container-${block.id}`}
                          src={block.src}
                          alt={block.alt}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            objectPosition: "center",
                            ...block.style,
                          }}
                        />
                      ))}
                    {block.type === "gallery" && <Carousel {...block} />}
                  </div>
                );
              })}
            </section>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Renderer;
