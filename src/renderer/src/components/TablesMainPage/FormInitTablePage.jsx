import {
  Input,
  Button,
  ModalFooter,
  ModalHeader,
  ModalBody,
  ModalContent,
  Modal
} from '@nextui-org/react'
import { IconPlus, IconEdit } from '@tabler/icons-react'
import { useState } from 'react'
import { useTables } from '../../hooks/useTables'
import { useTableStore } from '../../stores/tableStore'
import TitleContainer from '../shared/TitleContainer'
import { IconTableColumn } from '@tabler/icons-react'

function FormInitTablePage() {
  const { displayTableName } = useTables()
  const [setTableName, tableName] = useTableStore((state) => [state.setTableName, state.tableName])
  const [openDialog, setOpenDialog] = useTableStore((state) => [
    state.openDialog,
    state.setOpenDialog
  ])
  const [value, setValue] = useState(tableName)

  return (
    <>
      <Modal isOpen={openDialog} onOpenChange={setOpenDialog} hideCloseButton={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <TitleContainer
                  title="Dale un nombre a la tabla"
                  sx={{ title: 'text-lg', icon: 'h-6 w-6' }}
                  Icon={IconTableColumn}
                />
              </ModalHeader>
              <ModalBody>
                <Input
                  value={value}
                  placeholder="awesome table"
                  radius="sm"
                  label="Nombre"
                  description="*El nombre puede ser editado despues"
                  onValueChange={setValue}
                  fullWidth={true}
                  labelPlacement="outside"
                  autoFocus
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  radius="sm"
                  startContent={tableName ? <IconEdit /> : <IconPlus />}
                  onPress={() => {
                    if (displayTableName.some((e) => e === value)) {
                      /* toast.errorToast(
                    0,
                    'Existe una tabla con el mismo nombre',
                    'Cambie a un nombre valido'
                  ) */
                      console.log('existe una tabla con el nombre')
                      return
                    }
                    setOpenDialog(false)
                    setTableName(value)
                  }}
                >
                  {tableName ? 'Editar' : 'Añadir'} tabla
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default FormInitTablePage
