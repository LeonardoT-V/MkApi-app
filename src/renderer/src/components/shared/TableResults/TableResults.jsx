import { Button, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'

import { AgGridReact } from 'ag-grid-react' // React Grid Logic
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import { IconPencil } from '@tabler/icons-react'
import { IconTrash } from '@tabler/icons-react'
import { IconMenu2 } from '@tabler/icons-react'

export default function TableResults({ rows = [], editCol = true }) {
  if (rows.length === 0 || typeof rows === 'undefined' || rows === null) {
    return <Hoal />
  }

  const col = Object.keys(rows[0]).map((i) => ({
    field: i,
    filter: true,
    floatingFilter: true,
    editable: false,
    flex: 1,
    cellRendererSelector: (params) => {
      const rowFormat = {
        component: FormatRowCamp
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
      cellRenderer: (params) => (
        <div className="flex justify-center items-center align-middle h-full">
          <Dropdown>
            <DropdownTrigger>
              <Button
                className="w-full"
                size="sm"
                variant="flat"
                startContent={<IconMenu2 className="h-4 w-4" />}
                isIconOnly
              ></Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Table actions">
              <DropdownItem
                color="success"
                startContent={<IconPencil className="h-5 w-5 text-success-600" stroke={1.5} />}
                key="editar"
                onClick={() => console.log(params.data)}
              >
                Editar
              </DropdownItem>
              <DropdownItem
                color="danger"
                startContent={<IconTrash className="h-5 w-5 text-danger-600" stroke={1.5} />}
                key="borrar"
              >
                Borrar
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )
    })
  }

  return (
    <section className="w-full h-96 ag-theme-quartz-dark">
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
  )
}
