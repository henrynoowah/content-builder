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
import Heading from "@tiptap/extension-heading";
import HardBreak from "@tiptap/extension-hard-break";
import { CSSProperties } from "react";

interface Params {
  content?: string;
  style?: CSSProperties;
  onUpdate: (html?: string) => void;
  disabled?: boolean;
}

// Then, you would register this custom node in your Tiptap editor schema.

const TiptapEditor = ({
  // disabled
  content,
  style,
  onUpdate,
}: Params) => {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: `focus:nwcb-outline-none nwcb-cursor-text`,
      },
    },
    extensions: [
      Document,
      Paragraph,
      Heading,
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
      HardBreak.configure({
        keepMarks: false,
        HTMLAttributes: {
          style: "",
        },
      }),
    ],
    onUpdate: ({
      editor,
      //  transaction
    }) => {
      // onUpdate(editor.getHTML())

      const updated = editor
        .getHTML()
        // ? replace empty paragraph to a <br> line break to match rendred HTML
        .replaceAll("<p></p>", "<br>");

      onUpdate(updated);

      console.log(updated);
    },
    content:
      content?.replaceAll("<br>", "<p></p>") ?? "<p>Hello World! 🌎️</p>",
  });

  return (
    <div>
      <EditorContent editor={editor} style={style} />

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
