import { AgGridReact } from 'ag-grid-react'
import FormartRowCamp from './FormartRowCamp'
import NoDataTable from './NoDataTable'
import ActionsButtons from './ActionsButtons'

export default function index({ rows = null, editCol = true }) {
  if (typeof rows === 'undefined' || rows === null) {
    return <NoDataTable />
  }

  if (rows.length === 0) {
    return <NoDataTable isNull={false} />
  }

  const col = Object.keys(rows[0]).map((i) => ({
    field: i,
    filter: true,
    floatingFilter: true,
    editable: false,
    flex: 1,
    cellRendererSelector: (params) => {
      const rowFormat = {
        component: FormartRowCamp,
        cellClass: ['!bg-red-400']
      }
      if (params.data) {
        return rowFormat
      }
    }
  }))

  if (editCol) {
    col.push({
      field: '',
      pinned: 'right',
      resizable: false,
      width: 100,
      cellRenderer: (params) => <ActionsButtons params={params} />
    })
  }

  return (
    <>
      <section className="w-full  flex grow flex-col !h-96 ag-theme-quartz-dark">
        <AgGridReact
          className={'ag-theme-quartz-dark'}
          rowData={rows}
          columnDefs={col}
          suppressClickEdit={true}
          paginationPageSizeSelector={false}
          pagination={true}
          paginationAutoPageSize={true}
          suppressCellFocus={true}
        />
      </section>
    </>
  )
}
