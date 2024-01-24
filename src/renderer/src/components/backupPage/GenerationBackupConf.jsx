import { Button, Divider } from '@nextui-org/react'
import { IconDatabaseExport } from '@tabler/icons-react'
import { useBackupService } from '../../services/useBackupService'
import CronBackupConf from './CronBackupConf'

export default function GenerationBackupConf() {
  const { generateBackup } = useBackupService()
  return (
    <>
      <CronBackupConf />
      <div className="hidden lg:inline">
        <Divider orientation="vertical" />
      </div>
      <div className="inline lg:hidden">
        <Divider />
      </div>
      <div className="flex-1 flex flex-col gap-2">
        <h5 className="text-warning-600 font-medium text-sm">Generación manual</h5>
        <p className="text-gray-300 w-[90%] text-xs grow">
          Añade manualmente un nuevo respaldo de tu base de datos en tu pc
        </p>
        <Button
          onClick={generateBackup}
          fullWidth
          color="primary"
          startContent={<IconDatabaseExport stroke={1.5} />}
        >
          Generar respaldo
        </Button>
      </div>
    </>
  )
}
