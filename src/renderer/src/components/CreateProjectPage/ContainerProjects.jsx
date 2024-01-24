import { IconFolderOff } from '@tabler/icons-react'
import DatabaseInfo from '../shared/DatabaseInfo'
import { useGetAllProject, useProjectService } from '../../services/useProjectService'
import { useEffect } from 'react'
import { Loading } from '../shared/'
import { Button } from '@nextui-org/react'
import { IconReload } from '@tabler/icons-react'
import DialogContainer from '../shared/DialogContainer'

function ContainerProjects() {
  const { projects, loader, reFetch } = useGetAllProject()
  const { openProject } = useProjectService()
  useEffect(() => {
    reFetch()
  }, [])

  if (loader) {
    return <Loading />
  }
  if (projects.length === 0) {
    return (
      <DialogContainer sx="my-8 py-6 px-4 flex-col items-center justify-center">
        <div className="">
          <IconFolderOff size={96} stroke={1.5} />
        </div>
        <div className="flex flex-col gap-2 text-center">
          <h2 className="text-2xl text-gray-300">No hay Projectos Creados</h2>
          <p className="text-xs text-gray-400">
            Registre una nueva entrada en el{' '}
            <span className="text-primary-400">panel izquierdo</span>
          </p>
        </div>
        <Button onClick={() => reFetch()} size="lg" color="primary">
          <IconReload />
          <p>Recargar</p>
        </Button>
      </DialogContainer>
    )
  }

  return (
    <div className="grow grid grid-cols-2 gap-4 px-4 py-1 my-7 overflow-y-scroll w-full items-center">
      {projects.map((project) => (
        <DatabaseInfo
          key={project.file}
          database={project}
          clickContainer={() => openProject({ project })}
        />
      ))}
    </div>
  )
}

export default ContainerProjects
