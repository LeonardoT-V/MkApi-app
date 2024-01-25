import { useParams, useRouteLoaderData } from 'react-router-dom'
import { TitleContainer } from '../components/shared'
import { Accordion, AccordionItem, Divider, Input } from '@nextui-org/react'
import { IconColumns3 } from '@tabler/icons-react'
import AddNewColumns from '../components/DataPage/AddNewColumns'
import { extractDefaultValueTable } from '../utils/queryMethods'
import RemoveColumns from '../components/DataPage/RemoveTables'

function CreateProjectPage() {
  const { nameTable } = useParams()
  const TablesObject = useRouteLoaderData('appRoot')
  const table = TablesObject[nameTable]

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
                      isDisabled
                    />
                    <Input
                      label="Tipo"
                      value={tab.data_type}
                      labelPlacement="outside-left"
                      color="primary"
                      variant="faded"
                      isDisabled
                    />
                    <Input
                      label="Default"
                      value={extractDefaultValueTable(tab.column_default)}
                      labelPlacement="outside-left"
                      color="primary"
                      variant="faded"
                      isDisabled
                    />
                  </div>
                  {/* <div className="grow flex flex-col gap-4">
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
                  </div> */}
                </section>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </section>
      <section className="flex gap-16 shadow-xl justify-end bg-primary-900/20 border w-fit ml-auto p-4 rounded-small border-content2">
        <div className="space-y-2 w-64">
          <AddNewColumns table={nameTable} />
        </div>
        <div className="space-y-2 w-64">
          <RemoveColumns table={nameTable} />
        </div>
      </section>
    </main>
  )
}

export default CreateProjectPage
