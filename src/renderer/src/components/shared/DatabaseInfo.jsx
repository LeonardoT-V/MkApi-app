import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { IconDatabase, IconServer2, IconUser, IconDotsVertical } from '@tabler/icons-react'
import { useGetAllProject, useProjectService } from '../../services/useProjectService'

function DatabaseInfo({ database, isHeader = false, clickContainer, clickOpt }) {
  const { closeProject } = useProjectService()
  const { deleteOneProject } = useGetAllProject()

  return (
    <article
      onClick={clickContainer}
      className={`${
        isHeader
          ? 'bg-content2/40 px-4'
          : 'bg-content1 hover:bg-content2 px-8 hover:scale-105 cursor-pointer'
      } relative border border-transparent py-4 flex flex-col gap-2 rounded-small transition-all h-fit`}
    >
      <div
        className={`${isHeader ? 'flex-row  gap-2' : 'flex-col'} flex justify-center items-center`}
      >
        <IconDatabase className="h-9 w-9" />
        <h3 className="text-lg text-center text-primary-400 font-medium">{database?.file}</h3>
      </div>
      <section className="flex flex-col gap-1">
        <div className="flex text-xs">
          <div className="mr-1">
            <IconServer2 className="h-4 w-4" />
          </div>
          <p className="truncate text-gray-400">{database.db?.host}</p>
          <p className="text-warning-700">:{database.db?.port}</p>
        </div>
        <div className="flex text-xs gap-2">
          <div className="flex basis-0 w-1/2 grow">
            <div className="mr-1">
              <IconUser className="h-4 w-4" />
            </div>
            <p className="truncate text-gray-400">{database.db?.user}</p>
          </div>
          <div className="flex basis-0 w-1/2 grow">
            <div className="mr-1">
              <IconDatabase className="h-4 w-4" />
            </div>
            <p className="truncate text-gray-400">{database.db?.database}</p>
          </div>
        </div>
      </section>

      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            className="absolute top-2 right-2"
            variant="light"
            size="sm"
            onClick={clickOpt}
          >
            <IconDotsVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions">
          {isHeader && <DropdownItem onClick={() => closeProject()}>Cerrar proyecto</DropdownItem>}
          {!isHeader && (
            <DropdownItem onClick={() => deleteOneProject({ project: database })}>
              Borrar
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </article>
  )
}

export default DatabaseInfo
