import { useEffect, useState } from 'react'
import { useProject } from '../hooks/useProject'
import toast from '../utils/toast'
import { Cron, scheduledJobs } from 'croner'
import { formatDateTime } from '../utils/formatTimeBackup'
import { useCronStore } from '../stores/cronStore'
import { useBackupService } from './useBackupService'

export function useCronManageService() {
  const CRON_NAME = 'cron:backup'
  const cronInfo = useCronStore((state) => state.cronInfo)
  const setCronInfo = useCronStore((state) => state.setCronInfo)
  const isActive = useCronStore((state) => state.isActive)
  const setIsActive = useCronStore((state) => state.setIsActive)
  const projectHab = useCronStore((state) => state.projectHab)
  const setProjectHab = useCronStore((state) => state.setProjectHab)
  const { generateBackup } = useBackupService()
  const [firtInit, setFirtInit] = useState(true)
  const { getProjectStore, editProject } = useProject()

  const startCron = ({ isEdit = false }) => {
    const { cron: cronTime } = getProjectStore()
    if (!cronTime) {
      setProjectHab(false)
      return
    }
    console.log('1')
    if (isEdit) {
      const job = scheduledJobs.find((j) => j.name === CRON_NAME)
      job.stop()
      console.log('paso edit')
    }

    if (!readCronBackup()) {
      const job = Cron(cronTime, { name: CRON_NAME }, () => {
        const nextTime = formatDateTime(job.nextRun())
        const prevTime = formatDateTime(job.previousRun())
        const hola = { next: nextTime, prev: prevTime, isRunning: job.isRunning() }
        setCronInfo(hola)
        generateBackup().then(() => {
          toast.successToast('', 'hola')
        })
      })
      setIsActive(true)
      setProjectHab(true)
    }
    return
  }

  const configureCron = async ({ cronConf, options = {} }) => {
    const { cron: cronTime } = getProjectStore()
    await editProject({ newData: { cron: cronConf } })

    if (options.startInit === true) {
      if (cronTime) {
        startCron({ isEdit: true })
      }
      startCron({ isEdit: false })
    }

    toast.successToast('', 'Cron Job configurado', 'Los respaldos automaticos se han configurado')
    return
  }

  const readCronBackup = () => {
    const job = scheduledJobs.find((j) => j.name === CRON_NAME)
    return job
  }

  const stopCron = () => {
    const job = readCronBackup()
    job.pause()
    setIsActive(false)
    toast.successToast('', 'Se ha detenido la automatización de respaldos')
    return
  }

  const killCron = async () => {
    const job = readCronBackup()
    job.stop()
    await editProject({ newData: { cron: '' } })
    setIsActive(false)
    setProjectHab(false)
    setCronInfo({})
    return
  }

  const reanudeCron = () => {
    const job = readCronBackup()
    job.resume()
    setIsActive(true)
    toast.successToast('', 'Respaldos automaticos reanudados')
    return
  }

  useEffect(() => {
    if (firtInit) {
      startCron({})
      setFirtInit(false)
    }
  }, [])

  return {
    stopCron,
    reanudeCron,
    readCronBackup,
    configureCron,
    isActive,
    cronInfo,
    projectHab,
    killCron,
    papa: () => console.log(cronInfo)
  }
}
