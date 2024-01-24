import { useState } from 'react'
import { useTables } from '../hooks/useTables'
import ContainerTables from '../components/DataPage/ContainerTables'
import { useEditorService } from '../services/useEditorService'
import TableResults from '../components/shared/TableResults'
import DrawerActions from '../components/shared/TableResults/DrawerActions'
import AddNewData from '../components/shared/TableResults/AddNewData'
import DeleteModal from '../components/shared/TableResults/DeleteModal'

export default function DataPage() {
  const { displayNameAndLength: tables } = useTables()

  const [selectedTable, setSelectedTable] = useState(null)
  const [selectedTableName, setSelectedTableName] = useState('')

  const { executeSqlCommand, loader } = useEditorService()

  const fecthData = async (table) => {
    const data = await executeSqlCommand({ command: `select * from ${table}`, isEditor: false })
    setSelectedTable(data.rows)
    setSelectedTableName(table)
  }

  return (
    <>
      <ContainerTables tables={tables} selectTable={fecthData} />

      <TableResults rows={selectedTable} table={selectedTableName} loader={loader} />
      <DrawerActions table={selectedTableName} fecthData={fecthData} />
      {selectedTableName && <AddNewData table={selectedTableName} fecthData={fecthData} />}

      <DeleteModal table={selectedTableName} fecthData={fecthData} />
    </>
  )
}
