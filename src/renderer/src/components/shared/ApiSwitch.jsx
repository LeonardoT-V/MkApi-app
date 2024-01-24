import { Input, Switch } from '@nextui-org/react'
import { useApiState } from '../../hooks/useApi'
import { useEffect } from 'react'

function ApiSwitch({ sx }) {
  const { state, toogleServer, swValue, setPort, port, active, setActive } = useApiState()

  useEffect(() => {
    if (port.length !== 0) {
      setActive(false)
    }
  }, [port])

  return (
    <section className={`space-y-1 ${sx}`}>
      <div className="flex gap-2 items-center">
        <h2 className="text-lg font-medium text-warning-700">Servicio de la API</h2>
      </div>
      <div className="flex gap-4 md:gap-3 flex-col lg:flex-row">
        <Input
          label="Puerto del servidor"
          size="sm"
          radius="sm"
          type="number"
          defaultValue={port}
          onChange={(e) => setPort(e.target.value)}
          labelPlacement="outside"
          disabled={state}
          startContent={<span className="text-xs text-gray-400">localhost:</span>}
          description={active === true && <>Define un puerto</>}
          classNames={{
            input: 'text-xs mb-0.5'
          }}
        />

        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-gray-400">Desactivar/Activar</p>
          <Switch
            onChange={() => toogleServer({ port })}
            isDisabled={active}
            isSelected={swValue}
            defaultSelected={swValue}
          />
        </div>
      </div>
    </section>
  )
}

export default ApiSwitch
