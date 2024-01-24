import { create } from 'zustand'

export const useBackupStore = create((set) => ({
  backup: [],
  setBackup: (file) =>
    set(() => ({
      backup: file
    }))
}))
