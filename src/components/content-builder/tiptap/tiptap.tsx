import BulletList from "@tiptap/extension-bullet-list";
import Color from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import FloatingMenu from "@tiptap/extension-floating-menu";
import Focus from "@tiptap/extension-focus";
import Highlight from "@tiptap/extension-highlight";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import { EditorContent, useEditor, FloatingMenu as FMenu } from "@tiptap/react";
import CustomDiv from "./extensions/custom-div";
import CommandsPlugin from "./extensions/commands/commands";

interface Params {
  content?: string;
  onUpdate: (html?: string) => void;
  disabled?: boolean;
}

// Then, you would register this custom node in your Tiptap editor schema.

const TiptapEditor = ({
  // disabled
  content,
  onUpdate,
}: Params) => {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `focus:outline-none bg-white text-black font-mono`,
        // class: `focus:outline-none cursor-text`,
      },
    },
    extensions: [
      Document,
      Paragraph,
      // Paragraph2,
      Text,
      Color,
      TextStyle,
      // DivNode,
      Highlight.configure({ multicolor: true }),
      CustomDiv.configure({
        HTMLAttributes: {
          // class: 'my-custom-div',
          // style: 'padding: 10px'
        },
      }),
      Focus.configure({
        // className: "ring-[1px] ring-gray-300/20 ring-inset rounded",
        mode: "all",
      }),
      // DraggableItem,
      ListItem.configure({
        HTMLAttributes: {
          style: "margin: 0 0 0 1.25rem",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          style: "list-style: square;",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          style: "list-style: decimal",
        },
      }),
      FloatingMenu.configure({
        shouldShow: ({
          editor,
          // view, state, oldState
        }) => {
          return editor.isActive("paragraph");
        },
      }),
      CommandsPlugin,
      // HardBreak.configure({
      //   keepMarks: true,
      //   HTMLAttributes: {
      //     style: "",
      //   },
      // }),
    ],
    onUpdate: ({
      editor,
      //  transaction
    }) => {
      // onUpdate(editor.getHTML())
      onUpdate(
        editor
          .getHTML()
          // ? reaplce empty paragraph to a <br> line break to match rendred HTML
          .replaceAll("<p></p>", "<br>")
      );
    },
    content: content ?? "<p>Hello World! 🌎️</p>",
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <EditorContent editor={editor} />

      {editor && (
        <FMenu editor={editor}>
          <span
            style={{
              opacity: 0.8,
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
            }}
          >
            Type / to browse options
          </span>
        </FMenu>
      )}
    </div>
  );
};

export default TiptapEditor;
