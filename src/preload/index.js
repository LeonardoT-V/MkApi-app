import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  startLocalServer: ({ port }) => ipcRenderer.invoke('api:start-local-server', { port }),
  stopLocalServer: () => ipcRenderer.invoke('api:stop-local-server')
}

const other = {
  selectDirectoryPc: () => ipcRenderer.invoke('other:select-directory'),
  openFileExplorer: ({ path }) => ipcRenderer.invoke('other:open-file-explorer', { path })
}

const backup = {
  execGenerateCommand: ({ project }) => ipcRenderer.invoke('backup:execute-command', { project }),
  readDirectoryForBackup: ({ project }) =>
    ipcRenderer.invoke('backup:read-folder-backup', { project }),
  readBackupFileContent: ({ project, originalName }) =>
    ipcRenderer.invoke('backup:read-backup-content', { project, originalName })
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
const project = {
  createNewProject: ({ project }) => ipcRenderer.invoke('project:create-project', { project }),
  getAllProject: () => ipcRenderer.invoke('project:get-all-project'),
  openProject: ({ project }) => ipcRenderer.invoke('project:open-project', { project }),
  editProject: ({ project }) => ipcRenderer.invoke('project:edit-project', { project })
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
    contextBridge.exposeInMainWorld('other', other)
    contextBridge.exposeInMainWorld('editor', editor)
    contextBridge.exposeInMainWorld('backup', backup)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
