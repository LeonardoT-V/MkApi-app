import { useEffect, useState } from 'react'
import { useProject } from '../hooks/useProject'
import toast from '../utils/toast'
import { useBackupStore } from '../stores/backupStore'

export function useBackupService() {
  const backups = useBackupStore((state) => state.backup)
  const setBackups = useBackupStore((state) => state.setBackup)
  const { getProjectStore } = useProject()

  const readAllBackupGenerated = async () => {
    const project = getProjectStore()
    const files = await window.backup.readDirectoryForBackup({ project })
    setBackups(files)
  }

  const statsBackupGeneration = () => {
    const lastBackup = backups.length === 0 ? '' : backups[backups.length - 1]
    // TODO: REALIZAR APROXIMACION DEL SIGUIENTE BACKUP
    const nextBackup = lastBackup
    return {
      lastBackup,
      nextBackup
    }
  }

  const generateBackup = async () => {
    const project = getProjectStore()
    const idToast = toast.loadingToast('Generando Backup', `Espere un momento`)
    const res = await window.backup.execGenerateCommand({ project })
    if (res.error) {
      toast.errorToast(idToast, 'Ha ocurrido un error', `${res.error.description}`)
      return
    }
    toast.successToast(idToast, 'Generado Correctamente', `Se ha creado el respaldo ${res.date}`)
    readAllBackupGenerated()
  }

  // TODO: comprobar que se cambie el contenido (es decir crear un nuevo respaldo con mas datos)
  const readBackupFileContent = async ({ backupFile }) => {
    const project = getProjectStore()
    const { originalName } = backupFile
    const hola = await window.backup.readBackupFileContent({
      project,
      originalName
    })
    return hola
  }

  useEffect(() => {
    readAllBackupGenerated()
    console.log('hola')
  }, [])

  return {
    backups,
    readAllBackupGenerated,
    statsBackupGeneration,
    generateBackup,
    readBackupFileContent
  }
}
