import { Input, Switch } from '@nextui-org/react'

function ApiSwitch({ sx }) {
  return (
    <section className={`space-y-2 ${sx}`}>
      <div className="flex gap-2 items-center">
        <h2 className="text-xl font-medium text-warning-600">Servicio de la API</h2>
      </div>
      <div className="flex gap-8">
        <Input
          label="Puerto del servidor"
          placeholder="3000"
          size="sm"
          radius="sm"
          defaultValue="3000"
          labelPlacement="outside"
          startContent={<span className="text-xs text-gray-400">localhost:</span>}
          classNames={{
            input: 'text-xs mb-0.5'
          }}
        />
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs text-gray-400">Desactivar/Activar</p>
          <Switch />
        </div>
      </div>
    </section>
  )
}

export default ApiSwitch
