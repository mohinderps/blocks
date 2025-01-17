import template from '@babel/template'

const root = template.ast(
  `
  const BLOCKS_Root = ({ children }) => {
    return (
      <BLOCKS_Droppable droppableId="root">
        {(provided, snapshot) => {
          const allProps = Object.assign(
            provided.droppableProps,
            {
              ref: provided.innerRef,
              style: {
                minHeight: 'calc(100vh - 43px)'
              },
            }
          )

          return React.createElement(
            'div',
            allProps,
            children,
            provided.placeholder
          )
        }}
      </BLOCKS_Droppable>
    )
  }
`,
  { plugins: ['jsx'] }
)

export default () => {
  return {
    visitor: {
      Program: {
        enter(path) {
          // On initialization it's possible that we operate on
          // an empty program. If that's the case there's no point
          // in adding BLOCKS_Root.
          if (path.node.body.length) {
            path.node.body.push(root)
          }
        }
      }
    }
  }
}
