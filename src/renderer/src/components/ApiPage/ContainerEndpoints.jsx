import { Button, Popover, PopoverContent, PopoverTrigger, Input } from '@nextui-org/react'
import { useTables } from '../../hooks/useTables'
import { IconHttpGet, IconServer } from '@tabler/icons-react'
import toast from '../../utils/toast'
import { useState } from 'react'
import { useApiState } from '../../hooks/useApi'

export default function ContainerEndpoints({ setApiGet }) {
  const { displayNameAndLength: tables } = useTables()
  const { port } = useApiState()
  const [inputId, setInputId] = useState('')

  const getAllFetchApi = async (table, { id } = {}) => {
    const toastID = toast.loadingToast('Cargando...', 'Consultando la API')
    try {
      const res = !id
        ? await fetch(`http://localhost:${port}/api/${table}`)
        : await fetch(`http://localhost:${port}/api/${table}/${id}`)

      if (!res.ok) {
        toast.errorToast(
          toastID,
          'Ha ocurrido un error',
          'verificar los campos o funcionamiento del servicio'
        )
        setApiGet({})
        return
      }
      const data = await res.json()
      setApiGet(data)
      setInputId('')
      toast.successToast(toastID, 'OK')
    } catch (error) {
      setApiGet({})
      toast.errorToast(
        toastID,
        'Error al conectar a la API',
        'verificar funcionamiento del servicio'
      )
    }
  }

  return (
    <section className="grow h-1 overflow-y-scroll space-y-2">
      {tables.map((table) => (
        <div
          key={table.name}
          className="group bg-content1 py-2 px-4 rounded-small flex gap-2 items-center flex-col lg:flex-row"
        >
          <div>
            <IconServer
              className="h-7 w-7 lg:h-5 lg:w-5 text-primary-500 font-medium"
              stroke={1.5}
            />
          </div>
          <div className="grow">
            <h3
              className={`text-center lg:text-left text-primary-200 text-xs lg:text-sm transition-all truncate`}
            >
              {table.name}
            </h3>
            <p className="text-xs text-gray-400">
              Columnas: <span className="text-warning-700">{table.length}</span>
            </p>
          </div>
          <div className="space-x-2">
            <Button
              size="sm"
              color="primary"
              variant="light"
              onClick={() => getAllFetchApi(table.name)}
            >
              <IconHttpGet className="hidden lg:block" />
              <span>General</span>
            </Button>

            <Popover placement="bottom" showArrow offset={10}>
              <PopoverTrigger>
                <Button size="sm" color="default" variant="ghost">
                  <IconHttpGet className="hidden lg:block" />
                  <span>Por Id</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="">
                {() => (
                  <div className="py-2 space-y-3">
                    <Input
                      label="Dato ID"
                      size="sm"
                      variant="flat"
                      labelPlacement="outside-left"
                      onChange={(e) => setInputId(e.target.value)}
                    />
                    <Button
                      size="sm"
                      color="primary"
                      fullWidth
                      onClick={() => getAllFetchApi(table.name, { id: inputId })}
                    >
                      Buscar
                    </Button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      ))}
    </section>
  )
}
