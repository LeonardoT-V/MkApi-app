import {
  Code,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@nextui-org/react'

function TableBasic({ cols = [], rows = [], isLoading = false, paginationRender }) {
  return (
    <>
      {cols.length === 0 ? (
        <></>
      ) : (
        <Table
          aria-labelledby="table of data"
          classNames={{
            th: 'bg-primary-700/25 text-warning-600 font-bold capitalize',
            td: 'first-of-type:text-warning-600',
            wrapper: 'rounded-small p-unit-md shadow-none'
          }}
          bottomContentPlacement="outside"
          bottomContent={paginationRender}
        >
          <TableHeader className="bg-primary-400" columns={cols}>
            {(column) => <TableColumn key={column?.name}>{column?.name}</TableColumn>}
          </TableHeader>
          <TableBody isLoading={isLoading} items={rows}>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {(columnKey) => (
                  <TableCell key={`${columnKey}-${row[columnKey]}-${index}`}>
                    <FormatRowCamp data={row[columnKey]} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default TableBasic

function FormatRowCamp({ data }) {
  if (data === '') {
    return <p className="text-gray-400 ">none</p>
  }
  if (typeof data !== 'boolean') {
    return <p className="">{data}</p>
  }
  const showData = data ? 'true' : 'false'
  return (
    <Code color={data ? 'success' : 'secondary'} radius="full">
      {showData}
    </Code>
  )
}
