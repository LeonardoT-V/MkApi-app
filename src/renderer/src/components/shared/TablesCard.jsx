import { IconTableColumn } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

function TablesCard({ table }) {
  return (
    <Link
      to={`/app/tables/${table.name}`}
      className={`group bg-content1 py-2 px-3 rounded-small flex gap-2 hover:scale-[0.98] hover:bg-primary-700/25 cursor-pointer transition-all ease-soft-spring items-center`}
    >
      <div>
        <IconTableColumn className="h-5 w-5 text-primary-400" stroke={1.5} />
      </div>
      <div className="grow">
        <h3 className="group-hover:text-primary-400 text-xs lg:text-sm transition-all truncate">
          {table.name}
        </h3>
        <p className="text-xs text-gray-400">
          Columnas: <span className="text-warning-700">{table.length}</span>
        </p>
      </div>
    </Link>
  )
}

export default TablesCard
