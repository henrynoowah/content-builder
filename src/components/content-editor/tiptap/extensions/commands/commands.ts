import { CommandProps, Extension, ReactRenderer } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";
import tippy, { GetReferenceClientRect, Instance } from "tippy.js";
import { CommandsView } from "./CommandView";

const CommandsPlugin = Extension.create({
  name: "insertMenu",
  addProseMirrorPlugins() {
    return [
      Suggestion<CommandProps>({
        editor: this.editor,
        char: "/",
        command: ({ editor, range, props }) => {
          props.command({ editor, range, props });
        },
        items: ({ query }) => {
          return (
            [
              // {
              //   title: 'Heading',
              //   attrs: {
              //     'data-test-id': 'insert-heading1'
              //   },
              //   command: ({ editor }:any) => {
              //     const selection = editor.view.state.selection
              //     const from = selection.$from.posAtIndex(0)
              //     const to = selection.$from.posAtIndex(1)
              //     editor
              //       .chain()
              //       .focus()
              //       .deleteRange({ from, to })
              //       .setNode('heading', { level: 1 })
              //       .run()
              //   }
              // },
              // {
              //   title: 'Subheading',
              //   attrs: {
              //     'data-test-id': 'insert-heading2'
              //   },
              //   command: ({ editor }) => {
              //     const selection = editor.view.state.selection
              //     const from = selection.$from.posAtIndex(0)
              //     const to = selection.$from.posAtIndex(1)
              //     editor
              //       .chain()
              //       .focus()
              //       .deleteRange({ from, to })
              //       .setNode('heading', { level: 2 })
              //       .run()
              //   }
              // },
              // {
              //   title: 'Small Subheading',
              //   attrs: {
              //     'data-test-id': 'insert-heading3'
              //   },
              //   command: ({ editor }) => {
              //     const selection = editor.view.state.selection
              //     const from = selection.$from.posAtIndex(0)
              //     const to = selection.$from.posAtIndex(1)
              //     editor
              //       .chain()
              //       .focus()
              //       .deleteRange({ from, to })
              //       .setNode('heading', { level: 3 })
              //       .run()
              //   }
              // },
              // {
              //   title: 'Quote',
              //   attrs: {
              //     'data-test-id': 'insert-quote'
              //   },
              //   command: ({ editor, range }) => {
              //     const selection = editor.view.state.selection
              //     const from = selection.$from.posAtIndex(0)
              //     const to = selection.$from.posAtIndex(1)
              //     editor
              //       .chain()
              //       .focus()
              //       .deleteRange({ from, to })
              //       .setBlockquote()
              //       .run()
              //   }
              // },
              {
                title: "Bullet List",
                attrs: {
                  "data-test-id": "insert-bullet-list",
                },
                command: ({ editor, range: _ }: any) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .toggleBulletList()
                    .run();
                },
              },
              {
                title: "Numbered List",
                attrs: {
                  "data-test-id": "insert-ordered-list",
                },
                command: ({ editor, range: _ }: any) => {
                  const selection = editor.view.state.selection;
                  const from = selection.$from.posAtIndex(0);
                  const to = selection.$from.posAtIndex(1);
                  editor
                    .chain()
                    .focus()
                    .deleteRange({ from, to })
                    .toggleOrderedList()
                    .run();
                },
              },
              // {
              //   title: 'Code Block',
              //   attrs: {
              //     'data-test-id': 'insert-code'
              //   },
              //   command: ({ editor, range }) => {
              //     const selection = editor.view.state.selection
              //     const from = selection.$from.posAtIndex(0)
              //     const to = selection.$from.posAtIndex(1)
              //     editor
              //       .chain()
              //       .focus()
              //       .deleteRange({ from, to })
              //       .setCodeBlock()
              //       .run()
              //   }
              // },
              // {
              //   title: 'Callout',
              //   attrs: {
              //     'data-test-id': 'insert-callout'
              //   },
              //   command: ({ editor, range }) => {
              //     const selection = editor.view.state.selection
              //     const from = selection.$from.posAtIndex(0)
              //     const to = selection.$from.posAtIndex(1)
              //     editor
              //       .chain()
              //       .focus()
              //       .deleteRange({ from, to })
              //       .setCallout()
              //       .run()
              //   }
              // },
              // {
              //   title: 'Image',
              //   attrs: {
              //     'data-test-id': 'insert-image'
              //   },
              //   command: ({ editor, range }) => {
              //     const selection = editor.view.state.selection
              //     const from = selection.$from.posAtIndex(0)
              //     const to = selection.$from.posAtIndex(1)
              //     editor
              //       .chain()
              //       .focus()
              //       .deleteRange({ from, to })
              //       .insertContentAt(from, { type: 'imagePlaceholder' })
              //       .run()
              //   }
              // },
              // {
              //   title: 'Video',
              //   attrs: {
              //     'data-test-id': 'insert-video'
              //   },
              //   command: ({ editor, range }) => {
              //     const selection = editor.view.state.selection
              //     const from = selection.$from.posAtIndex(0)
              //     const to = selection.$from.posAtIndex(1)
              //     editor
              //       .chain()
              //       .focus()
              //       .deleteRange({ from, to })
              //       .insertContentAt(from, { type: 'videoPlaceholder' })
              //       .run()
              //   }
              // }
            ] as any[]
          )
            .filter((item: any) => {
              return item.title.toLowerCase().startsWith(query.toLowerCase());
            })
            .slice(0, 10);
        },
        startOfLine: true,
        allow: ({ state, range: _, editor: __ }) => {
          const node = state.selection.$from.node();
          if (!node) return false;
          return node.textBetween(0, 1) === "/";
        },
        render: () => {
          let component: ReactRenderer<CommandsView, any>, popup: Instance<any>;
          return {
            onStart: (props) => {
              component = new ReactRenderer(CommandsView, {
                props,
                editor: props.editor,
              });
              popup = tippy(props.editor.options.element, {
                getReferenceClientRect:
                  props.clientRect as GetReferenceClientRect,
                content: component.element,
                showOnCreate: true,
                interactive: true,
                trigger: "manual",
                placement: "bottom-start",
              });
            },
            onUpdate: (props) => {
              component.updateProps(props);
              popup.setProps({
                getReferenceClientRect: props.clientRect,
              });
            },
            onKeyDown: ({ event }) => {
              if (event.key === "Escape") {
                popup.hide();
                return true;
              }
              if (component.ref)
                return component.ref.onKeyDown(event as KeyboardEvent);
              else return true;
            },
            onExit: () => {
              component.destroy();
              popup.destroy();
            },
          };
        },
      }),
    ];
  },
});

export default CommandsPlugin;
