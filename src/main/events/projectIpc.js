import fs from 'fs'
import { Pool } from 'pg'
import searchCodeErrorPg from '../utils/postgresErrorCode'
import { decrypt, encrypt } from '../utils/crypt'
class ProjectIPC {
  constructor(app) {
    this.app = app
    this.APPDATA = this.app.getPath('userData') + '/Projects'
  }
  async createNewProject({ project }) {
    try {
      // si no existe una conexión, enviar al cliente el error presentado
      const connection = await this._tryconectionToDB({ project, isNew: true })
      if (connection) {
        return connection
      }
      // si no existe el directorio para los proyecto se crea la carpeta
      if (!fs.existsSync(`${this.APPDATA}`)) {
        fs.mkdirSync(`${this.APPDATA}`)
      }
      // verifica si existe el un proyecto con el mismo nombre
      if (fs.existsSync(`${this.APPDATA}/${project.file}.json`)) {
        return {
          error: {
            code: '',
            description: `El proyecto ${project.file} ya existe`,
            details: 'Intente crear un nuevo proyecto con otro nombre'
          }
        }
      }
      // encriptacion de la contraseña
      const cryptedPass = encrypt({ value: project.password })

      // envio de la informacion al cliente
      const newJson = {
        file: project.file,
        db: {
          user: project.user,
          password: cryptedPass,
          host: project.host,
          port: project.port,
          database: project.database
        }
      }
      fs.writeFile(
        `${this.APPDATA}/${project.file}.json`,
        JSON.stringify(newJson, null, 2),
        (err) => {
          if (err) return console.log(err)
          console.log('file create')
        }
      )
      return newJson
    } catch (error) {
      const errorStatus = searchCodeErrorPg(error)
      return JSON.stringify({ error: errorStatus })
    }
  }

  async getAllProject() {
    // Revisa la existencia de la carpeta, en caso de no existir la crea
    if (!fs.existsSync(`${this.APPDATA}`)) {
      fs.mkdirSync(`${this.APPDATA}`)
    }
    // leer todos los archivos dentro de la carpeta
    const files = fs.readdirSync(this.APPDATA, {
      encoding: 'utf-8',
      withFileTypes: false
    })
    // en caso manejar error si no existen proyectos
    if (files.length === 0) {
      return { data: [] }
    }
    const projects = files.map((project) => {
      const newJson = fs.readFileSync(`${this.APPDATA}/${project}`, { encoding: 'utf-8' })
      const parse = JSON.parse(newJson)
      return parse
    })

    return { data: projects }
  }

  async deleteOneProject({ project }) {
    console.log(project)
    if (!fs.existsSync(`${this.APPDATA}/${project.file}.json`)) {
      return { error: { description: `El projecto ${project.file} no existe` } }
    }

    fs.rmSync(`${this.APPDATA}/${project.file}.json`)

    return { response: { description: `Project ${project.file} deleted` } }
  }

  async editOneProject({ project }) {
    console.log(project)
    if (!fs.existsSync(`${this.APPDATA}/${project.file}.json`)) {
      return { error: { description: `El projecto ${project.file} no existe` } }
    }

    /* const allFiles = fs.readdirSync(this.APPDATA, {
      encoding: 'utf-8',
      withFileTypes: false
    }) */
    /* if (allFiles.includes(`${project.file}.json`)) {
       if (newProject.file !== project.file) {
        return {
          error: { description: `El projecto ${project.newNameFile} ya existe, use otro nombre` }
        }
      }
      return {
        error: { description: `El projecto ${project.file} ya existe, use otro nombre` }
      }
    } */

    let projectParse = JSON.parse(
      fs.readFileSync(`${this.APPDATA}/${project.file}.json`, {
        encoding: 'utf-8'
      })
    )

    projectParse = { ...projectParse, ...project }

    /* if (project.newNameFile !== project.namefile) {
      fs.renameSync(
        `${this.APPDATA}/${project.namefile}.json`,
        `${this.APPDATA}/${project.newNameFile}.json`
      )
    } */

    /* projectParse.name = project.newNameFile
    projectParse.db = {
      username: project.username,
      password: project.password,
      hostname: project.hostname,
      port: project.port,
      database: project.database
    } */

    fs.writeFileSync(`${this.APPDATA}/${project.file}.json`, JSON.stringify(projectParse, null, 2))

    return {
      response: { description: `El projecto ${project.file} ha sido actualizado` }
    }
  }

  async openProject({ project }) {
    console.log({ project })
    const connect = await this._tryconectionToDB({ project })
    if (connect) {
      return connect
    }
    return 'hola'
  }

  async _tryconectionToDB({ project, isNew = false }) {
    const password = isNew ? project.password : decrypt({ value: project.password })

    const pool = new Pool({
      connectionString: `postgresql://${project.user}:${password}@${project.host}:${project.port}/${project.database}`
    })

    const dataConnect = await pool.connect().catch((er) => er)

    if (dataConnect.code) {
      const errorStatus = searchCodeErrorPg(dataConnect)
      return { error: errorStatus }
    }
    global.projectKey = { ...project, password }
    return false
  }
}

export default ProjectIPC
