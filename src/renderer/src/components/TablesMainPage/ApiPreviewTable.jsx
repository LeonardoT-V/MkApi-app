import { IconHttpGet } from '@tabler/icons-react'
import { IconHttpDelete } from '@tabler/icons-react'
import { IconHttpPut } from '@tabler/icons-react'
import { IconHttpPost } from '@tabler/icons-react'
import { useTableStore } from '../../stores/tableStore'

function ApiPreviewTable() {
  const [tableName] = useTableStore((state) => [state.tableName])
  return (
    <div className="w-full flex flex-col px-unit-md gap-unit-sm">
      <h3 className="text-lg text-warning-600 font-bold">Api Preview</h3>
      <div className="flex gap-8 w-full ">
        <div className="flex flex-col gap-unit-sm w-full">
          <p className="text-gray-400 text-sm">Por un id</p>
          <div className="flex flex-col gap-unit-xs pl-unit-xs">
            <ItemApi tableName={tableName} method="get" />
            <ItemApi tableName={tableName} method="post" />
            <ItemApi tableName={tableName} method="delete" />
            <ItemApi tableName={tableName} method="put" />
          </div>
        </div>
        <div className="flex flex-col gap-unit-sm w-full">
          <p className="text-gray-400 text-sm">Buscar toda la tabla</p>
          <div className="flex flex-col gap-unit-xs pl-unit-xs">
            <ItemApi tableName={tableName} isId={false} method="get" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiPreviewTable

function ItemApi({ tableName, isId = true, method }) {
  const IconList = {
    delete: IconHttpDelete,
    get: IconHttpGet,
    put: IconHttpPut,
    post: IconHttpPost
  }
  const Icon = IconList[method]

  return (
    <div className="flex gap-unit-xs items-center">
      <div className={`rounded-small px-5 bg-content2`}>
        <Icon />
      </div>
      <div className="flex grow w-1 text-gray-300">
        <p>/api/</p>
        <p className="truncate text-primary-200">{tableName}</p>
        <span>{isId && '/:id'}</span>
      </div>
    </div>
  )
}
