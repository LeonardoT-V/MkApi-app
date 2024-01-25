import { useRevalidator } from 'react-router-dom'
import { useFormatTable } from '../hooks/useTables'
import toast from '../utils/toast'
import { useEditorService } from './useEditorService'

export function useTableService() {
  const { query } = useFormatTable()
  const { executeSqlCommand } = useEditorService()

  const revalidator = useRevalidator()

  const createNewTable = async (callback) => {
    const toastId = toast.loadingToast('Creando tabla')
    console.log({ query })
    const { err } = await executeSqlCommand({ command: query, isEditor: false })
    if (err) {
      toast.errorToast(toastId, err.detail, err.description)
      return
    }
    toast.successToast(
      toastId,
      'Tabla creada correctamente',
      'La operacion se ha completado con exito'
    )
    revalidator.revalidate()
    callback()
  }

  return {
    createNewTable
  }
}
