import Drawer from 'react-modern-drawer'
import { useDataTable } from '../../../hooks/useDataTable'
import { Button, Divider, Input, ScrollShadow } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useEditorService } from '../../../services/useEditorService'
import toast from '../../../utils/toast'
import { updateQuery } from '../../../utils/queryMethods'

export default function DrawerActions({ table = '', fecthData }) {
  const { modal, toggleModal, data } = useDataTable()
  const { executeSqlCommand } = useEditorService()
  const { register, getValues } = useForm({ values: { ...data } })

  const updateQueryPool = async () => {
    const toastId = toast.loadingToast('Actualizando dato...', 'Espere un momento')
    console.log({ table })
    try {
      const object = getValues()
      console.log(object)
      const setValues = updateQuery(object)
      const query = `UPDATE ${table} ${setValues} WHERE id=${data.id} RETURNING *;`
      const { error } = await executeSqlCommand({ command: query, isEditor: false })
      if (error) {
        toast.errorToast(toastId, `${error.description}`, error.details)
        return
      }
      await fecthData(table)
      toast.successToast(toastId, 'Dato actualizado')
      toggleModal()
    } catch (error) {
      console.log(error)
      toast.errorToast(toastId, 'Ha ocurrido un error')
    }
  }

  return (
    <>
      <Drawer
        open={modal}
        onClose={toggleModal}
        direction="right"
        className="!w-unit-8xl !bg-content1 !p-4 space-y-4 flex-col flex"
        lockBackgroundScroll={true}
      >
        <header className="flex items-center gap-4">
          <div className="flex gap-2 items-center text-2xl text-warning-500 border border-warning-700 px-8 py-1 rounded-small">
            <h2 className="text-warning-400">Data:</h2>
            <span className="text-gray-200 font-semibold">{data.id}</span>
          </div>
          <Divider className="bg-warning-700" />
        </header>

        <ScrollShadow size={10} className="space-y-2 grow">
          {Object.entries(data).map((item) => (
            <div key={item[0]}>
              <Input
                label={item[0]}
                labelPlacement="outside-left"
                fullWidth
                classNames={{
                  mainWrapper: 'w-full'
                }}
                size="sm"
                isRequired
                {...register(item[0])}
              />
            </div>
          ))}
        </ScrollShadow>
        <footer className="space-y-2">
          <Button fullWidth color="danger" variant="flat" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button fullWidth color="primary" onClick={() => updateQueryPool()}>
            Actualizar
          </Button>
        </footer>
      </Drawer>
    </>
  )
}
