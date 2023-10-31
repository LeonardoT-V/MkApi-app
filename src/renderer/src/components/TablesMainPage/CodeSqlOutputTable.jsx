import HighlightingCode from '../shared/HighlightingCode'
import { useFormatTable } from '../../hooks/useTables'
import { Button } from '@nextui-org/react'
import { IconCopy } from '@tabler/icons-react'

function CodeSqlOutputTable() {
  const { query } = useFormatTable()
  return (
    <div className="flex flex-col gap-unit-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-warning-600 font-bold">
          Salida de codigo <span className="text-gray-200">SQL</span>
        </h3>
        <Button startContent={<IconCopy />} size="sm">
          <p>Copiar</p>
        </Button>
      </div>
      <HighlightingCode code={query} />
    </div>
  )
}

export default CodeSqlOutputTable
