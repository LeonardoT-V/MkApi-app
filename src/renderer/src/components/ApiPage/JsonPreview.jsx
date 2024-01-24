import { IconJson } from '@tabler/icons-react'
import JsonViewer from '../shared/JsonViewer'
import { IconBraces } from '@tabler/icons-react'

function JsonPreview({ result = {} }) {
  if (Object.keys(result).length === 0) {
    return (
      <div className="flex justify-center items-center flex-col h-full">
        <IconBraces className="h-24 w-24 stroke-primary-100" stroke={1} />
        <h4 className="text-2xl font-medium text-center">No hay datos cargados</h4>
        <p className="text-sm text-gray-500 text-center">Ingrese datos nuevos</p>
      </div>
    )
  }
  return (
    <div className="overflow-y-scroll h-full">
      <JsonViewer result={result} />
    </div>
  )
}

export default JsonPreview
