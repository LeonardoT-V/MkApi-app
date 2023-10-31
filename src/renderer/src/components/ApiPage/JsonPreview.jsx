import JsonViewer from '../shared/JsonViewer'

function JsonPreview({ result }) {
  return (
    <div>
      <JsonViewer result={result} />
    </div>
  )
}

export default JsonPreview
