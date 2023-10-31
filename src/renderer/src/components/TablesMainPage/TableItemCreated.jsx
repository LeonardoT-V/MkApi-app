import { Button } from '@nextui-org/react'
import { useTableStore } from '../../stores/tableStore'
import { TableBasic } from '../shared'
import { IconBinaryTree2, IconColumnInsertRight } from '@tabler/icons-react'

function TableItemCreated({ sx }) {
  const field = useTableStore((state) => state.field)
  const rows = useTableStore((state) => state.rows)
  const setOpenTypeModal = useTableStore((state) => state.setOpenTypeModal)
  return (
    <section className={`${sx} bg-content1/50 rounded-small`}>
      <TableBasic
        cols={field}
        rows={rows}
        paginationRender={
          <div className="flex justify-end gap-4 px-8 pb-4">
            <Button variant="faded" color="primary" startContent={<IconBinaryTree2 />}>
              Agregar relaciones
            </Button>
            <Button
              startContent={<IconColumnInsertRight />}
              color="primary"
              onPress={setOpenTypeModal}
            >
              Agregar columna
            </Button>
          </div>
        }
      />
    </section>
  )
}

export default TableItemCreated
