import ContainerTablesCreated from '../components/TablesMainPage/ContainerTablesCreated'
import { IconTable } from '@tabler/icons-react'
import TitleContainer from '../components/shared/TitleContainer'
import ActionTableManage from '../components/TablesMainPage/ActionTableManage'
import FormInitTablePage from '../components/TablesMainPage/FormInitTablePage'
import TableItemCreated from '../components/TablesMainPage/TableItemCreated'
import CodeSqlOutputTable from '../components/TablesMainPage/CodeSqlOutputTable'
import TabApiJsonView from '../components/TablesMainPage/TabApiJsonView'
import { useTableStore } from '../stores/tableStore'
import { Button } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import ModalTypePg from '../components/TablesModalPage/ModalTypePg'

function TablesCreatedPage() {
  const tableName = useTableStore((state) => state.tableName)
  const setOpenDialog = useTableStore((state) => state.setOpenDialog)
  return (
    <div className="space-y-8">
      <FormInitTablePage /> {/* Ventana modal para dar o editar el nombre de la tabla */}
      <ModalTypePg />
      <section className="flex flex-col gap-4">
        {tableName ? (
          <ActionTableManage />
        ) : (
          <>
            <ContainerTablesCreated
              sx="grid grid-cols-2 lg:grid-cols-3 gap-4 justify-center align-middle items-center px-8"
              titleZone={<TitleContainer title="Tus Tablas" Icon={IconTable} />}
            >
              <Button
                onPress={setOpenDialog}
                size="lg"
                startContent={<IconPlus />}
                color="primary"
                radius="sm"
                className="w-96 flex mx-auto"
              >
                Añadir nueva tabla
              </Button>
            </ContainerTablesCreated>
          </>
        )}
      </section>
      {tableName && (
        <div className="gap-4 w-full space-y-4">
          <section className="grid grid-cols-5 gap-4">
            <TableItemCreated sx="col-span-5" />
            <div className="lg:col-span-2 col-span-5">
              <TabApiJsonView />
            </div>
            <div className="col-span-5 lg:col-span-3 bg-content1 p-4 rounded-small">
              <CodeSqlOutputTable />
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default TablesCreatedPage
