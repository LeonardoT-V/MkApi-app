import { JsonViewer } from '../shared'

function JsonPreviewTable() {
  return (
    <div className="w-full flex flex-col px-unit-md gap-unit-sm">
      <h3 className="text-lg text-warning-600 font-bold">Json Preview</h3>
      <div className="flex gap-8 w-full ">
        <JsonViewer result={{ hola: 'hola' }} />
      </div>
    </div>
  )
}

export default JsonPreviewTable
