import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LOCAL_KEY_PROJECT } from '../env'

export const useProject = () => {
  const location = useLocation()
  const [project, setProject] = useState({})

  const getProjectStore = () => {
    const localProject = sessionStorage.getItem(LOCAL_KEY_PROJECT)
    const parseProject = JSON.parse(localProject) || false
    return parseProject
  }

  const setProjectStore = ({ project }) => {
    const stringifyProject = JSON.stringify(project)
    sessionStorage.setItem(LOCAL_KEY_PROJECT, stringifyProject)
  }

  const deleteProjectStore = () => {
    sessionStorage.removeItem(LOCAL_KEY_PROJECT)
  }

  useEffect(() => {
    setProject(getProjectStore())
  }, [location, setProject])

  return {
    project,
    deleteProjectStore,
    setProjectStore,
    getProjectStore
  }
}
