import type { Meta, StoryObj } from "@storybook/react";
import Renderer from "./Renderer";

// Explicitly typing meta as Meta<typeof Editor>
const meta: Meta<typeof Renderer> = {
  title: "UI/Renderer",
  component: Renderer,
  tags: ["autodocs"],
  parameters: { layout: "full" },
  // parameters: { layout: "centered" },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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
      // style: "width: 1024px; max-width: 100%;",
      style: {
        width: "100%",
        maxWidth: "100%",
      },
      sections: [
        {
          id: "section-1",
          order: 1,
          style: {
            display: "block",
            width: "100%",
            maxHeight: "620px",
            overflow: "hidden",
            // padding: "24px",
          },
          style_mobile: {
            width: "100%",
            // padding: "16px",
          },
          blocks: [
            {
              type: "image",
              id: "block-1",
              content:
                "<h1>Heading1</h1><h2>Heading2</h2><br><h3>Heading3</h3><br><h4>Heading4</h4><br><h5>Heading5</h5><br><h6>Heading6</h6>",
              src: "https://images.pexels.com/photos/3381115/pexels-photo-3381115.jpeg",
              images: [],
              style: {
                objectFit: "cover",
              },
            },
          ],
        },
        {
          id: "section-2",
          order: 1,
          style: {
            width: "1280px",
            maxWidth: "100%",
            paddingTop: "24px",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            // gap: "16px",
          },
          style_mobile: {
            display: "grid",
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            // gap: "16px",
          },
          blocks: [
            {
              type: "image",
              id: "block-1",
              style: {
                // borderRadius: "24px",
              },
              src: "https://images.pexels.com/photos/20607063/pexels-photo-20607063/free-photo-of-close-up-of-the-facade-of-an-apartment-building-with-balconies.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              alt: "Our Team",
              caption: "Meet Our Team",
              images: [],
            },

            {
              id: "block-2",
              type: "html",
              style: {
                padding: "24px",
              },
              content:
                "<p>I think I am getting used to the editor feature customization</p><p>Few things that I need to add for the test editor</p><br><p>I think I am getting used to the editor feature customization</p><p>Few things that I need to add for the test editor</p><br><p>I think I am getting used to the editor feature customization</p><p>Few things that I need to add for the test editor</p><br><br>",
              images: [],
            },
            {
              id: "block-3",
              type: "html",
              style: {
                padding: "24px",
              },
              content:
                '<p>I think I am getting used to the editor feature customization</p><p>Few things that I need to add for the test editor</p><ul style="list-style: square;"><li style="margin: 0 0 0 1.25rem"><p>List item feature</p></li><li style="margin: 0 0 0 1.25rem"><p>Notion-like floating editor</p></li><li style="margin: 0 0 0 1.25rem"><p>Test</p></li><li style="margin: 0 0 0 1.25rem"><p>Test</p></li></ul><br>',
              images: [],
            },
            {
              id: "block-4",
              type: "image",
              style: {
                // borderRadius: "16px",
                // padding: "16px",
                objectFit: "contain",
              },
              src: "https://images.pexels.com/photos/63430/pexels-photo-63430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
              alt: "Our Team",
              caption: "Meet Our Team",
              images: [],
            },
            {
              id: "block-5",
              style: {
                padding: "16px",
              },
              type: "html",
              content:
                "<p>I have made a simple test page editor with a basic save feature for the content</p><p></p><p>Now I need to update the editor UI for more user-friendly experience</p><p></p><p>Also a mobile responsive configuration for grid layouts</p>",
              images: [],
            },
            {
              id: "block-6",
              type: "html",
              style: {
                padding: "16px",
              },
              content:
                "<div><p>I have made a simple test page editor with a basic save feature for the content</p><p></p></div>",
              images: [],
            },
          ],
        },
        {
          id: "section-3",
          order: 1,
          style: {
            width: "1280px",
            maxWidth: "100%",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "16px",
          },
          style_mobile: {
            gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
            gap: "16px",
          },
          blocks: [
            {
              type: "gallery",
              id: "block-3",
              style: {
                // width: "100%",
                // borderRadius: "24px",
              },
              images: [
                {
                  src: "https://images.pexels.com/photos/3381115/pexels-photo-3381115.jpeg",
                  alt: "Image 1",
                  caption: "Image 1 caption",
                },
                {
                  src: "https://images.pexels.com/photos/20607063/pexels-photo-20607063/free-photo-of-close-up-of-the-facade-of-an-apartment-building-with-balconies.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                  alt: "Image 2",
                  caption: "Image 2 caption",
                },
              ],
            },
            {
              type: "html",
              id: "block-1",
              style: {},
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
