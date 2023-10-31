import { ObjectView } from 'react-object-view'
const options = { hideDataTypes: true, hideObjectSize: false, hidePreviews: false, expandLevel: 1 }
const palette = {
  base00: 'transparent'
}

function JsonViewer({ result }) {
  return <ObjectView data={result} options={options} palette={palette} />
}

export default JsonViewer
