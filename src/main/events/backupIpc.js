import fs from 'fs'
const { execSync } = require('node:child_process')

class BackupIPC {
  constructor(app) {
    this.app = app
    this.APPDATA = this.app.getPath('userData') + '/Projects'
  }

  async execGenerateCommand({ project }) {
    const { backup: backupOpt, db: dbOpt } = project
    const timeNow = new Date()

    const formatedMinutes = this._formatNumberDate(timeNow.getMinutes())
    const formatTime = `${this._formatNumberDate(timeNow.getDate())}-${this._formatNumberDate(
      timeNow.getMonth() + 1
    )}-${timeNow.getFullYear()}_${this._formatNumberDate(
      timeNow.getHours()
    )}:${formatedMinutes}:${this._formatNumberDate(timeNow.getSeconds())}`

    const cmdDocker = `docker exec ${backupOpt.containerName} pg_dump -U ${dbOpt.user} -h ${dbOpt.host} -p ${dbOpt.port} ${dbOpt.database} > ${backupOpt.directory}/${formatTime}.sql`
    console.log(formatTime)
    try {
      execSync(cmdDocker, {
        encoding: 'utf8'
      })
      const file = `${formatTime}.sql`
      const formated = this._formatNameFile(file)
      return formated
    } catch (err) {
      return { error: { description: err.stderr } }
    }
  }

  async readDirectoryForBackup({ project }) {
    const { backup: backupOpt } = project

    // leer todos los archivos dentro de la carpeta
    const files = fs.readdirSync(backupOpt.directory, {
      encoding: 'utf-8',
      withFileTypes: false
    })
    // en caso manejar error si no existen proyectos
    if (files.length === 0) {
      return []
    }

    const backupFiles = files.map((i) => {
      const formated = this._formatNameFile(i)
      return formated
    })

    const filteredFiles = backupFiles.sort((a, b) => {
      if (a.timeStamp < b.timeStamp) {
        return 1
      }
      if (a.timeStamp > b.timeStamp) {
        return -1
      }

      return 0
    })

    return filteredFiles
  }

  async readBackupFileContent({ project, originalName }) {
    const { backup: backupOpt } = project
    try {
      const backupContent = fs.readFileSync(`${backupOpt.directory}/${originalName}`, {
        encoding: 'utf-8'
      })
      return backupContent
    } catch (error) {
      return { error: { description: 'Ha ocurrido un error inesperado' } }
    }
  }

  _formatNameFile(file) {
    const removedExtension = file.replace('.sql', '')
    const separatedName = removedExtension.split('_')
    const timeStamp = separatedName[0] + separatedName[1]
    return {
      originalName: file,
      date: separatedName[0],
      name: removedExtension,
      time: separatedName[1],
      timeStamp
    }
  }
  _formatNumberDate(value) {
    if (value <= 9) {
      return `0${value}`
    }
    return value
  }
}
export default BackupIPC
