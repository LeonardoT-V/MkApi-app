import { IconClipboardData } from '@tabler/icons-react'
import { IconTable } from '@tabler/icons-react'

export default function NoDataTable({ isNull = true }) {
  if (!isNull) {
    return (
      <section className="h-96 bg-content1 rounded-small p-4 border-content2 bg-primary-900/10 border flex gap-4 flex-col justify-center items-center">
        <IconClipboardData className="h-24 w-24 text-primary-200" stroke={1} />
        <h3 className="text-3xl text-gray-100">No hay datos registrados</h3>
        <span className="text-sm text-gray-500 -mt-2">
          Ingrese nuevo elementos con el boton de abajo
        </span>
      </section>
    )
  }

  return (
    <section className="h-96 bg-content1 rounded-small p-4 border-content2 bg-primary-900/10 border flex gap-4 flex-col justify-center items-center">
      <IconTable className="h-24 w-24 text-primary-200" stroke={1} />
      <h3 className="text-3xl text-gray-100">Seleccione una tabla</h3>
      <span className="text-sm text-gray-500 -mt-2">para ver sus datos</span>
    </section>
  )
}
