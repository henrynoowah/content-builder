# @noowah/content-builder

A React component for building and managing web content, designed to offer a flexible, customizable content editor inspired by popular tools like [Sanity.io](https://www.sanity.io/) and [Builder.io](https://www.builder.io/). This component is built on top of the [Tiptap](https://tiptap.dev/) editor, allowing for rich text editing with advanced features and custom content structures.

## Features

- **Customizable Content Structure**: Easily create and organize content with a flexible structure using `Pages`, `Sections`, and `Blocks`.
- **Rich Text Editing**: Leverage the power of the Tiptap editor for advanced rich text editing functionality.
- **Media Support**: Add images and galleries with captions, alt text, and styling options.
- **Drag-and-Drop Support**: Utilize the `react-sortable-js` library for easy drag-and-drop reordering of blocks and sections.
- **Mobile-Responsive Layouts**: Define different styles for mobile and desktop layouts.

## Installation

To install the package using `npm`, run:

```bash
npm install @noowah/content-builder
yarn add @noowah/content-builder
```


## Basic Usage

```tsx
import React from 'react';
import { Editor } from '@noowah/content-builder';

const MyPageEditor = () => {
  const initialContent = {
    id: "page_1",
    title: "About Us",
    slug: "about-us",
    sections: [
      {
        id: "section-1",
        order: 1,
        style: "width: 100%;",
        blocks: [
          {
            type: "html",
            id: "block_1",
            content: "<p>Welcome to our company. We are dedicated to providing the best services...</p>",
          },
        ],
      },
    ],
  };

  return <Editor data={initialContent} />;
};

export default MyPageEditor;
```

## Types

```ts
type Page = {
  title: string;
  slug: string;
  style: string;
  sections: Section[];
};

type Section = {
  id: string;
  order?: number;
  style?: string;
  style_mobile?: string;
  blocks: Block[];
};

type Block = {
  id: string;
  type: "html" | "image" | "gallery";
  style?: string;

  // For image / gallery
  src?: string;
  alt?: string;
  caption?: string;
  images?: {
    src?: string;
    alt?: string;
    caption?: string;
  }[];

  // For html
  content?: string;
};

```
