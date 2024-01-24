import { TitleContainer } from '../shared'
import SelectionTable from './SelectionTable'

export default function ContainerTables({ tables, selectTable }) {
  return (
    <section className="space-y-2">
      <TitleContainer title="Tus tablas" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tables.map((i) => (
          <SelectionTable table={i} key={i.name} onClick={() => selectTable(i.name)} />
        ))}
      </div>
    </section>
  )
}
