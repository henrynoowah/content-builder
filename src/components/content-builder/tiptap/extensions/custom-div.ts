import { Node, mergeAttributes } from '@tiptap/core'

const CustomDiv = Node.create({
  name: 'customDiv',

  group: 'block',

  content: 'block*', // Allow block content within the div

  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {}
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0
    ]
  },

  addAttributes() {
    return {
      style: {
        default: '',
        parseHTML: (element) => element.getAttribute('style') || '',
        renderHTML: (attributes) => {
          if (attributes.style) {
            return { style: attributes.style }
          }
        }
      },
      class: {
        default: '',
        parseHTML: (element) => element.getAttribute('class') || '',
        renderHTML: (attributes) => {
          if (attributes.class) {
            return { class: attributes.class }
          }
        }
      }
    }
  },

  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      const dom = document.createElement('div')
      dom.classList.add('custom-div')

      // Apply HTML attributes (like CSS styles and classes)
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        if (value) {
          dom.setAttribute(key, value)
        }
      })

      dom.contentEditable = 'true'

      return {
        dom,
        contentDOM: dom
      }
    }
  }
})

export default CustomDiv
