import type { Meta, StoryObj } from "@storybook/react";
import Editor from "./Editor";
import { convertJSONToCSS, convertStylesStringToObject } from "@src/lib";
import { CSSProperties } from "react";

// Explicitly typing meta as Meta<typeof Editor>
const meta: Meta<typeof Editor> = {
  title: "UI/Editor",
  component: (props) => (
    <div className="nwcb-flex nwcb-justify-center">
      <Editor {...props} />,
    </div>
  ),
  tags: ["autodocs"],
  parameters: { layout: "full" },
  // parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: ({ section, updateSection, block, updateBlock }) => (
      <div className="nwcb-fixed nwcb-top-0 nwcb-end-0 nwcb-w-80 nwcb-h-full nwcb-bg-slate-400">
        <div className=" nwcb-flex nwcb-flex-col nwcb-gap-4">
          <button
            onClick={() => {
              const style = `background-color: red; ${section?.style}`;
              if (section) {
                updateSection?.({
                  ...section,
                  style,
                });
              }
            }}
          >
            {section?.id}
          </button>
          <div className="nwcb-flex">
            <p>Padding</p>
            <input
              type="number"
              onChange={(e) => {
                if (!section) return;
                let style = convertStylesStringToObject(
                  section?.style ?? ""
                ) as CSSProperties;

                style.padding = `${e.target.value}px`;

                updateSection?.({
                  ...section,
                  style: convertJSONToCSS(style as any),
                });
              }}
            />
          </div>
        </div>

        <div>Block: {block?.id}</div>

        <button
          onClick={() => {
            const style = `padding: 24px; background-color: red; ${block?.style}`;
            if (block) {
              updateBlock?.({
                ...block,
                style,
              });
            }
          }}
        >
          {block?.id}
        </button>
      </div>
    ),
    onChange: () => {},
    onSubmit: () => {},
    data: {
      id: "page_1",
      title: "About Us",
      slug: "template",
      created_at: "2023-08-10T14:22:33.000Z",
      updated_at: "2024-07-11T12:11:22.000Z",
      url: "/template",
      seo: {
        title: "About Our Company",
        description: "Learn more about our company, mission, and values.",
        keywords: ["company", "mission", "values"],
      },
      style: "width: 1024px; max-width: 100%;",
      sections: [
        {
          id: "section-1",
          order: 1,
          style: "width: 100%; padding: 24px;",
          blocks: [
            {
              type: "html",
              id: "block_1",
              content:
                "<h1>Heading1</h1><br><h2>Heading2</h2><br><h3>Heading3</h3><br><h4>Heading4</h4><br><h5>Heading5</h5><br><h6>Heading6</h6>",
              images: [],
              style: "",
            },
          ],
        },
        {
          id: "section-2",
          order: 1,
          style:
            "display:grid; grid-template-columns: repeat(2, minmax(0, 1fr));",
          style_mobile:
            "display:grid; grid-template-columns: repeat(1, minmax(0, 1fr));",
          blocks: [
            {
              type: "image",
              id: "block-1",
              style: "",
              src: "https://velog.velcdn.com/images/henrynoowah/post/cb5c90fb-81d9-492d-b6dc-9cbb3af6ab2a/image.png",
              alt: "Our Team",
              caption: "Meet Our Team",
              images: [],
            },
            {
              id: "block-2",
              type: "html",
              style: "padding: 16px;",
              content:
                "<p>I think I am getting used to the editor feature customization</p><p>Few things that I need to add for the test editor</p><br><p>I think I am getting used to the editor feature customization</p><p>Few things that I need to add for the test editor</p><br><p>I think I am getting used to the editor feature customization</p><p>Few things that I need to add for the test editor</p><br><br>",
              images: [],
            },
            {
              id: "block-3",
              type: "html",
              style: "padding: 16px;",
              content:
                '<p>I think I am getting used to the editor feature customization</p><p>Few things that I need to add for the test editor</p><ul style="list-style: square;"><li style="margin: 0 0 0 1.25rem"><p>List item feature</p></li><li style="margin: 0 0 0 1.25rem"><p>Notion-like floating editor</p></li><li style="margin: 0 0 0 1.25rem"><p>Test</p></li><li style="margin: 0 0 0 1.25rem"><p>Test</p></li></ul><br>',
              images: [],
            },
            {
              type: "image",
              id: "block-4",
              style: "",
              src: "https://velog.velcdn.com/images/henrynoowah/post/7db404ca-3263-49ab-8566-9922d0a0b3e9/image.png",
              alt: "Our Team",
              caption: "Meet Our Team",
              images: [],
            },
            {
              id: "block-6",
              style: "padding: 16px;",
              type: "html",
              content:
                "<p>I have made a simple test page editor with a basic save feature for the content</p><p></p><p>Now I need to update the editor UI for more user-friendly experience</p><p></p><p>Also a mobile responsive configuration for grid layouts</p>",
              images: [],
            },
            {
              id: "block-5",
              type: "html",
              style: "padding: 16px;",
              content:
                "<div><p>I have made a simple test page editor with a basic save feature for the content</p><p></p></div>",
              images: [],
            },
          ],
        },
        {
          id: "section-3",
          order: 1,
          style:
            "display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px",
          style_mobile:
            "display:grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 16px;",
          blocks: [
            {
              type: "gallery",
              id: "block-3",
              style: "",
              images: [
                {
                  src: "https://velog.velcdn.com/images/henrynoowah/post/cb5c90fb-81d9-492d-b6dc-9cbb3af6ab2a/image.png",
                  alt: "Image 1",
                  caption: "Image 1 caption",
                },
                {
                  src: "https://velog.velcdn.com/images/henrynoowah/post/7db404ca-3263-49ab-8566-9922d0a0b3e9/image.png",
                  alt: "Image 2",
                  caption: "Image 2 caption",
                },
              ],
            },
            {
              type: "html",
              id: "block_1",
              style: "",
              content:
                "<p>Welcome to our company. We are dedicated to providing the best services...</p>",
              images: [],
            },
          ],
        },
      ],
    },
  },
};
