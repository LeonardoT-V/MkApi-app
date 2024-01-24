import { useParams, useRouteLoaderData } from 'react-router-dom'
import { TitleContainer } from '../components/shared'
import { Accordion, AccordionItem, Button, Divider, Input, Switch } from '@nextui-org/react'
import HighlightingCode from '../components/shared/HighlightingCode'
import { IconColumns3 } from '@tabler/icons-react'
import { IconPencil } from '@tabler/icons-react'

function CreateProjectPage() {
  const { nameTable } = useParams()
  const TablesObject = useRouteLoaderData('appRoot')
  const table = TablesObject[nameTable]
  const query = `Alter table ${nameTable}`
  return (
    <main className="space-y-8">
      <TitleContainer title={nameTable} />

      <section className="space-y-2">
        <header className="flex items-center gap-4">
          <h4 className="text-xl text-warning-600">Tus columnas</h4>
          <Divider className="flex-1" />
        </header>
        <section>
          <Accordion variant="splitted" isCompact>
            {table.map((tab) => (
              <AccordionItem
                key={tab.column_name}
                aria-label={tab.column_name}
                title={tab.column_name}
                startContent={<IconColumns3 />}
                classNames={{ title: 'text-primary-200' }}
              >
                <section className="flex gap-4">
                  <div className="flex flex-col gap-4">
                    <Input
                      label="Nombre"
                      value={tab.column_name}
                      labelPlacement="outside-left"
                      color="primary"
                      variant="faded"
                    />
                    <Input
                      label="Tipo"
                      value={tab.data_type}
                      labelPlacement="outside-left"
                      color="primary"
                      variant="faded"
                    />
                    <Input
                      label="Default"
                      value={tab.column_default}
                      labelPlacement="outside-left"
                      color="primary"
                      variant="faded"
                    />
                  </div>
                  <div className="grow flex flex-col gap-4">
                    <div className="bg-content2 p-4 rounded-small">
                      <HighlightingCode code={query} />
                    </div>
                    <Button
                      color="success"
                      className="w-64 m-auto"
                      startContent={<IconPencil stroke={1} className="h-5 w-5" />}
                    >
                      Modificar
                    </Button>
                  </div>
                </section>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </section>
      <section className="space-y-2">
        <header className="flex items-center gap-4">
          <h4 className="text-xl text-warning-600">Agregar nueva columna</h4>
          <Divider className="flex-1" />
        </header>
        <div className="flex gap-2">
          <Input label="nombre" labelPlacement="outside" placeholder="nombre" />
          <Input label="tipo" labelPlacement="outside" placeholder="tipo" />
          <Input label="default" labelPlacement="outside" placeholder="default" />
          <Input label="parametro" labelPlacement="outside" placeholder="parametro" />
          <Switch size="sm">sera null?</Switch>
        </div>
        <div className="flex flex-col gap-unit-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg text-warning-600 font-bold">
              Salida de codigo <span className="text-gray-200">SQL</span>
            </h3>
          </div>
          <HighlightingCode code={query} />
        </div>
      </section>
    </main>
  )
}

export default CreateProjectPage
