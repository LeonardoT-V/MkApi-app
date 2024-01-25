import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { IconScript } from '@tabler/icons-react'
import { IconTerminal2 } from '@tabler/icons-react'
import { useEditorService } from '../../services/useEditorService'
import { Sql_Template_Code } from './sql_template'

function ActionEditorSide() {
  const { executeSqlCommand, copyCodeSnippets } = useEditorService()

  return (
    <div className="flex flex-col gap-2 w-64 lg:w-full">
      <Dropdown shouldBlockScroll={false}>
        <DropdownTrigger>
          <Button color="warning" radius="sm" variant="flat" startContent={<IconScript />}>
            Snippets
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Database editor snippets" items={Sql_Template_Code}>
          {(item) => (
            <DropdownItem key={item.label} onPress={() => copyCodeSnippets({ data: item.code })}>
              {item.label}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>

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
