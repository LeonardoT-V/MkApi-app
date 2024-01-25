import { Button } from '@nextui-org/react'
import { IconPencil } from '@tabler/icons-react'
import { IconEraser } from '@tabler/icons-react'
import { IconPlus } from '@tabler/icons-react'
import TitleContainer from '../shared/TitleContainer'
import { useTableStore } from '../../stores/tableStore'
import { IconTableColumn } from '@tabler/icons-react'
import { useTableService } from '../../services/useTableService'
import { useNavigate } from 'react-router-dom'

function ActionTableManage() {
  const setOpenDialog = useTableStore((state) => state.setOpenDialog)
  const tableName = useTableStore((state) => state.tableName)
  const resetTable = useTableStore((state) => state.resetTable)
  const { createNewTable } = useTableService()
  const navigate = useNavigate()

  return (
    <>
      {tableName && (
        <TitleContainer
          title={
            <div className="text-xs">
              <p className="text-gray-300 inline-flex items-center gap-1">
                {' '}
                <span>
                  <IconTableColumn className="h-4 w-4" stroke={1.5} />{' '}
                </span>{' '}
                Creando la Tabla
              </p>
              <h2 className="text-2xl">{tableName}</h2>
            </div>
          }
        >
          <div className="flex gap-1 lg:gap-4 items-center">
            <Button
              color="danger"
              variant="light"
              size="sm"
              onPress={resetTable}
              startContent={<IconEraser stroke={1.5} />}
            >
              Borrar Tabla
            </Button>
            <Button
              color="warning"
              variant="light"
              size="sm"
              startContent={<IconPencil stroke={1.5} />}
              onPress={() => setOpenDialog(true)}
            >
              Editar Nombre
            </Button>
            <Button
              color="success"
              variant="solid"
              size="md"
              startContent={<IconPlus stroke={1.5} />}
              onClick={() =>
                createNewTable(() => {
                  navigate(`/app/tables/${tableName}`)
                })
              }
            >
              Crear Tabla
            </Button>
          </div>
        </TitleContainer>
      )}
    </>
  )
}

export default ActionTableManage
