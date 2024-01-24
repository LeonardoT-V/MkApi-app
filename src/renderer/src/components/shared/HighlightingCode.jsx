import Prism from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-sql'
import { useEffect } from 'react'

function HighlightingCode({ languaje = 'sql', code = '', ...props }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [code])
  return (
    <div {...props}>
      <pre
        style={{
          backgroundColor: 'transparent',
          height: '100%',
          margin: 0,
          padding: 0,
          border: 0
        }}
      >
        <code className={`language-${languaje}`}>{code}</code>
      </pre>
    </div>
  )
}

export default HighlightingCode
