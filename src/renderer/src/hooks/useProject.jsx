import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LOCAL_KEY_PROJECT } from '../env'
import toast from '../utils/toast'
import { useProjectStore } from '../stores/projectStore'

export const useProject = () => {
  const location = useLocation()
  const configuration = useProjectStore((state) => state.configuration)
  const setConfiguration = useProjectStore((state) => state.setConfiguration)

  const getProjectStore = () => {
    const localProject = sessionStorage.getItem(LOCAL_KEY_PROJECT)
    const parseProject = JSON.parse(localProject) || false
    return parseProject
  }

  const setProjectStore = ({ project }) => {
    const stringifyProject = JSON.stringify(project)
    sessionStorage.setItem(LOCAL_KEY_PROJECT, stringifyProject)
    setConfiguration({ ...project })
  }

  const deleteProjectStore = () => {
    sessionStorage.removeItem(LOCAL_KEY_PROJECT)
    setConfiguration({})
  }

  const editProject = async ({ newData }) => {
    const newProject = { ...configuration, ...newData }
    const idToast = toast.loadingToast('Actualizando projecto')
    const { response, error } = await window.project.editProject({ project: newProject })
    if (error) {
      toast.errorToast(idToast, 'Ha ocurrido un error', error.description)
      return
    }
    toast.successToast(idToast, 'Proyecto actualizado', response.description)
    setProjectStore({ project: newProject })
    return true
  }

  useEffect(() => {
    setConfiguration(getProjectStore())
  }, [location, setConfiguration])

  return {
    project: configuration,
    deleteProjectStore,
    setProjectStore,
    getProjectStore,
    editProject,
    backupOpt: configuration.backup
  }
}
