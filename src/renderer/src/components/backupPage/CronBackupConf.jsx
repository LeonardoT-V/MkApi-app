import Drawer from 'react-modern-drawer'
import { Button, Checkbox, Divider, Input } from '@nextui-org/react'
import { IconRobot, IconLink, IconClock2 } from '@tabler/icons-react'
import { useState } from 'react'
import { useCronManageService } from '../../services/useCronService'

export default function CronBackupConf() {
  const [cronForm, setCronForm] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [startInit, setStartInit] = useState(false)
  const { configureCron, projectHab, isActive, killCron, stopCron, reanudeCron } =
    useCronManageService()
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  return (
    <>
      <div className="flex-1 flex flex-col gap-2">
        <h5 className="text-warning-600 font-medium text-sm">Cron Job</h5>
        <p className="text-gray-300 w-[90%] text-xs grow">
          Automatiza la generación de respaldos, selecciona el periodo de tiempo
        </p>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="right"
          className="!w-unit-7xl !bg-content1 !p-4 space-y-4"
          lockBackgroundScroll={true}
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-warning-700 font-medium text-xl">Estado de la automatización</h2>
            <p className="text-gray-400 text-xs -mt-3">
              Controle el funcionamiento del servicio de respaldos
            </p>
            {isActive && (
              <Button size="sm" color="danger" variant="flat" onClick={stopCron}>
                Pausar Cron
              </Button>
            )}
            {!isActive && projectHab && (
              <Button size="sm" color="success" variant="flat" onClick={reanudeCron}>
                Reanudar Cron
              </Button>
            )}
            {isActive && (
              <Button size="sm" color="danger" variant="solid" onClick={killCron}>
                Cancelar Cron
              </Button>
            )}
          </div>

          <Divider />
          <div>
            <h2 className="text-warning-600 text-xl font-medium">Seleccionar tiempo</h2>
            <p className="text-gray-400 text-xs">
              Ajuste el tiempo de repetición para la generación de respaldos automaticos
            </p>
          </div>

          <div className="flex flex-col text-sm gap-1 text-blue-400">
            <div>
              <h2 className="text-warning-700">Lista de generadores de Crons Jobs</h2>
              <p className="text-xs text-gray-400">
                Generadores confiables para configurar la automatización de los backups
              </p>
            </div>
            <div className="flex items-center gap-1">
              <IconLink className="h-4 w-4 stroke-primary-300" />
              <a
                className="hover:underline"
                target="_blank"
                href="https://crontab.guru/"
                rel="noreferrer"
              >
                Crontab.guru
              </a>
            </div>
            <div className="flex items-center gap-1">
              <IconLink className="h-4 w-4 stroke-primary-300" />
              <a
                className="hover:underline"
                target="_blank"
                href="https://crontab-generator.org/"
                rel="noreferrer"
              >
                Crontab generator
              </a>
            </div>
          </div>

          <Input
            placeholder="* * * * *"
            label="Escriba el tiempo"
            description="Minutos Horas Dias(mes) Mes Dias(semana)"
            onChange={(e) => setCronForm(e.target.value)}
          />
          <Checkbox
            size="sm"
            defaultSelected
            radius="full"
            isSelected={startInit}
            onValueChange={setStartInit}
          >
            Generar respaldo al iniciar?
          </Checkbox>
          <Button
            color="primary"
            fullWidth
            startContent={<IconRobot className="h-5 w-5" stroke={1.5} />}
            onClick={() =>
              configureCron({ cronConf: cronForm, options: { startInit, isEdit: false } })
            }
          >
            Automatizar
          </Button>
          <Button color="danger" variant="flat" fullWidth onClick={toggleDrawer}>
            Cancelar
          </Button>
        </Drawer>

        <Button
          onClick={toggleDrawer}
          fullWidth
          variant="flat"
          color="primary"
          startContent={<IconClock2 stroke={1.5} />}
        >
          Configurar Automatización
        </Button>
      </div>
    </>
  )
}
