import DialogContainer from '../shared/DialogContainer'
import { IconAlertHexagon } from '@tabler/icons-react'

function ErrorQueryEditor({ error }) {
  console.log(error)
  return (
    <DialogContainer color="danger" sx="py-6 px-8 flex-col items-center">
      <IconAlertHexagon size={64} />
      <article>
        <header className="flex gap-unit-xs text-3xl">
          <h3>{error?.code}</h3>
          <span>{error?.description}</span>
        </header>
        <footer className="mt-2">
          <p className="text-danger-700">
            Detalle: <span className="text-gray-300"> {error?.details}</span>
          </p>
          <p className="text-danger-700">
            Posición del error: <span className="text-gray-300"> {error?.position}</span>
          </p>
        </footer>
      </article>
    </DialogContainer>
  )
}

export default ErrorQueryEditor
