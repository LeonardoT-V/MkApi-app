import { create } from 'zustand'

export const useProjectStore = create((set) => ({
  configuration: {},
  setConfiguration: (conf) =>
    set(() => ({
      configuration: conf
    }))
}))
