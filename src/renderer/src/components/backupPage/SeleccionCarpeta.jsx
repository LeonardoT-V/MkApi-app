import { Button } from '@nextui-org/react'
import { IconFolder } from '@tabler/icons-react'
import { useState } from 'react'
import { useProject } from '../../hooks/useProject'
import { IconDeviceDesktop } from '@tabler/icons-react'
import { IconTool } from '@tabler/icons-react'
import DirectionInstalationBackup from './DirectionInstalationBackup'

export default function SeleccionCarpeta() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const { project } = useProject()

  return (
    <>
      <DirectionInstalationBackup isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex justify-end gap-8 mr-8">
        <div>
          <p className="text-base flex gap-2 items-center text-gray-200">
            <span>
              <IconFolder className="h-5 w-5 text-primary-200" stroke={1.5} />
            </span>{' '}
            {project.backup?.directory}
          </p>
          <p className="text-base flex gap-2 items-center text-gray-200">
            <span>
              <IconDeviceDesktop className="h-5 w-5 text-primary-200" stroke={1.5} />
            </span>{' '}
            {project.backup?.instalation}
          </p>
        </div>
        <Button isIconOnly variant="light" size="lg" onClick={toggleDrawer}>
          <IconTool />
        </Button>
      </div>
    </>
  )
}
