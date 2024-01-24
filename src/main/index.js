import { app, shell, BrowserWindow, ipcMain, nativeTheme } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import ProjectIPC from './events/projectIpc'
import DatabaseIPC from './events/databaseIpc'
import EditorIPC from './events/editorIpc'
import { openExpressServer, stopExpressServer } from './events/apiIcp'
import OtherIPC from './events/otherIpc'
import BackupIPC from './events/backupIpc'
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    darkTheme: true,
    backgroundMaterial: 'mica'
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault()
    require('electron').shell.openExternal(url)
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  const projectIpc = new ProjectIPC(app)
  const databaseIpc = new DatabaseIPC(app)
  const editorIpc = new EditorIPC(app)
  const otherIpc = new OtherIPC(app)
  const backupIpc = new BackupIPC(app)

  ipcMain.handle('project:create-project', (_, { project }) =>
    projectIpc.createNewProject({ project })
  )
  ipcMain.handle('project:edit-project', (_, { project }) => projectIpc.editOneProject({ project }))

  ipcMain.handle('project:get-all-project', () => projectIpc.getAllProject())
  ipcMain.handle('project:open-project', (_, { project }) => projectIpc.openProject({ project }))

  ipcMain.handle('database:get-all-data', (_, { project }) =>
    databaseIpc.allAtributesDatabase({ project })
  )
  ipcMain.handle('database:create-new-table', (_, { query }) =>
    databaseIpc.createNewTable({ query })
  )

  ipcMain.handle('editor:execute-sql', (_, { project, command }) =>
    editorIpc.executeSqlCommand({ project, command })
  )
  ipcMain.handle('editor:execute-file', (_, { project, path }) =>
    editorIpc.executeFileCommand({ project, path })
  )

  ipcMain.handle('api:start-local-server', (_, { port }) => openExpressServer({ port }))
  ipcMain.handle('api:stop-local-server', () => stopExpressServer())

  ipcMain.handle('other:select-directory', () => otherIpc.selectDirectoryPc())
  ipcMain.handle('other:open-file-explorer', (_, { path }) => otherIpc.openFileExplorer({ path }))

  ipcMain.handle('backup:execute-command', (_, { project }) =>
    backupIpc.execGenerateCommand({ project })
  )
  ipcMain.handle('backup:read-backup-content', (_, { project, originalName }) =>
    backupIpc.readBackupFileContent({ project, originalName })
  )
  ipcMain.handle('backup:read-folder-backup', (_, { project }) =>
    backupIpc.readDirectoryForBackup({ project })
  )

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

  nativeTheme.themeSource = 'dark'
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
