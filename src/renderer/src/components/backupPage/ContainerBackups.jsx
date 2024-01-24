import { Button, Divider } from '@nextui-org/react'
import { IconSql } from '@tabler/icons-react'
import { useBackupService } from '../../services/useBackupService'
import { IconFolder } from '@tabler/icons-react'
import { useProject } from '../../hooks/useProject'
import ModalDetailsBackupContent from './ModalDetailsBackupContent'
import { IconCalendar } from '@tabler/icons-react'
import { IconClock } from '@tabler/icons-react'

export default function ContainerBackups() {
  const { backups } = useBackupService()
  const { project } = useProject()
  const openFileExplorer = () => {
    window.other.openFileExplorer({ path: project.backup.directory })
  }

  return (
    <section className=" space-y-2">
      <header className="flex items-center gap-4">
        <h4 className="text-xl text-warning-600">Respaldos generados</h4>
        <Divider className="flex-1" />
        <Button size="sm" variant="light" color="warning" onClick={openFileExplorer}>
          <p>Abrir Carpeta</p>
          <IconFolder className="h-4 w-4" />
        </Button>
      </header>
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
        {backups.map((backup) => (
          <div
            key={backup.originalName}
            className="bg-content1/40 border border-content2 rounded-small  p-2 flex flex-col lg:flex-row gap-2 items-center"
          >
            <div className="bg-primary-900/30 w-full lg:w-fit flex items-center justify-center p-1 rounded-medium h-full">
              <IconSql className="h-12 w-12 stroke-primary-200" />
            </div>
            <div className="space-y-1 grow w-full flex flex-col">
              <div className="flex text-xs flex-col">
                <p className="flex items-center gap-1">
                  <i>
                    <IconCalendar className="stroke-warning-700 h-4 w-4" />
                  </i>{' '}
                  {backup.date}
                </p>
                <p className="flex items-center gap-1">
                  <i>
                    <IconClock className="stroke-warning-700 h-4 w-4" />
                  </i>{' '}
                  {backup.time}
                </p>
              </div>
              <ModalDetailsBackupContent file={backup} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
