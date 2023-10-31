import { useTables } from '../../hooks/useTables'
import TablesCard from '../shared/TablesCard'

function ContainerTablesCreated({ sx, buttonZone, titleZone, children, propCard }) {
  const { displayNameAndLength: tables } = useTables()

  return (
    <>
      {titleZone}
      <div className={sx}>
        {tables.map((table) => (
          <TablesCard key={table.name} table={table} buttonZone={buttonZone} {...propCard} />
        ))}
      </div>
      {children}
    </>
  )
}

export default ContainerTablesCreated
