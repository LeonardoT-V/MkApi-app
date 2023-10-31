import { IconTableColumn } from '@tabler/icons-react'

function TablesCard({ table, buttonZone, isHover = true }) {
  return (
    <div
      className={`group bg-content1 py-2 px-7 rounded-small flex gap-3 ${
        isHover ? 'hover:scale-[0.98] hover:bg-primary-700/25 cursor-pointer' : ''
      } transition-all ease-soft-spring  items-center`}
    >
      <div>
        <IconTableColumn className="h-full text-primary-400" />
      </div>
      <div className="grow">
        <h3
          className={`${
            isHover ? 'group-hover:text-primary-400' : ''
          } text-sm lg:text-lg  transition-all`}
        >
          {table.name}
        </h3>
        <p className="text-xs text-gray-400">
          Columnas: <span className="text-warning-700">{table.length}</span>
        </p>
      </div>
      {buttonZone && buttonZone(table)}
    </div>
  )
}

export default TablesCard
