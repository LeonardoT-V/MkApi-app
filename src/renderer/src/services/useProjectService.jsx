import { useEffect, useState } from 'react'
import toast from '../utils/toast'
import { useNavigate } from 'react-router-dom'
import { useProject } from '../hooks/useProject'

export function useGetAllProject() {
  const [loader, setLoader] = useState(false)
  const [fetcher, setFetcher] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getAllProject()
  }, [fetcher])

  const getAllProject = async () => {
    setFetcher(false)
    setLoader(true)
    const { data } = await window.project.getAllProject()
    setLoader(false)
    setProjects(data)
  }

  const reFetch = () => {
    setFetcher((r) => !r)
  }

  return {
    getAllProject,
    setFetcher,
    loader,
    projects,
    reFetch
  }
}

export function useProjectService() {
  const [loader, setLoader] = useState(false)
  const { setProjectStore, deleteProjectStore } = useProject()
  const navigate = useNavigate()

  const createNewProject = async ({ initValues }) => {
    setLoader(true)
    const idToast = toast.loadingToast('Cargando...', 'Estamos configurando su proyecto')
    const res = await window.project.createNewProject({ project: initValues })
    if (res.error) {
      toast.errorToast(idToast, res.error?.description, res.error?.details)
      return
    }
    toast.successToast(idToast, `Bienvenido ${res.db.user}`, `Se conecto a ${res.file}`)
    setLoader(false)
    setProjectStore({ project: res })
    navigate('/app/home')
    return
  }

  const openProject = async ({ project }) => {
    const idToast = toast.loadingToast('Conectando...', 'Estamos configurando su proyecto')
    const res = await window.project.openProject({ project: project.db })
    if (res.error) {
      toast.errorToast(idToast, res.error?.description, res.error?.details)
      return
    }
    setProjectStore({ project: project })
    toast.successToast(idToast, `Bienvenido ${project.db.user}`, `Se conecto a ${project.file}`)
    navigate('/app/home')
    return
  }

  const closeProject = () => {
    deleteProjectStore()
    navigate('/')
  }

  return {
    createNewProject,
    loader,
    openProject,
    closeProject
  }
}
