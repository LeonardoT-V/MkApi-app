import { useFormatTable } from '../hooks/useTables'

export function useTableService() {
  const { query } = useFormatTable()
  const createNewTable = async () => {
    console.log({ query })
    const res = await window.database.createNewTable({ query })
  }

  return {
    createNewTable
  }
}
