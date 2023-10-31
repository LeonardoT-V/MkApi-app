import { create } from 'zustand'

export const useEditorStore = create((set) => ({
  code: 'select * from example',
  setCode: (editCode) => set(() => ({ code: editCode })),
  results: null,
  setResults: (results) => set(() => ({ results: results })),
  loading: false,
  setLoading: (state) => set(() => ({ loading: state })),
  ResetStore: () => set(() => ({ results: null, code: '-- escriba su codigo aquí' }))
}))
