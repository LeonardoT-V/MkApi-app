import { Spinner } from '@nextui-org/react'
import { IconCheck } from '@tabler/icons-react'
import { IconExclamationCircle } from '@tabler/icons-react'
import { toast as toaster } from 'sonner'
class Toast {
  errorToast(id, title, description) {
    toaster(
      <div className="flex items-center gap-unit-md ">
        <IconExclamationCircle size={32} className="stroke-pink-600" />
        <div className="flex flex-col">
          <h4 className="text-pink-400 text-medium">{title || 'Ha ocurrido un error'}</h4>
          <p className="text-default-400 text-xs">{description || ''}</p>
        </div>
      </div>,
      {
        id,
        style: { backgroundColor: '#310413' }
      }
    )
  }

  successToast(id, title, description) {
    toaster(
      <div className="flex items-center gap-unit-md ">
        <IconCheck size={32} className="stroke-lime-400" />
        <div className="flex flex-col">
          <h4 className="text-lime-400 text-medium">{title || 'Correctamente'}</h4>
          <p className="text-default-400">{description || 'Ha funcionado correctamente'}</p>
        </div>
      </div>,
      {
        id,
        style: { backgroundColor: '#052814' }
      }
    )
  }

  loadingToast(title, description) {
    const id = toaster(
      <div className="flex items-center gap-unit-md">
        <Spinner />
        <div className="flex flex-col">
          <h4 className="text-cyan-400 text-medium">{title}</h4>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    )
    return id
  }
}

const toast = new Toast()

export default toast
