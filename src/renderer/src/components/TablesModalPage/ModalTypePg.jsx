import {
  Input,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from '@nextui-org/react'
import { TitleContainer } from '../shared'
import { IconColumnInsertLeft } from '@tabler/icons-react'
import { IconX } from '@tabler/icons-react'
import { IconPlus } from '@tabler/icons-react'
import { useTableStore } from '../../stores/tableStore'
import ModalSelectionType from './ModalSelectionType'
import { useForm } from 'react-hook-form'
import { useManageColumnsTable } from '../../hooks/useTables'
import ModalTableError from './ModalTableError'

function ModalTypePg() {
  const [openTypeModal, setOpenTypeModal] = useTableStore((state) => [
    state.openTypeModal,
    state.setOpenTypeModal
  ])
  const { register, handleSubmit, watch, control, setValue, reset } = useForm({
    defaultValues: {
      tipo: '',
      columna: '',
      parametro: '',
      null: false,
      default: ''
    }
  })
  const tipoData = watch('tipo')
  const { addNewColumn } = useManageColumnsTable()
  return (
    <Modal
      isOpen={openTypeModal}
      size="2xl"
      onOpenChange={setOpenTypeModal}
      scrollBehavior="inside"
      classNames={{
        closeButton: 'hidden',
        body: 'px-unit-2xl py-3',
        base: 'bg-content1/50 backdrop-blur-3xl'
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-unit-xs">
              <TitleContainer title="Creación de columnas" Icon={IconColumnInsertLeft} />
              <Input
                name="columna"
                label="Ingrese el nombre de la columna"
                placeholder="AwesomeCol"
                color="primary"
                variant="bordered"
                radius="sm"
                size="sm"
                {...register('columna')}
              />
            </ModalHeader>
            <ModalBody>
              <ModalSelectionType
                register={register}
                tipoData={tipoData}
                control={control}
                setValue={setValue}
              />
            </ModalBody>
            <ModalFooter className="flex items-center gap-4">
              <ModalTableError />
              <div className="space-y-2">
                <form
                  onSubmit={handleSubmit((data) =>
                    addNewColumn({ values: data, resetForm: reset })
                  )}
                >
                  <Button
                    startContent={<IconPlus />}
                    radius="sm"
                    className="w-48"
                    color="primary"
                    type="submit"
                    //onPress={onClose}
                  >
                    Añadir
                  </Button>
                </form>
                <Button
                  radius="sm"
                  className="w-48"
                  color="danger"
                  variant="light"
                  onClick={onClose}
                  startContent={<IconX />}
                >
                  Cerrar
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default ModalTypePg
