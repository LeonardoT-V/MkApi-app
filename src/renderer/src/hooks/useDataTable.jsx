import { useDataTableStore } from '../stores/dataTableStore'

export function useDataTable() {
  const modal = useDataTableStore((state) => state.modal)
  const toggleModal = useDataTableStore((state) => state.toggleModal)
  const data = useDataTableStore((state) => state.data)
  const setData = useDataTableStore((state) => state.setData)
  const deleteModal = useDataTableStore((state) => state.deleteModal)
  const setDeleteModal = useDataTableStore((state) => state.setDeleteModal)
  const toggleDeleteModal = useDataTableStore((state) => state.toggleDeleteModal)

  return {
    modal,
    toggleModal,
    data,
    setData,
    deleteModal,
    setDeleteModal,
    toggleDeleteModal
  }
}
