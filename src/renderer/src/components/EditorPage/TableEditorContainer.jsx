import { Pagination } from '@nextui-org/react'
import { useEditorStore } from '../../stores/editorStore'
import { TableBasic } from '../shared'
import InfoQueryEditor from './InfoQueryEditor'

function TableEditorContainer() {
  const results = useEditorStore((state) => state.results)
  return (
    <section className="">
      <TableBasic
        cols={results?.fields}
        rows={results?.rows}
        isLoading={true}
        paginationRender={
          <div className="flex gap-4 flex-col items-center lg:flex-row">
            <InfoQueryEditor results={results} />
            <Pagination
              isCompact
              size="lg"
              showControls
              color="default"
              page={1}
              total={10}
              radius="full"
              variant="light"
              className="lg:min-w-[400px]"
            />
          </div>
        }
      />
    </section>
  )
}

export default TableEditorContainer
