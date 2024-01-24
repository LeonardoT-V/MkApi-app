import { useDataTable } from '../../../hooks/useDataTable'
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem
} from '@nextui-org/react'
import { useTables } from '../../../hooks/useTables'
import { useState } from 'react'
import { IconAlertOctagonFilled } from '@tabler/icons-react'
import toast from '../../../utils/toast'
import { useEditorService } from '../../../services/useEditorService'

export default function DeleteModal({ table = '', fecthData }) {
  const { toggleDeleteModal, deleteModal, data } = useDataTable()
  const { executeSqlCommand } = useEditorService()
  const [selectValue, setSelectValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const { tables } = useTables()
  const tableName = tables[table]
  const deleteQueryAction = async () => {
    const toastId = toast.loadingToast('Borrando registro', 'Espere un momento')
    console.log({ i: inputValue, da: data[selectValue] })
    if (inputValue != data[selectValue]) {
      toast.errorToast(
        toastId,
        'Rellene correctamente los campos necesarios',
        'Asegurese de igualar los datos'
      )
      return
    }

    const query = `DELETE FROM ${table} WHERE ${selectValue}=${inputValue};`
    const { error } = await executeSqlCommand({ command: query, isEditor: false })
    if (error) {
      toast.errorToast(toastId, error.description, error.detail)
      return
    }
    await fecthData(table)
    toggleModal()
    toast.successToast(toastId, 'Operación completado')
  }

  const toggleModal = () => {
    toggleDeleteModal()
    setInputValue('')
    setSelectValue('')
  }

  return (
    <Modal isOpen={deleteModal} onOpenChange={toggleModal} hideCloseButton={true}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-danger-600 font-bold text-3xl">
              Borrar Elemento
            </ModalHeader>
            <ModalBody className="space-y-2">
              <p>
                Va a <span className="text-warning-600 font-medium">borrar</span> una fila en su
                base de datos.
              </p>
              <div className="space-y-1">
                <h2 className="font-medium text-warning-600 text-base">Seleccionar Columna</h2>
                <Select
                  items={tableName}
                  label="Seleccionar llave primaria"
                  description="Escoja la llave primaria a la cual referenciar y borrar por su valor"
                  onChange={(e) => setSelectValue(e.target.value)}
                  size="sm"
                >
                  {(animal) => (
                    <SelectItem key={animal.column_name} value={animal.column_name}>
                      {animal.column_name}
                    </SelectItem>
                  )}
                </Select>
              </div>

              {selectValue !== '' ? (
                <div className="space-y-1">
                  <h2 className="font-medium text-warning-600 text-base">Confirmación</h2>
                  <p className="text-sm">
                    Escriba{' '}
                    <span className="text-danger-600 font-bold px-2 bg-danger-100/50 rounded-small">
                      {' '}
                      {data[selectValue]}
                    </span>{' '}
                    a continuación para borrar la fila
                  </p>
                  <Input
                    placeholder={data[selectValue]}
                    onChange={(e) => setInputValue(e.target.value)}
                    color="danger"
                    className="text-gray-400 placeholder:"
                    classNames={{
                      input: 'placeholder:!text-gray-500'
                    }}
                  />
                </div>
              ) : (
                <div className="space-y-1 bg-danger-100/25 rounded-small p-2 py-4 flex flex-col justify-center items-center">
                  <IconAlertOctagonFilled stroke={1.5} className="text-danger h-5 w-5" />
                  <p className="text-danger-700 text-sm text-center">
                    Los cambios no podran ser revertidos
                  </p>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button fullWidth color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>

              <Button fullWidth color="primary" onPress={deleteQueryAction}>
                Confirmar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
