import { Button } from '@nextui-org/react'
import { IconScript } from '@tabler/icons-react'
import { IconTerminal2 } from '@tabler/icons-react'
import { useEditorService } from '../../services/useEditorService'

function ActionEditorSide() {
  const { executeSqlCommand } = useEditorService()

  return (
    <div className="flex flex-col gap-2 w-64 lg:w-full">
      <Button color="warning" radius="sm" variant="flat" startContent={<IconScript />}>
        Snippets
      </Button>
      <Button
        color="primary"
        radius="sm"
        startContent={<IconTerminal2 />}
        onClick={executeSqlCommand}
      >
        Ejecutar
      </Button>
    </div>
  )
}

export default ActionEditorSide
