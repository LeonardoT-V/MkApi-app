import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { IconFolder } from '@tabler/icons-react'
import { IconDeviceFloppy } from '@tabler/icons-react'
import { useState } from 'react'
import Drawer from 'react-modern-drawer'
import toast from '../../utils/toast'
import { useProject } from '../../hooks/useProject'
import { useCronManageService } from '../../services/useCronService'

export default function DirectionInstalationBackup({ isOpen, setIsOpen }) {
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const [directory, setDirectory] = useState('')
  const [instalation, setInstalation] = useState('')
  const [container, setContainer] = useState('')
  const { killCron, readCronBackup } = useCronManageService()
  const { editProject } = useProject()
  const selectDirectoryBtn = async () => {
    const direction = await window.other.selectDirectoryPc()
    if (direction) {
      setDirectory(direction)
    }
  }

  const changeConfigurationBackup = async () => {
    if (directory === '' || instalation === '') {
      toast.errorToast(
        'conf-error',
        'Datos incompletos',
        'Asegurese de llenar los campos requeridos'
      )
      return
    }
    const newProject = { backup: { directory, instalation } }
    if (instalation === 'docker') {
      if (container === '') {
        toast.errorToast('conf-error', 'Escriba el nombre del contenedor')
        return
      }
      newProject.backup.containerName = container
    }
    if (readCronBackup()) {
      await killCron()
    }
    editProject({ newData: newProject })
  }
  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="right"
      className="!w-unit-7xl !bg-content1 !p-4 space-y-4"
      lockBackgroundScroll={true}
    >
      <div>
        <h1 className="text-xl font-medium text-warning-700">Configuración</h1>
        <p className="text-gray-400 text-xs">
          Para la creación de los respaldos es necesario especificar los siguientes requerimientos
        </p>
      </div>

      <div className="flex gap-4 flex-col">
        <div className="w-full flex flex-col">
          <Button
            onClick={() => selectDirectoryBtn()}
            variant="flat"
            endContent={<IconFolder className="h-4 w-4" />}
          >
            Seleccionar carpeta
          </Button>
          <p className="text-xs mt-1 mx-4 text-gray-500 ">
            {directory ? directory : 'Seleccione una carperta donde se almacenaran sus copias'}
          </p>
        </div>

        <div className="flex flex-col w-full gap-2">
          <Select
            onChange={(e) => setInstalation(e.target.value)}
            size="sm"
            variant="flat"
            className="w-full"
            label="Seleccionar medio de instalación"
            isRequired
          >
            <SelectItem key="docker" value="docker">
              Docker
            </SelectItem>
            <SelectItem key="local" value="local">
              Instalado Local
            </SelectItem>
          </Select>
          {instalation === 'docker' && (
            <Input
              labelPlacement="outside-left"
              fullWidth
              isRequired
              size="sm"
              label="Nombre del contenedor"
              onChange={(e) => setContainer(e.target.value)}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Button
          onClick={changeConfigurationBackup}
          color="primary"
          fullWidth
          className="mt-4"
          startContent={<IconDeviceFloppy />}
        >
          Guardar Configuración
        </Button>
        <Button color="danger" variant="flat" fullWidth onClick={toggleDrawer}>
          Cerrar
        </Button>
      </div>
    </Drawer>
  )
}
