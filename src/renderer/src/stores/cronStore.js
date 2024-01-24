import { create } from 'zustand'

export const useCronStore = create((set) => ({
  cronInfo: {},
  setCronInfo: (file) =>
    set(() => ({
      cronInfo: file
    })),
  isActive: false,
  setIsActive: (val) =>
    set(() => ({
      isActive: val
    })),
  projectHab: false,
  setProjectHab: (val) =>
    set(() => ({
      projectHab: val
    }))
}))
