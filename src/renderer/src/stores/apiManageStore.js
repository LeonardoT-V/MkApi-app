import { create } from 'zustand'

export const useApiManageStore = create((set) => ({
  isActive: false,
  setIsActive: (value) =>
    set(() => ({
      isActive: value
    })),
  port: '',
  setPort: (value) =>
    set(() => ({
      port: value
    })),
  active: true,
  setActive: (value) =>
    set(() => ({
      active: value
    })),
  swValue: false,
  setSwValue: (value) =>
    set(() => ({
      swValue: value
    }))
}))
