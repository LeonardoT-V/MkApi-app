import { create } from 'zustand'

export const useTableStore = create((set) => ({
  tableName: '',
  setTableName: (name) => set(() => ({ tableName: name })),
  field: [
    { name: 'columna' },
    { name: 'tipo' },
    { name: 'parametro' },
    { name: 'default' },
    { name: 'null' }
  ],
  rows: [{ columna: 'id', tipo: 'serial', parametro: '', default: 'default', null: true }],
  setRows: (o) => {
    set((state) => ({
      rows: [...state.rows, o]
    }))
  },
  deleteTable: () =>
    set(() => ({
      tableName: '',
      rows: [{ columna: 'id', tipo: 'serial', parametro: '', default: 'default', null: true }]
    })),
  resetTable: () =>
    set(() => ({
      tableName: '',
      rows: [{ columna: 'id', tipo: 'serial', parametro: '', default: 'default', null: true }]
    })),
  openDialog: false,
  setOpenDialog: () => set((state) => ({ openDialog: !state.openDialog })),
  openTypeModal: false,
  setOpenTypeModal: () => set((state) => ({ openTypeModal: !state.openTypeModal })),
  error: null,
  setError: (o) => {
    set(() => ({ error: o }))
  }
}))
