import { Fragment } from "react/jsx-runtime";
import { convertStylesStringToObject } from "../../lib";
import { lazy } from "react";
import type { Block, Page } from "@src/types";
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
  return (
    <div style={{ ...convertStylesStringToObject(data.style) }}>
      {data.sections?.map((section: any) => {
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
          <Fragment key={section.id}>
            <style>{css}</style>
            <section id={section.id}>
              {section.blocks?.map((block: any) => {
                return (
                  <div
                    key={`block-container-${block.id}`}
                    style={{
                      ...convertStylesStringToObject(block.style ?? ""),
                    }}
                  >
                    {block.type === "html" && (
                      <div
                        dangerouslySetInnerHTML={{ __html: block.content }}
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
