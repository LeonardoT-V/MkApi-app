import { IconClockPlay } from '@tabler/icons-react'
import ContainerTablesCreated from '../components/TablesMainPage/ContainerTablesCreated'
import { ApiSwitch, TitleContainer } from '../components/shared'
import { useBackupService } from '../services/useBackupService'
import { APP_LOGO_PATH } from '../env'

function HomePage() {
  const { statsBackupGeneration } = useBackupService()
  const { lastBackup } = statsBackupGeneration()
  return (
    <div className="grid grid-cols-3 justify-center items-center align-middle gap-4 w-full ">
      <div className="col-span-2 w-full space-y-2 flex gap-8 items-center px-4">
        <img src={APP_LOGO_PATH} alt="logo app" className="h-24 w-24" />
        <div className="space-y-2">
          <h1 className="font-logo text-5xl text-warning-600">MkApi</h1>
          <div className="text-xs space-y-1">
            <p className="text-gray-400">Desarrollado Por:</p>
            <div>
              <p className="text-gray-300">Carranza Delgado Anthony Alexander</p>
              <p className="text-gray-300">Toro Vega Ider Leonardo</p>
            </div>
          </div>
        </div>
      </div>

      <section className="col-span-1 row-span-2 space-y-3 py-4 px-2 h-96 border rounded-small border-content2 bg-primary-900/25 overflow-auto">
        <TitleContainer
          title="Tus tablas"
          sx={{ title: 'text-lg', root: 'sticky top-0 z-40 shadow-xl' }}
        />
        <ContainerTablesCreated sx="space-y-1 px-2  flex flex-col" />
      </section>
      <div className="col-span-1 flex items-center h-full px-4 py-4 lg:py-0 border rounded-small border-content2 bg-primary-900/25">
        <ApiSwitch sx="space-y-4" />
      </div>
      <div className="col-span-1 flex-col justify-center gap-2 flex items-center h-full px-4 py-4 lg:py-0 border rounded-small border-content2 bg-primary-900/25">
        <h2 className="text-xl text-warning-700">Último respaldo</h2>
        <div className="flex gap-4 items-center">
          <IconClockPlay stroke={1.5} className="h-8 w-8 stroke-primary-200" />
          <div>
            <p>{lastBackup.date}</p>
            <p>{lastBackup.time}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
