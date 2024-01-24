import { IconHourglass } from '@tabler/icons-react'
import { IconClock } from '@tabler/icons-react'
import { useBackupService } from '../../services/useBackupService'
import { useEffect, useState } from 'react'
import GenerationBackupConf from './GenerationBackupConf'
import { useCronManageService } from '../../services/useCronService'

export default function StatsBackup() {
  const [stats, setstats] = useState({})
  const { statsBackupGeneration, backups } = useBackupService()
  const { cronInfo, isActive } = useCronManageService()

  useEffect(() => {
    setstats(statsBackupGeneration())
  }, [backups])

  return (
    <section className="grid grid-cols-3 grid-rows-2 gap-4">
      <div className="rounded-small p-4 border border-content2 flex flex-col lg:flex-row gap-2 items-center shadow-inner shadow-content2/40 bg-primary-900/10">
        <div>
          <IconClock className="h-8 w-8 stroke-primary-200" stroke={1.5} />
        </div>
        <div className="flex flex-col gap-2 lg:gap-0">
          <p className="text-xs text-warning-600 font-medium text-center lg:text-left">
            Ultimo Respaldo
          </p>
          <p className="text-gray-200 flex h-full text-center flex-col lg:gap-2 lg:flex-row">
            <span>{stats.lastBackup?.date}</span>
            <span className="text-gray-600 hidden lg:inline">|</span>
            <span className="text-xs lg:text-base">{stats.lastBackup?.time}</span>
          </p>
        </div>
      </div>
      <div className="bg-primary-900/10 flex flex-col lg:flex-row gap-4 rounded-small p-4 border border-content2 row-span-2 col-span-2 shadow-inner shadow-content2/40">
        <GenerationBackupConf />
      </div>
      <div className="bg-primary-900/10 rounded-small p-4 border border-content2 flex flex-col lg:flex-row gap-2 items-center shadow-inner shadow-content2/40">
        <div>
          <IconHourglass className="h-8 w-8 stroke-primary-200" stroke={1.5} />
        </div>
        <div className="flex flex-col gap-2 lg:gap-0">
          <p className="text-xs text-warning-600 font-medium text-center lg:text-left">
            Proximo respaldo
          </p>
          <p className="text-gray-200 flex h-full text-center flex-col lg:gap-2 lg:flex-row">
            {isActive === true ? (
              <>
                <span>{cronInfo?.next?.date}</span>
                <span className="text-gray-600 hidden lg:inline">|</span>
                <span className="text-xs lg:text-base">{cronInfo?.next?.time}</span>
              </>
            ) : (
              <p className="text-gray-400">Esperando Información</p>
            )}
          </p>
        </div>
      </div>
    </section>
  )
}
