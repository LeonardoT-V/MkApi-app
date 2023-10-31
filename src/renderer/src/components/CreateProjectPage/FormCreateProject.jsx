import { Button, Input } from '@nextui-org/react'
import {
  IconFolder,
  Icon123,
  IconPlus,
  IconServer2,
  IconDatabase,
  IconLock,
  IconUser
} from '@tabler/icons-react'
import { useForm } from 'react-hook-form'
import { useProjectService } from '../../services/useProjectService'
function FormCreateProject() {
  const { register, handleSubmit } = useForm()
  const { createNewProject, loader } = useProjectService()

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit((data) => createNewProject({ initValues: data }))}
    >
      <Input
        label="Nombre del proyecto"
        placeholder="awesome"
        labelPlacement="outside"
        isRequired
        startContent={<IconFolder stroke={1.5} />}
        {...register('file')}
      />
      <div className="flex gap-4 items-center flex-col md:flex-row lg:flex-col">
        <Input
          label="Usuario"
          placeholder="postgres"
          labelPlacement="outside"
          isRequired
          startContent={<IconUser stroke={1.5} />}
          {...register('user')}
        />
        <Input
          label="Contraseña"
          placeholder="postgres"
          labelPlacement="outside"
          isRequired
          startContent={<IconLock stroke={1.5} />}
          {...register('password')}
        />
      </div>
      <div className="flex gap-4">
        <Input
          label="Host"
          placeholder="localhost"
          labelPlacement="outside"
          isRequired
          startContent={<IconServer2 stroke={1.5} />}
          {...register('host')}
        />

        <Input
          label="Puerto"
          placeholder="5432"
          labelPlacement="outside"
          isRequired
          startContent={<Icon123 stroke={1.5} />}
          {...register('port')}
        />
      </div>
      <Input
        label="Database"
        placeholder="test"
        labelPlacement="outside"
        isRequired
        startContent={<IconDatabase stroke={1.5} />}
        {...register('database')}
      />
      <Button
        fullWidth
        color="primary"
        startContent={<IconPlus stroke={1.5} />}
        type="submit"
        isLoading={loader}
      >
        Crear proyecto
      </Button>
    </form>
  )
}

export default FormCreateProject
