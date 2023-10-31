import DropBox from '../shared/DropBox'
import { IconFileDislike } from '@tabler/icons-react'
import { IconFileLike } from '@tabler/icons-react'
import { IconFile } from '@tabler/icons-react'
import { useEditorService } from '../../services/useEditorService'

function DropBoxEditor() {
  const { executeFileCommand } = useEditorService()
  return (
    <DropBox
      execFunt={executeFileCommand}
      sx="h-full w-full"
      accept={'.sql'}
      // accept={{ 'aplication/sql': ['.sql'] }}
      renderZone={(isDragAccept, isDragActive, isDragReject) => (
        <>
          {isDragReject && (
            <MyDropbox
              titulo1="Ingrese un archivo"
              titulo2=".SQL"
              msg="ASegure que su archivo termine con la extension correcta"
              variant="reject"
            />
          )}
          {isDragAccept && (
            <MyDropbox
              titulo1="Arroje su archivo"
              titulo2=".SQL"
              msg="Suelte para Comienza a realizar una consulta a la base de datos"
              variant="success"
            />
          )}
          {!isDragActive && (
            <MyDropbox
              titulo1="Sube un archivo"
              titulo2=".SQL"
              msg="Puedes arrastrar un archivo o dando clic en el cuadro"
            />
          )}
        </>
      )}
    />
  )
}

function MyDropbox({ titulo1, titulo2, msg, variant = 'default' }) {
  const Type = {
    reject: {
      color: 'text-warning-600 bg-warning-400/20 border-warning-400',
      Icon: IconFileDislike
    },
    success: {
      color: 'text-success-600 bg-success-400/20 border-success-400',
      Icon: IconFileLike
    },
    default: { color: 'text-primary-500 bg-primary-400/5 border-primary-700', Icon: IconFile }
  }
  const Icon = Type[variant]['Icon']

  return (
    <div
      className={`h-full border-2 border-dashed rounded-small p-unit-md hover:bg-content1/60 hover:cursor-pointer flex lg:flex-col items-center justify-center align-middle gap-unit-md px-6 lg:px-10 ${Type[variant]['color']} transition-all`}
    >
      <div>
        <Icon stroke={1.5} className="h-16 w-16" />
      </div>
      <div className="flex flex-col items-center text-center justify-center">
        <h4 className="text-lg lg:text-xl">{titulo1}</h4>
        <p className="text-2xl lg:text-4xl text-gray-300 font-bold">{titulo2}</p>
        <p className="text-xs text-gray-500 mt-2">{msg}</p>
      </div>
    </div>
  )
}

export default DropBoxEditor
