import { useApiManageStore } from '../stores/apiManageStore'
import toast from '../utils/toast'

export function useApiState() {
  // TODO: posible error al recargar la pagina
  const isActive = useApiManageStore((state) => state.isActive)
  const setIsActive = useApiManageStore((state) => state.setIsActive)
  const portStore = useApiManageStore((state) => state.port)
  const setPortStore = useApiManageStore((state) => state.setPort)
  const activeStore = useApiManageStore((state) => state.active)
  const setActiveStore = useApiManageStore((state) => state.setActive)
  const swValueStore = useApiManageStore((state) => state.swValue)
  const setSwValueStore = useApiManageStore((state) => state.setSwValue)

  const startServer = async ({ port } = {}) => {
    const toastId = toast.loadingToast(
      'Iniciando servidor',
      `El servicio esta iniciando en el puerto ${port}`
    )

    if (!port) {
      toast.errorToast('Ingrese un puerto valido')
      return
    }

    try {
      const ha = await window.api.startLocalServer({ port })
      toast.successToast(toastId, 'Servicio Iniciado', 'El servidor se ha reanudado con exito')
      console.log(ha)
      setIsActive(true)
      setSwValueStore(true)
    } catch (error) {
      console.log(error)
      toast.errorToast(toastId, 'Ha ocurrido un error', 'Verifique sus conexiones')
    }
    return
  }

  const stopServer = async () => {
    const toaIO = toast.loadingToast('cargadno')
    try {
      const a = await window.api.stopLocalServer()
      toast.successToast(toaIO, 'Servidor detenido', 'servicio de api detenido')
      console.log(a)
      setIsActive(false)
      setSwValueStore(false)
    } catch (error) {
      console.log(error)
      toast.errorToast(toaIO, 'Ha ocurrido un error', 'No se pudo detener el servidor')
    }
  }

  const toogleServer = async ({ port } = {}) => {
    if (!port) {
      toast.errorToast('Ingrese un puerto valido')
      return
    }
    if (!isActive) {
      await startServer({ port })
      return
    } else {
      await stopServer()
      return
    }
  }

  return {
    state: isActive,
    toogleServer,
    swValue: swValueStore,
    port: portStore,
    setPort: setPortStore,
    active: activeStore,
    setActive: setActiveStore
  }
}
