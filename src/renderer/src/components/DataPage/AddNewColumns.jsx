import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'

import { Button, Divider, Switch, Input, Select, SelectItem } from '@nextui-org/react'
import { IconPlus } from '@tabler/icons-react'
import { Types_Postgres_Table } from '../TablesModalPage/types_table'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import { useEditorService } from '../../services/useEditorService'
import toast from '../../utils/toast'
import { useRevalidator } from 'react-router-dom'

export default function AddNewColumns({ table = '' }) {
  const [isOpen, setIsOpen] = useState(false)
  const { executeSqlCommand } = useEditorService()
  const revalidator = useRevalidator()

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
    reset({})
    resetField('name')
    setValue('name', '')
    setValue('type', '')
    setValue('default', '')
    setValue('parametro', '')
    setValue('null', false)
  }

  const { register, getValues, control, reset, resetField, setValue } = useForm()

  const handleAddColumn = async () => {
    const toastID = toast.loadingToast('Creando columna', 'Espere porfavor')
    const value = getValues()
    const query = `ALTER TABLE ${table} ADD COLUMN ${value.name} ${value.type} ${value.default} ${
      !value.null ? 'NOT NULL' : ''
    }`

    const { error } = await executeSqlCommand({ command: query, isEditor: false })
    if (error) {
      toast.errorToast(toastID, 'Ha ocurrido un error', error.details)
      return
    }
    toast.successToast(toastID, 'Columna agregada')
    revalidator.revalidate()
    toggleDrawer()

    return
  }

  return (
    <>
      <header className="flex items-center gap-4">
        <h4 className="text-lg text-gray-300">Agregar columna</h4>
        <Divider className="flex-1" />
      </header>

      <Button
        onClick={toggleDrawer}
        color="primary"
        variant="flat"
        fullWidth
        startContent={<IconPlus stroke={1.5} />}
      >
        Agregar
      </Button>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="right"
        className="!w-unit-7xl !bg-content1 !p-4 space-y-8 !flex-col !flex"
        lockBackgroundScroll={true}
      >
        <header className="flex items-center gap-4">
          <h4 className="text-xl text-warning-600">
            <span className="inline-block items-center align-middle mr-1">
              <IconPlus />
            </span>
            Agregar columna
          </h4>
          <Divider className="flex-1" />
        </header>

        <div className="flex gap-3 flex-col grow">
          <Input
            label="Nombre"
            labelPlacement="outside"
            placeholder="Nombre de la columna"
            {...register('name')}
          />
          <Select
            items={Types_Postgres_Table}
            label="Tipo de dato"
            placeholder="Selecciona un tipo de dato"
            labelPlacement="outside"
            {...register('type')}
          >
            {(type) => (
              <SelectItem startContent={<type.icon />} key={type.name}>
                {type.name}
              </SelectItem>
            )}
          </Select>
          <Input
            label="Default"
            labelPlacement="outside"
            placeholder="Valor por defecto"
            description="Este campo puede dejarse vacio"
            {...register('default')}
          />
          <Input
            label="Parametro"
            labelPlacement="outside"
            placeholder="parametro"
            description="Este campo puede dejarse vacio"
            {...register('parametro')}
          />
          <Controller
            control={control}
            name="null"
            defaultValue={true}
            render={({ field: { onChange, value } }) => (
              <Switch size="sm" onChange={onChange} isSelected={value}>
                Acepta null?
              </Switch>
            )}
          />
        </div>

        <footer className="space-y-2">
          <Button fullWidth color="danger" variant="flat" onClick={toggleDrawer}>
            Cancelar
          </Button>
          <Button fullWidth color="primary" variant="solid" onClick={handleAddColumn}>
            Agregar
          </Button>
        </footer>
      </Drawer>
    </>
  )
}
