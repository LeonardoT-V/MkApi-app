import { useEffect, useState } from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { useTableStore } from '../stores/tableStore'
// import { useTableStore } from '../store/tableStore'

export const useTables = () => {
  const data = useRouteLoaderData('appRoot')
  const [tables, setTables] = useState(data)
  useEffect(() => {
    setTables(data)
  }, [data, tables])

  const displayTableName = Object.keys(tables) || []

  const displayNameAndLength = Object.keys(tables).map((key) => ({
    name: key,
    length: tables[key].length
  }))

  return { displayTableName, tables, displayNameAndLength }
}

export const useFormatTable = () => {
  const [rows, tableName] = useTableStore((state) => [state.rows, state.tableName])
  const [query, setQuery] = useState('')

  useEffect(() => {
    setQuery(formatQuery())
  }, [rows])

  const formatQuery = () => {
    let format = ''
    const finalRow = rows.length - 1
    rows.forEach((item, index) => {
      if (index === 0) format += `CREATE TABLE ${tableName} ( \n`
      if (item.columna === 'id') {
        format += `\tid SERIAL PRIMARY KEY${finalRow !== index ? ',\n' : '\n'}`
        if (index === finalRow) format += `)`
        return
      }
      format += `\t${item.columna} ${item.tipo}${item?.parametro ? `${item.parametro}` : ''}${
        item?.default ? ` DEFAULT ${item.default}` : ''
      }${item?.null ? ' NOT NULL' : ''}${finalRow !== index ? ',\n' : '\n'}`
      console.log({ index, finalRow })
      if (index === finalRow) format += `)`
    })
    return format
  }

  return {
    query,
    formatQuery
  }
}

export const useManageColumnsTable = () => {
  const rows = useTableStore((state) => state.rows)
  const setRows = useTableStore((state) => state.setRows)
  const setError = useTableStore((state) => state.setError)
  const setOpenTypeModal = useTableStore((state) => state.setOpenTypeModal)

  const addNewColumn = ({ values, resetForm }) => {
    const filterColumn = ['columna', 'tipo']
    setError(null)
    const someError = rows.some((row) => row.columna === values.columna)
    if (someError) {
      setError(['Ya existe una columna con este nombre'])
      return
    }
    const listError = filterColumn
      .map((item) => values[item] === '' && `El valor ${item} no puede ir vacio`)
      .filter((i) => i !== false)
    if (listError.length !== 0) {
      setError(listError)
      return
    }
    console.log('passs')
    setRows(values)
    setOpenTypeModal()
    resetForm()
  }

  return {
    addNewColumn
  }
}
