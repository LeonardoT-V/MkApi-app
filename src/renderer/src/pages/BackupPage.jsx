import { TitleContainer } from '../components/shared'
import { IconDatabaseExport } from '@tabler/icons-react'
import SeleccionCarpeta from '../components/backupPage/SeleccionCarpeta'
import ContainerBackups from '../components/backupPage/ContainerBackups'
import StatsBackup from '../components/backupPage/StatsBackup'

export default function BackupPage() {
  return (
    <>
      <TitleContainer title="Generación Backups" Icon={IconDatabaseExport} />
      <SeleccionCarpeta />

      <StatsBackup />
      <ContainerBackups />
    </>
  )
}
