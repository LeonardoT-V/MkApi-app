import { IconLayoutRows, IconBrandGoogleBigQuery, IconTrash } from '@tabler/icons-react'
import DialogContainer from '../shared/DialogContainer'
import { Method_Rest_Colors } from '../../../const'

function InfoQueryEditor({ results }) {
  const dialogColor = Method_Rest_Colors[results?.command]
  const queryVariant = {
    SELECT: {
      Icon: IconBrandGoogleBigQuery,
      light: 'text-success-700',
      hard: 'text-success-500'
    },
    DELETE: {
      Icon: IconTrash,
      light: 'text-danger-700',
      hard: 'text-danger-500'
    },
    ALTER: {
      Icon: IconTrash,
      light: 'text-secondary-700',
      hard: 'text-secondary-500'
    }
  }
  const Icon = queryVariant[results.command]['Icon']
  return (
    <DialogContainer sx="py-2 px-8 items-center" color={dialogColor}>
      <Icon size={48} className={`${queryVariant[results.command]['hard']}`} stroke={1.5} />
      <div>
        <h3 className={`${queryVariant[results.command]['light']} font-medium text-2xl`}>
          {results?.command}
        </h3>
        <div className="flex gap-16">
          <div className="flex gap-1 items-center">
            <IconLayoutRows className={`h-4 ${queryVariant[results.command]['hard']}`} />
            <p className={`text-gray-400 text-sm ${queryVariant[results.command]['light']}`}>
              Filas Totales: <span className="text-gray-400 font-medium">{results?.rowCount}</span>
            </p>
          </div>
          <div className="flex gap-1 items-center">
            <IconLayoutRows className={`h-4 ${queryVariant[results.command]['hard']}`} />
            <p className={`${queryVariant[results.command]['light']} text-sm`}>
              Mostrando <span className="text-gray-300">2</span> de{' '}
              <span className="text-gray-300">2</span>
            </p>
          </div>
        </div>
      </div>
    </DialogContainer>
  )
}

export default InfoQueryEditor
