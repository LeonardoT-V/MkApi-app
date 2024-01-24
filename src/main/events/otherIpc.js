import { dialog } from 'electron'
const { exec } = require('node:child_process')
const { join } = require('node:path')

class OtherIPC {
  constructor(app) {
    this.app = app
    this.APPDATA = this.app.getPath('userData') + '/Projects'
  }

  async selectDirectoryPc() {
    const { canceled, filePaths } = await dialog.showOpenDialog({
      properties: ['openDirectory']
    })
    if (canceled) {
      return
    } else {
      return filePaths[0]
    }
  }

  async openFileExplorer({ path }) {
    try {
      let command = ''
      console.log(path)
      switch (process.platform) {
        case 'darwin':
          command = 'open -R ' + path
          break
        case 'win32':
          if (process.env.SystemRoot) {
            command = join(process.env.SystemRoot, 'explorer.exe')
          } else {
            command = 'explorer.exe'
          }
          command += ' /select,' + path
          break
        default:
          //path = dirname(path)
          command = 'xdg-open ' + path
      }
      const stdOut = exec(command)
      return stdOut
    } catch (error) {
      console.log(error)
      return { error: { description: error } }
    }
  }
}

export default OtherIPC
