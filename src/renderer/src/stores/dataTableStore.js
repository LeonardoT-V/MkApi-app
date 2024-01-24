import { create } from 'zustand'

export const useDataTableStore = create((set) => ({
  modal: false,
  setModal: (param) => set(() => ({ modal: param })),
  toggleModal: () =>
    set((state) => ({ modal: !state.modal, data: state.modal ? {} : { ...state.data } })),
  deleteModal: false,
  setDeleteModal: (param) => set(() => ({ deleteModal: param })),
  toggleDeleteModal: () =>
    set((state) => ({
      deleteModal: !state.deleteModal,
      data: state.deleteModal ? {} : { ...state.data }
    })),
  data: {},
  setData: (param) => set(() => ({ data: param }))
}))
