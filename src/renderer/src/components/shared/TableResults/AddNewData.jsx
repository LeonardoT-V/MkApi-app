import Drawer from 'react-modern-drawer'

import { useState } from 'react'
import { Button, Input, ScrollShadow } from '@nextui-org/react'
import { useTables } from '../../../hooks/useTables'
import { useForm } from 'react-hook-form'
import { extractDefaultValueTable, insertQuery } from '../../../utils/queryMethods'
import { useEditorService } from '../../../services/useEditorService'
import toast from '../../../utils/toast'

export default function AddNewData({ table = '', fecthData }) {
  const [openModal, setOpenModal] = useState(false)
  const toggleModal = () => {
    setOpenModal((prev) => !prev)
  }
  const { register, getValues } = useForm({ values: {} })
  const { tables } = useTables()
  const { executeSqlCommand } = useEditorService()
  const tableName = tables[table]

  const createNewData = async () => {
    const toastId = toast.loadingToast('Registrando', 'Añadiendo nuevo elemento')
    const formValues = getValues('add')
    let sendValues = {}
    tableName.map((tab) => {
      sendValues[tab.column_name] = formValues[tab.column_name]
    })

    const { insertIntoParam, insertIntoValue } = insertQuery(sendValues)
    const query = `INSERT INTO ${table}(${insertIntoParam}) VALUES (${insertIntoValue}) RETURNING *;`
    const { error } = await executeSqlCommand({ command: query, isEditor: false })

    if (error) {
      toast.errorToast(toastId, error.description, error.detail)
      return
    }
    toast.successToast(toastId, 'Dato agregado correctamente')
    await fecthData(table)
    toggleModal()
    return
  }

  return (
    <>
      <footer className="flex justify-end">
        <Button className="w-1/2" color="primary" variant="flat" onClick={toggleModal}>
          Agregar nuevo elemento
        </Button>
      </footer>
      <Drawer
        open={openModal}
        onClose={toggleModal}
        direction="right"
        className="!w-unit-8xl !bg-content1 !p-4 space-y-4 flex-col flex"
        lockBackgroundScroll={true}
      >
        <header className="flex items-center gap-4">
          <h2 className="text-warning-700 text-2xl">Agregar un nuevo dato</h2>
        </header>

        <ScrollShadow size={10} className="space-y-2 grow">
          {tableName.map((item) => (
            <div key={item.column_name}>
              <Input
                label={item.column_name}
                labelPlacement="outside-left"
                fullWidth
                classNames={{
                  mainWrapper: 'w-full'
                }}
                size="sm"
                isRequired={item.column_default === null}
                placeholder={extractDefaultValueTable(item.column_default)}
                {...register(`add.${item.column_name}`)}
              />
            </div>
          ))}
        </ScrollShadow>
        <footer className="space-y-2">
          <Button fullWidth color="danger" variant="flat" onClick={toggleModal}>
            Cancelar
          </Button>
          <Button fullWidth color="primary" onClick={createNewData}>
            Agregar
          </Button>
        </footer>
      </Drawer>
    </>
  )
}
