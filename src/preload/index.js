import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
const project = {
  createNewProject: ({ project }) => ipcRenderer.invoke('project:create-project', { project }),
  getAllProject: () => ipcRenderer.invoke('project:get-all-project'),
  openProject: ({ project }) => ipcRenderer.invoke('project:open-project', { project })
}
const editor = {
  executeSqlCommand: ({ project, command }) =>
    ipcRenderer.invoke('editor:execute-sql', { project, command }),
  executeFileCommand: ({ project, path }) =>
    ipcRenderer.invoke('editor:execute-file', { project, path })
}
const database = {
  allAtributesDatabase: ({ project }) => ipcRenderer.invoke('database:get-all-data', { project }),
  createNewTable: ({ query }) => ipcRenderer.invoke('database:create-new-table', { query })
}
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('project', project)
    contextBridge.exposeInMainWorld('database', database)
    contextBridge.exposeInMainWorld('editor', editor)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
