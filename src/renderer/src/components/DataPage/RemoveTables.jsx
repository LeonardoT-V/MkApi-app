import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@nextui-org/react'
import { IconExclamationCircle } from '@tabler/icons-react'
import { IconTrash } from '@tabler/icons-react'
import { useNavigate, useRevalidator } from 'react-router-dom'
import { useEditorService } from '../../services/useEditorService'
import toast from '../../utils/toast'

export default function RemoveTable({ table = '' }) {
  const { isOpen, onOpenChange, onOpen } = useDisclosure()

  const revalidator = useRevalidator()
  const navigate = useNavigate()
  const { executeSqlCommand } = useEditorService()

  const removeTable = async () => {
    const toastId = toast.loadingToast('Espere un momento')
    const query = `DROP TABLE ${table}`
    const { err } = await executeSqlCommand({ command: query, isEditor: false })
    if (err) {
      toast.errorToast(toastId, err.detail, err.description)
      return
    }
    revalidator.revalidate()
    navigate('/app/tables')
    toast.successToast(toastId, 'Se ha borrado un tabla', `La ${table} se ha eliminado`)
    return
  }

  return (
    <>
      <header className="flex items-center gap-4">
        <h4 className="text-lg text-gray-300">Borrar Tabla</h4>
        <Divider className="flex-1" />
      </header>
      <Button
        color="danger"
        variant="flat"
        onPress={onOpen}
        fullWidth
        startContent={<IconTrash stroke={1.5} />}
      >
        Eliminar
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-danger">
                Esta seguro de borrar esta tabla
              </ModalHeader>

              <ModalBody>
                <div className="p-4 flex flex-col justify-center items-center gap-2 bg-danger-200/25">
                  <IconExclamationCircle className="h-10 w-10 stroke-danger-600" />
                  <p className="text-gray-300 text-center text-sm">
                    Borrar esta tabla puede provocar cambios irreversibles en su base de datos
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="solid" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" variant="flat" onPress={removeTable}>
                  Confirmar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
