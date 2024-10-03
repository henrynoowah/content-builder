import { Node, mergeAttributes } from '@tiptap/core'

// Tip Tap Paragraph Extension that changes the default tag to div from p
// Based on: https://github.com/ueberdosis/tiptap/tree/main/packages/extension-paragraph
const ParagraphDiv = Node.create({
  name: 'paragraphDiv',

  priority: 1000,

  defaultOptions: {
    HTMLAttributes: {}
  },

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [{ tag: 'div' }]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0
    ]
  },

  addCommands() {
    return {
      setParagraph:
        () =>
        ({ commands }) => {
          return commands.toggleNode('paragraphDiv', 'paragraphDiv')
        }
    }
  }
})

export default ParagraphDiv
